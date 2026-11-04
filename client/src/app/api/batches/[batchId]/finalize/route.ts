import { NextRequest, NextResponse } from "next/server";
import { parseAbiItem } from "viem";
import { publicClient } from "@/lib/contract";
import { pinFileToIPFS, pinMetadataToIPFS } from "@/lib/pinata";
import { buildDiplomaHtml, renderDiplomaPdfBuffer } from "@/lib/diplomaPdf";
import { getStudentBatchProfile } from "@/lib/studentBatch";
import type { BatchDraftStudent } from "@/lib/batchDraft";
import { CONTRACT_ADDRESS } from "@/lib/wagmi";

const signedByDeanEvent = parseAbiItem(
  "event BatchSignedByDean(uint256 indexed batchId, address indexed dean)",
);
const signedByRectorEvent = parseAbiItem(
  "event BatchSignedByRector(uint256 indexed batchId, address indexed rector)",
);

interface FinalizeRequestBody {
  students?: BatchDraftStudent[];
}

function normalizeBatchId(value: string): bigint {
  return BigInt(value);
}

function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  const view = new Uint8Array(buffer);
  return view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ batchId: string }> },
) {
  const { batchId } = await params;

  let body: FinalizeRequestBody;

  try {
    body = (await request.json()) as FinalizeRequestBody;
  } catch {
    body = {};
  }

  const students = body.students;

  if (!Array.isArray(students) || students.length === 0) {
    return NextResponse.json(
      { error: "No student data to finalize." },
      { status: 400 },
    );
  }

  const batchIdBigInt = normalizeBatchId(batchId);

  try {
    const [deanLogs, rectorLogs] = await Promise.all([
      publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        event: signedByDeanEvent,
        fromBlock: BigInt(0),
        toBlock: "latest",
      }),
      publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        event: signedByRectorEvent,
        fromBlock: BigInt(0),
        toBlock: "latest",
      }),
    ]);

    const deanLog = deanLogs.find((log) => log.args.batchId === batchIdBigInt);
    const rectorLog = rectorLogs.find(
      (log) => log.args.batchId === batchIdBigInt,
    );

    if (!deanLog?.args.dean || !rectorLog?.args.rector) {
      return NextResponse.json(
        { error: "Missing signatures." },
        { status: 409 },
      );
    }

    const deanAddress = deanLog.args.dean;
    const rectorAddress = rectorLog.args.rector;

    const cids = await Promise.all(
      students.map(async (student) => {
        const profile = await getStudentBatchProfile(student.matricule);
        const deplome = profile?.currentYear === "M2" ? "Master" : "License";
        if (!profile) {
          throw new Error(
            `Profile not found for student: ${student.matricule}`,
          );
        }

        const html = await buildDiplomaHtml({
          batchId: batchIdBigInt.toString(),
          studentName: profile.studentName,
          deplome: deplome,
          matricule: profile.matricule,
          speciality: profile.speciality,
          department: profile.department,
          graduationYear: profile.graduationYear,
          totalCredits: profile.totalCredits,
          pfeNote: profile.pfeNote,
          l1Average: profile.academicHistory.l1Average,
          l2Average: profile.academicHistory.l2Average,
          l3Average: profile.academicHistory.l3Average,
          m1Average: profile.academicHistory.m1Average,
          m2Average: profile.academicHistory.m2Average,
          deanAddress: deanAddress,
          rectorAddress: rectorAddress,
        });
        const pdfBuffer = await renderDiplomaPdfBuffer(html);
        const fileName = `diplome_${profile.matricule}_${batchIdBigInt.toString()}.pdf`;

        // 1. Pin the PDF file
        const diplomaPdfCID = await pinFileToIPFS(
          toArrayBuffer(pdfBuffer),
          fileName,
          "application/pdf",
        );

        // 2. Build the metadata object
        const metadata = {
          studentName: profile.studentName,
          matricule: profile.matricule,
          department: profile.department,
          speciality: profile.speciality,
          graduationYear: profile.graduationYear,
          deplome,
          batchId: batchIdBigInt.toString(),
          deanAddress,
          rectorAddress,
          diplomaPdfCID, // link to the PDF
        };

        // 3. Pin the metadata JSON
        const metadataCID = await pinMetadataToIPFS(
          metadata,
          `metadata_${profile.matricule}_${batchIdBigInt.toString()}`,
        );

        return diplomaPdfCID;
      }),
    );

    return NextResponse.json({ cids });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, QrCode, ShieldCheck } from "lucide-react";

export default function VerifyPage() {
  const [tokenId, setTokenId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = tokenId.trim();
    if (id !== "") router.push(`/verify/${id}`);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center space-y-8">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-uni-blue to-blue-600 text-white shadow-lg">
          <ShieldCheck className="h-10 w-10" />
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          verify a Diploma
        </h1>
        <p className="mt-2 text-slate-500">
          Enter Token Id or student ID to verify the authenticity of a diploma
          from the University of Blida 1.
        </p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="card">
        <label className="label text-left block mb-2">
          Token Id or Student ID
        </label>
        <div className="flex gap-3">
          <input
            className="input flex-1"
            type="text"
            placeholder=" 20230000…"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <button type="submit" className="btn-primary shrink-0">
            <Search className="h-4 w-4" />
            Verify
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-400 text-left">
          The field accepts both token and the registered student ID on the
          blockchain.
        </p>
      </form>
      {/* QR hint */}
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 space-y-2">
        <QrCode className="mx-auto h-8 w-8 text-slate-300" />
        <p className="text-sm text-slate-500">
          You can also scan the QR code printed on the diploma directly — it
          will redirect you to this page with the token pre-filled.
        </p>
      </div>

      {/* How it works */}
      <div className="text-left card space-y-4">
        <h2 className="font-semibold text-slate-800">
          How does the verification work?
        </h2>
        <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
          <li>
            The token ID or student ID is read from the local Ethereum
            blockchain.
          </li>
          <li>
            The IPFS CID and SHA-256 hash of the PDF are retrieved from the
            smart contract.
          </li>
          <li>
            The PDF is downloaded from IPFS and its hash is verified against the
            one stored in the smart contract.
          </li>
          <li>
            A badge <strong className="text-green-700">Authentic</strong> or{" "}
            <strong className="text-red-700">Invalid</strong> is displayed
            according to the verification result.
          </li>
        </ol>
      </div>
    </div>
  );
}

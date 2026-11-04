import Link from "next/link";
import {
  ShieldCheck,
  LayoutDashboard,
  QrCode,
  Lock,
  Cpu,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Soulbound NFT",
    desc: "Each diploma is a non-transferable ERC-721 token anchored on the blockchain.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-Signature",
    desc: "Each batch must be approved by both the Dean AND the Rector before issuance.",
  },
  {
    icon: Globe,
    title: "IPFS Storage",
    desc: "PDFs and metadata are stored on IPFS via Pinata. Only the cryptographic hash is kept on-chain.",
  },
  {
    icon: QrCode,
    title: "Verification QR Code",
    desc: "Each diploma generates a QR code for instant authenticity verification.",
  },
  {
    icon: Cpu,
    title: "Batch Minting",
    desc: "Hundreds of diplomas issued simultaneously in a single blockchain transaction.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    desc: "Propose batches, sign as Dean or Rector, and execute the NFT minting.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-uni-blue via-blue-800 to-blue-900 py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            Université de Blida 1 — Informatique
          </div>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            DiploChain
          </h1>
          <p className="mb-2 text-xl font-semibold text-blue-100">
            High-Security Degree Certification System
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-blue-200">
            Unforgeable credentials built on Soulbound Tokens (ERC-721), secured
            by Dean and Rector multi-signature governance, and backed by
            decentralized IPFS storage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admin"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-uni-blue shadow transition hover:bg-blue-50"
            >
              Admin Dashboard
            </Link>
            <Link
              href="/verify"
              className="rounded-lg border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Verify a Diploma
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-2xl font-bold text-slate-800">
            Architecture technique
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card group hover:border-uni-blue/30 hover:shadow-md transition"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-uni-blue group-hover:bg-uni-blue group-hover:text-white transition">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-semibold text-slate-800">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow diagram */}
      <section className="border-t border-slate-200 bg-slate-100 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 text-xl font-bold text-slate-800">
            Governance Flow
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
            {[
              {
                label: "Proposed",
                color: "bg-yellow-100 text-yellow-800 border-yellow-200",
              },
              { label: "→", color: "text-slate-400" },
              {
                label: "Signed — Dean",
                color: "bg-blue-100 text-blue-800 border-blue-200",
              },
              { label: "→", color: "text-slate-400" },
              {
                label: "Signed — Rector",
                color: "bg-purple-100 text-purple-800 border-purple-200",
              },
              { label: "→", color: "text-slate-400" },
              {
                label: "Diplomas Minted",
                color: "bg-green-100 text-green-800 border-green-200",
              },
            ].map(({ label, color }, i) =>
              label === "→" ? (
                <span key={i} className={color + " text-lg"}>
                  {label}
                </span>
              ) : (
                <span
                  key={i}
                  className={`rounded-full border px-4 py-1.5 ${color}`}
                >
                  {label}
                </span>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

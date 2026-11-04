import { AlertCircle, Send } from "lucide-react";

type GradeCriterion =
  | "rapport"
  | "conception"
  | "application"
  | "presentation"
  | "qa";

type GradeInputs = Record<GradeCriterion, string>;

const GRADE_LIMITS = {
  rapport: 5,
  conception: 4,
  application: 5,
  presentation: 3,
  qa: 3,
} as const;

const GRADE_CRITERIA = [
  { key: "rapport", label: "Rapport" },
  { key: "conception", label: "Conception" },
  { key: "application", label: "Application" },
  { key: "presentation", label: "Présentation" },
  { key: "qa", label: "Q&A" },
] as const satisfies ReadonlyArray<{
  key: GradeCriterion;
  label: string;
}>;
interface ConfirmGradeModalProps {
  inputs: GradeInputs;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmGradeModal({
  inputs,
  onConfirm,
  onCancel,
}: ConfirmGradeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Confirmer les notes
            </h2>
            <p className="text-sm text-slate-500">
              Cette action est irréversible sur la blockchain.
            </p>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 space-y-2">
          {GRADE_CRITERIA.map((criterion) => (
            <div
              key={criterion.key}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-600">{criterion.label}</span>
              <span className="font-mono font-semibold text-slate-900">
                {inputs[criterion.key]} / {GRADE_LIMITS[criterion.key]}
              </span>
            </div>
          ))}
          <div className="mt-3 border-t border-red-200 pt-3 flex items-center justify-between text-sm font-semibold">
            <span className="text-slate-700">Total</span>
            <span className="text-red-700">
              {GRADE_CRITERIA.reduce(
                (sum, c) => sum + Number(inputs[c.key] || 0),
                0,
              )}{" "}
              / 20
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}

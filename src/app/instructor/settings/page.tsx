import { Settings } from "lucide-react";

export default function InstructorSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Instructor Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your instructor profile, notification preferences, and payout accounts.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
          <Settings className="h-7 w-7" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          Settings Portal
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
          Instructor profile settings and payout configurations will be available in the upcoming phase.
        </p>
      </div>
    </div>
  );
}


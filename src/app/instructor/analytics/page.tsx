import { BarChart3 } from "lucide-react";

export default function InstructorAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Analytics & Insights
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track student enrollments, completion rates, and course revenue.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
          <BarChart3 className="h-7 w-7" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          Analytics Coming Soon
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
          Detailed metrics and live engagement reports will be populated as students enroll in your courses.
        </p>
      </div>
    </div>
  );
}


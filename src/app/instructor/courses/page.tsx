import Link from "next/link";
import {
  BookOpen,
  PlusCircle,
  Users,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getInstructorCourses } from "@/actions/course";

export const dynamic = "force-dynamic";

export default async function InstructorCoursesPage() {
  const result = await getInstructorCourses();
  const courses = result.courses || [];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              My Courses
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {courses.length} {courses.length === 1 ? "Course" : "Courses"}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage your course curriculums, organize modules, and track enrolled students.
          </p>
        </div>

        <Link
          href="/instructor/courses/create"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Create Course</span>
        </Link>
      </div>

      {/* Error state if server action failed */}
      {!result.success && result.error && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-amber-800 text-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-amber-600" />
          <span>{result.error}</span>
        </div>
      )}

      {/* Empty State */}
      {courses.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center max-w-2xl mx-auto my-8">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner mb-5">
            <BookOpen className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Create your first course
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            You haven&apos;t published any courses yet. Start building your curriculum,
            add interactive lessons, and reach eager students.
          </p>
          <div className="mt-6">
            <Link
              href="/instructor/courses/create"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Create Course Now</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      ) : (
        /* Course Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col overflow-hidden"
            >
              {/* Card Header & Status */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      course.isPublished
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {course.isPublished ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-500" />
                        Published
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 mr-1 text-slate-400" />
                        Draft
                      </>
                    )}
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {course.price === 0 ? "Free" : `$${course.price.toFixed(2)}`}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1">
                  {course.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500 line-clamp-3 leading-relaxed flex-1">
                  {course.description || "No description provided."}
                </p>

                {/* Metrics */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-1.5">
                    <Layers className="h-4 w-4 text-slate-400" />
                    <span>{course._count?.modules || 0} Modules</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span>{course._count?.enrollments || 0} Students</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {new Date(course.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/instructor/courses/${course.id}`}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Manage Curriculum &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


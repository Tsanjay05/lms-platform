import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, BookOpen, AlertCircle } from "lucide-react";
import { getCourseCurriculum } from "@/actions/curriculum";
import CurriculumManager from "./curriculum-manager";

export const dynamic = "force-dynamic";

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { courseId } = await params;

  if (!courseId) {
    notFound();
  }

  const result = await getCourseCurriculum(courseId);

  if (!result.success || !result.course) {
    if (result.error?.includes("Unauthorized") || result.error?.includes("Forbidden")) {
      redirect("/login");
    }
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Link
            href="/instructor/courses"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Courses
          </Link>
        </div>
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-amber-800 text-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-amber-600" />
          <div>
            <h3 className="font-semibold">Unable to load course</h3>
            <p className="mt-1">{result.error || "The requested course was not found."}</p>
          </div>
        </div>
      </div>
    );
  }

  const course = result.course;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Navigation & Course Header */}
      <div>
        <Link
          href="/instructor/courses"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Courses
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {course.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                  <span>Price: {course.price === 0 ? "Free" : `$${course.price.toFixed(2)}`}</span>
                  <span>&bull;</span>
                  <span>{course.modules.length} {course.modules.length === 1 ? "Module" : "Modules"}</span>
                  <span>&bull;</span>
                  <span>
                    {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Total Lessons
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                course.isPublished
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              {course.isPublished ? "Published" : "Draft Status"}
            </span>
          </div>
        </div>
      </div>

      {/* Curriculum Manager Client Component */}
      <CurriculumManager course={course} />
    </div>
  );
}


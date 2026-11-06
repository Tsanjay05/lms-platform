"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Layers,
  Plus,
  Video,
  Eye,
  FileText,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { createModule, createLesson } from "@/actions/curriculum";

interface LessonItem {
  id: string;
  title: string;
  content: string | null;
  videoUrl: string | null;
  order: number;
  isFree: boolean;
  moduleId: string;
}

interface ModuleItem {
  id: string;
  title: string;
  description: string | null;
  order: number;
  courseId: string;
  lessons: LessonItem[];
}

interface CourseData {
  id: string;
  title: string;
  description: string | null;
  price: number;
  isPublished: boolean;
  modules: ModuleItem[];
}

interface CurriculumManagerProps {
  course: CourseData;
}

export default function CurriculumManager({ course }: CurriculumManagerProps) {
  const router = useRouter();

  // Module creation state
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [isSubmittingModule, setIsSubmittingModule] = useState(false);
  const [moduleError, setModuleError] = useState<string | null>(null);

  // Active module for adding a lesson
  const [activeLessonModuleId, setActiveLessonModuleId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  const [lessonIsFree, setLessonIsFree] = useState(false);
  const [isSubmittingLesson, setIsSubmittingLesson] = useState(false);
  const [lessonError, setLessonError] = useState<string | null>(null);

  // Handle module creation
  const handleCreateModule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModuleError(null);
    setIsSubmittingModule(true);

    try {
      const result = await createModule({
        courseId: course.id,
        title: moduleTitle,
        description: moduleDescription,
      });

      if (!result.success) {
        setModuleError(result.error || "Failed to create module.");
        setIsSubmittingModule(false);
        return;
      }

      setModuleTitle("");
      setModuleDescription("");
      setIsAddingModule(false);
      setIsSubmittingModule(false);
      router.refresh();
    } catch (err) {
      console.error("Module creation error:", err);
      setModuleError("An unexpected error occurred.");
      setIsSubmittingModule(false);
    }
  };

  // Handle lesson creation
  const handleCreateLesson = async (e: React.FormEvent<HTMLFormElement>, moduleId: string) => {
    e.preventDefault();
    setLessonError(null);
    setIsSubmittingLesson(true);

    try {
      const result = await createLesson({
        moduleId,
        title: lessonTitle,
        content: lessonContent,
        videoUrl: lessonVideoUrl,
        isFree: lessonIsFree,
      });

      if (!result.success) {
        setLessonError(result.error || "Failed to create lesson.");
        setIsSubmittingLesson(false);
        return;
      }

      setLessonTitle("");
      setLessonContent("");
      setLessonVideoUrl("");
      setLessonIsFree(false);
      setActiveLessonModuleId(null);
      setIsSubmittingLesson(false);
      router.refresh();
    } catch (err) {
      console.error("Lesson creation error:", err);
      setLessonError("An unexpected error occurred.");
      setIsSubmittingLesson(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header & Add Module trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Curriculum Structure
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Organize your course syllabus into sequential modules and actionable lessons.
          </p>
        </div>

        {!isAddingModule && (
          <button
            type="button"
            onClick={() => setIsAddingModule(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add Module</span>
          </button>
        )}
      </div>

      {/* Inline Add Module Form */}
      {isAddingModule && (
        <div className="p-6 bg-white rounded-2xl border-2 border-indigo-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-slate-900">New Curriculum Module</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsAddingModule(false);
                setModuleError(null);
              }}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          {moduleError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{moduleError}</span>
            </div>
          )}

          <form onSubmit={handleCreateModule} className="space-y-4">
            <div>
              <label htmlFor="moduleTitle" className="block text-xs font-semibold text-slate-700 mb-1">
                Module Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="moduleTitle"
                type="text"
                required
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                placeholder="e.g. Introduction & Fundamentals"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="moduleDescription" className="block text-xs font-semibold text-slate-700 mb-1">
                Module Description (Optional)
              </label>
              <textarea
                id="moduleDescription"
                rows={2}
                value={moduleDescription}
                onChange={(e) => setModuleDescription(e.target.value)}
                placeholder="Brief summary of what this section covers..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingModule(false)}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmittingModule}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
              >
                {isSubmittingModule ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Adding Module...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Save Module</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Empty State */}
      {course.modules.length === 0 && !isAddingModule ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-10 text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <Layers className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No modules created yet</h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
            Modules group your course lessons into logical chapters and progression milestones.
          </p>
          <button
            type="button"
            onClick={() => setIsAddingModule(true)}
            className="mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create First Module</span>
          </button>
        </div>
      ) : (
        /* Modules List */
        <div className="space-y-6">
          {course.modules.map((moduleItem, index) => {
            const isAddingLessonToThis = activeLessonModuleId === moduleItem.id;

            return (
              <div
                key={moduleItem.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Module Bar */}
                <div className="p-5 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 h-7 px-2.5 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                      Section {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {moduleItem.title}
                      </h3>
                      {moduleItem.description && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {moduleItem.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (isAddingLessonToThis) {
                        setActiveLessonModuleId(null);
                      } else {
                        setActiveLessonModuleId(moduleItem.id);
                        setLessonError(null);
                      }
                    }}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-600 hover:bg-indigo-50 border border-indigo-200 transition-colors self-start sm:self-auto"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>{isAddingLessonToThis ? "Close Form" : "Add Lesson"}</span>
                  </button>
                </div>

                {/* Lessons Container */}
                <div className="p-5 space-y-3">
                  {moduleItem.lessons.length === 0 ? (
                    <div className="py-4 text-center text-xs text-slate-400">
                      No lessons in this module yet. Click &quot;Add Lesson&quot; to add content.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {moduleItem.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <span className="text-xs font-mono font-medium text-slate-400">
                              {index + 1}.{lessonIndex + 1}
                            </span>
                            <FileText className="h-4 w-4 text-slate-400 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="text-sm font-semibold text-slate-800 truncate block">
                                {lesson.title}
                              </span>
                              {lesson.content && (
                                <p className="text-xs text-slate-500 truncate max-w-md">
                                  {lesson.content}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2.5 flex-shrink-0">
                            {lesson.videoUrl && (
                              <span
                                title="Video attached"
                                className="p-1 rounded-md bg-blue-50 text-blue-600"
                              >
                                <Video className="h-3.5 w-3.5" />
                              </span>
                            )}

                            {lesson.isFree && (
                              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <Eye className="h-3 w-3" />
                                <span>Free Preview</span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline Form to add a Lesson */}
                  {isAddingLessonToThis && (
                    <div className="mt-4 p-4 rounded-xl border border-indigo-200 bg-indigo-50/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                          Add Lesson to &quot;{moduleItem.title}&quot;
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveLessonModuleId(null)}
                          className="text-xs text-slate-400 hover:text-slate-600"
                        >
                          Cancel
                        </button>
                      </div>

                      {lessonError && (
                        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{lessonError}</span>
                        </div>
                      )}

                      <form
                        onSubmit={(e) => handleCreateLesson(e, moduleItem.id)}
                        className="space-y-3"
                      >
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Lesson Title <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={lessonTitle}
                            onChange={(e) => setLessonTitle(e.target.value)}
                            placeholder="e.g. Setting up your developer environment"
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              Video URL (Optional)
                            </label>
                            <input
                              type="url"
                              value={lessonVideoUrl}
                              onChange={(e) => setLessonVideoUrl(e.target.value)}
                              placeholder="https://..."
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div className="flex items-center pt-5">
                            <label className="flex items-center space-x-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={lessonIsFree}
                                onChange={(e) => setLessonIsFree(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="text-xs font-medium text-slate-700">
                                Free Preview Lesson (publicly accessible)
                              </span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Lesson Text Content / Summary (Optional)
                          </label>
                          <textarea
                            rows={3}
                            value={lessonContent}
                            onChange={(e) => setLessonContent(e.target.value)}
                            placeholder="Detailed notes, links, or lesson summary..."
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="flex items-center justify-end space-x-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setActiveLessonModuleId(null)}
                            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmittingLesson}
                            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
                          >
                            {isSubmittingLesson ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                <span>Saving...</span>
                              </>
                            ) : (
                              <>
                                <Plus className="h-3.5 w-3.5" />
                                <span>Save Lesson</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export interface CreateModuleInput {
  courseId: string;
  title: string;
  description?: string;
  order?: number;
}

export interface CreateLessonInput {
  moduleId: string;
  title: string;
  content?: string;
  videoUrl?: string;
  order?: number;
  isFree?: boolean;
}

export interface CurriculumActionResult<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

/**
 * Creates a new Module in a Course.
 * Verifies that the authenticated user owns the parent course.
 */
export async function createModule(
  data: CreateModuleInput
): Promise<CurriculumActionResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "You must be signed in." };
    }

    const { courseId, title, description, order } = data;

    if (!courseId) {
      return { success: false, error: "Course ID is required." };
    }

    if (!title || title.trim().length < 2) {
      return {
        success: false,
        error: "Module title must be at least 2 characters long.",
      };
    }

    // Verify course ownership
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return { success: false, error: "Course not found." };
    }

    if (course.instructorId !== session.user.id && session.user.role !== "ADMIN") {
      return {
        success: false,
        error: "Unauthorized: You do not own this course.",
      };
    }

    // Determine sequence order
    let moduleOrder = order;
    if (!moduleOrder || moduleOrder <= 0) {
      const lastModule = await db.module.findFirst({
        where: { courseId },
        orderBy: { order: "desc" },
      });
      moduleOrder = (lastModule?.order ?? 0) + 1;
    } else {
      // Check if order already exists to prevent unique constraint conflict
      const existingWithOrder = await db.module.findUnique({
        where: {
          courseId_order: {
            courseId,
            order: moduleOrder,
          },
        },
      });
      if (existingWithOrder) {
        const lastModule = await db.module.findFirst({
          where: { courseId },
          orderBy: { order: "desc" },
        });
        moduleOrder = (lastModule?.order ?? 0) + 1;
      }
    }

    const newModule = await db.module.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        order: moduleOrder,
        courseId,
      },
    });

    revalidatePath(`/instructor/courses/${courseId}`);

    return {
      success: true,
      message: "Module created successfully.",
      data: newModule,
    };
  } catch (error) {
    console.error("createModule error:", error);
    return {
      success: false,
      error: "Failed to create module. Please try again.",
    };
  }
}

/**
 * Creates a new Lesson inside a Module.
 * Verifies that the authenticated user owns the parent course.
 */
export async function createLesson(
  data: CreateLessonInput
): Promise<CurriculumActionResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "You must be signed in." };
    }

    const { moduleId, title, content, videoUrl, order, isFree = false } = data;

    if (!moduleId) {
      return { success: false, error: "Module ID is required." };
    }

    if (!title || title.trim().length < 2) {
      return {
        success: false,
        error: "Lesson title must be at least 2 characters long.",
      };
    }

    // Verify module and course ownership
    const moduleItem = await db.module.findUnique({
      where: { id: moduleId },
      include: {
        course: true,
      },
    });

    if (!moduleItem) {
      return { success: false, error: "Module not found." };
    }

    if (
      moduleItem.course.instructorId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return {
        success: false,
        error: "Unauthorized: You do not own this course curriculum.",
      };
    }

    // Determine sequence order
    let lessonOrder = order;
    if (!lessonOrder || lessonOrder <= 0) {
      const lastLesson = await db.lesson.findFirst({
        where: { moduleId },
        orderBy: { order: "desc" },
      });
      lessonOrder = (lastLesson?.order ?? 0) + 1;
    } else {
      // Check if order already exists in module
      const existingWithOrder = await db.lesson.findUnique({
        where: {
          moduleId_order: {
            moduleId,
            order: lessonOrder,
          },
        },
      });
      if (existingWithOrder) {
        const lastLesson = await db.lesson.findFirst({
          where: { moduleId },
          orderBy: { order: "desc" },
        });
        lessonOrder = (lastLesson?.order ?? 0) + 1;
      }
    }

    const newLesson = await db.lesson.create({
      data: {
        title: title.trim(),
        content: content?.trim() || null,
        videoUrl: videoUrl?.trim() || null,
        order: lessonOrder,
        isFree: Boolean(isFree),
        moduleId,
      },
    });

    revalidatePath(`/instructor/courses/${moduleItem.courseId}`);

    return {
      success: true,
      message: "Lesson created successfully.",
      data: newLesson,
    };
  } catch (error) {
    console.error("createLesson error:", error);
    return {
      success: false,
      error: "Failed to create lesson. Please try again.",
    };
  }
}

/**
 * Fetches a single course with all nested modules and lessons,
 * ordered by their respective order fields.
 */
export async function getCourseCurriculum(courseId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be signed in to view curriculum details.",
      };
    }

    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    if (!course) {
      return { success: false, error: "Course not found." };
    }

    if (
      course.instructorId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return {
        success: false,
        error: "Forbidden: You are not authorized to manage this course.",
      };
    }

    // Convert Prisma Decimal to primitive number for clean React component serialization
    const serializedCourse = {
      ...course,
      price: course.price.toNumber(),
    };

    return {
      success: true,
      course: serializedCourse,
    };
  } catch (error) {
    console.error("getCourseCurriculum error:", error);
    return {
      success: false,
      error: "Failed to load course curriculum.",
    };
  }
}


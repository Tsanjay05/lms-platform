"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export interface CreateCourseInput {
  title: string;
  description: string;
  price: number | string;
}

export interface SerializedCourse {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  isPublished: boolean;
  instructorId: string;
  createdAt: Date;
  updatedAt: Date;
  modules?: {
    id: string;
    title: string;
    order: number;
    lessons: { id: string; title: string; order: number; isFree: boolean }[];
  }[];
  _count?: {
    modules: number;
    enrollments: number;
  };
}

export interface CourseActionResult {
  success: boolean;
  message?: string;
  error?: string;
  courseId?: string;
  courses?: SerializedCourse[];
}

/**
 * Creates a new Course in Prisma.
 * Verifies that the authenticated user has the INSTRUCTOR or ADMIN role.
 */
export async function createCourse(
  data: CreateCourseInput
): Promise<CourseActionResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be signed in to create a course.",
      };
    }

    if (session.user.role !== "INSTRUCTOR" && session.user.role !== "ADMIN") {
      return {
        success: false,
        error: "Forbidden. Only instructors can create courses.",
      };
    }

    const { title, description, price } = data;

    // Validate title
    if (!title || title.trim().length < 3) {
      return {
        success: false,
        error: "Course title must be at least 3 characters long.",
      };
    }

    // Validate description
    if (!description || description.trim().length < 10) {
      return {
        success: false,
        error: "Please provide a detailed course description (at least 10 characters).",
      };
    }

    // Parse and validate price
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(numericPrice) || numericPrice < 0) {
      return {
        success: false,
        error: "Please enter a valid price (greater than or equal to 0).",
      };
    }

    // Convert price to Prisma Decimal format
    const decimalPrice = new Prisma.Decimal(numericPrice.toFixed(2));

    const course = await db.course.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        price: decimalPrice,
        instructorId: session.user.id,
        isPublished: false,
      },
    });

    revalidatePath("/instructor/courses");

    return {
      success: true,
      message: "Course created successfully.",
      courseId: course.id,
    };
  } catch (error) {
    console.error("createCourse error:", error);
    return {
      success: false,
      error: "Failed to create course. Please try again.",
    };
  }
}

/**
 * Fetches all courses created by the currently logged-in instructor,
 * ordered by createdAt descending.
 */
export async function getInstructorCourses(): Promise<CourseActionResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be signed in to view your courses.",
        courses: [],
      };
    }

    if (session.user.role !== "INSTRUCTOR" && session.user.role !== "ADMIN") {
      return {
        success: false,
        error: "Forbidden. Only instructors can access this dashboard.",
        courses: [],
      };
    }

    const rawCourses = await db.course.findMany({
      where: {
        instructorId: session.user.id,
      },
      include: {
        modules: {
          include: {
            lessons: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        _count: {
          select: {
            modules: true,
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Serialize Decimal to number to prevent Next.js client-boundary serialization errors
    const serializedCourses: SerializedCourse[] = rawCourses.map((c) => ({
      ...c,
      price: c.price.toNumber(),
    }));

    return {
      success: true,
      courses: serializedCourses,
    };
  } catch (error) {
    console.error("getInstructorCourses error:", error);
    return {
      success: false,
      error: "Failed to load instructor courses.",
      courses: [],
    };
  }
}


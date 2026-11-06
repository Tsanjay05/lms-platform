"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";
import { Role } from "@prisma/client";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role?: "STUDENT" | "INSTRUCTOR";
}

export interface AuthActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function registerUser(
  input: RegisterUserInput
): Promise<AuthActionResult> {
  try {
    const { name, email, password, role = "STUDENT" } = input;

    // 1. Basic validation
    if (!name || name.trim().length < 2) {
      return {
        success: false,
        error: "Please enter a valid full name (at least 2 characters).",
      };
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }

    if (!password || password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long.",
      };
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Check for existing user
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    // 3. Hash password using bcryptjs
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Create user in database
    const userRole: Role = role === "INSTRUCTOR" ? Role.INSTRUCTOR : Role.STUDENT;

    await db.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: userRole,
      },
    });

    return {
      success: true,
      message: "Account registered successfully. You can now sign in.",
    };
  } catch (error) {
    console.error("User registration error:", error);
    return {
      success: false,
      error: "Something went wrong during registration. Please try again.",
    };
  }
}


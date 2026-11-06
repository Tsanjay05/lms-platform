import type { Role } from "@prisma/client";

export type UserRole = Role;

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
}


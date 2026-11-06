import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings,
  PlusCircle,
  Home,
  User,
} from "lucide-react";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between">
          <Link href="/instructor/courses" className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 leading-tight">
                EduPulse<span className="text-indigo-600">.</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                Instructor Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Action Button */}
        <div className="p-4">
          <Link
            href="/instructor/courses/create"
            className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Course</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1">
          <Link
            href="/instructor/courses"
            className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-900 bg-slate-100 hover:bg-slate-100 transition-colors"
          >
            <BookOpen className="h-4 w-4 text-indigo-600" />
            <span>Courses</span>
          </Link>

          <Link
            href="/instructor/analytics"
            className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <BarChart3 className="h-4 w-4 text-slate-400" />
            <span>Analytics</span>
          </Link>

          <Link
            href="/instructor/settings"
            className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Settings className="h-4 w-4 text-slate-400" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* Footer info & Home link */}
        <div className="p-4 border-t border-slate-200 space-y-1">
          <Link
            href="/"
            className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Home className="h-4 w-4 text-slate-400" />
            <span>View Public Site</span>
          </Link>
          <div className="pt-2 px-3 flex items-center space-x-2 text-xs text-slate-400">
            <User className="h-3.5 w-3.5" />
            <span>Instructor Portal</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Header */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between">
          <Link href="/instructor/courses" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-900">EduPulse Instructor</span>
          </Link>
          <Link
            href="/instructor/courses/create"
            className="inline-flex items-center space-x-1 py-1.5 px-3 rounded-lg text-xs font-medium text-white bg-indigo-600"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Create</span>
          </Link>
        </header>

        {/* Dynamic page content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


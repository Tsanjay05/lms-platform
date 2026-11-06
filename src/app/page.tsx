import {
  GraduationCap,
  Video,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle2,
  Users,
  Sparkles,
  PlayCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Header */}
      <header className="border-b border-slate-200 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                EduPulse<span className="text-indigo-600">.</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                LMS Platform
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#courses" className="hover:text-indigo-600 transition-colors">
              Courses
            </a>
            <a href="#live-classes" className="hover:text-indigo-600 transition-colors">
              Live Classes
            </a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#instructors" className="hover:text-indigo-600 transition-colors">
              Instructors
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Gen Full-Stack Learning System</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              Master New Skills with{" "}
              <span className="text-indigo-600">On-Demand</span> Courses &{" "}
              <span className="text-indigo-600">Live Classes</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              A comprehensive learning management platform designed for students,
              expert instructors, and institutions. Stream high-definition lessons,
              attend real-time interactive classes, and track your progress.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all">
                <PlayCircle className="mr-2 h-5 w-5 text-indigo-600" />
                View Demo
              </button>
            </div>

            {/* Quick feature checks */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Interactive Live Video Sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Structured Modules & Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Recognized Certificates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Capabilities */}
      <section id="features" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Platform Architecture
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Engineered for Modern Learning
            </p>
            <p className="mt-4 text-base text-slate-600">
              Built on Next.js App Router, PostgreSQL, and Prisma for scalable,
              enterprise-grade educational experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50/50 transition-all">
              <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Live Classes
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Conduct real-time interactive classrooms with low-latency streaming,
                live Q&A, and attendance tracking.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50/50 transition-all">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Structured Modules
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Organize curriculum hierarchically into courses, sequential modules,
                rich text lessons, and preview videos.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50/50 transition-all">
              <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Granular Progress
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Automated completion records, student enrollment metrics, and
                analytics dashboards for learners and instructors.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50/50 transition-all">
              <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Role-Based Access
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Strict separation of roles between Students, Instructors, and
                Administrators with dedicated workspaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold text-slate-700">EduPulse LMS</span>
            <span>&copy; 2026 All rights reserved.</span>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <span className="hover:text-slate-800 transition-colors">Terms</span>
            <span className="hover:text-slate-800 transition-colors">Privacy</span>
            <span className="hover:text-slate-800 transition-colors">Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

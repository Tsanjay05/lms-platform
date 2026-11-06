# EduPulse LMS - Full-Stack Learning Platform with Live Classes

A full-stack, enterprise-grade Learning Management System (LMS) built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **PostgreSQL**, and **Prisma ORM**.

Designed for on-demand courses, structured modules, progress tracking, and interactive real-time live classes.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components & Server Actions)
- **Frontend:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Icons & Styling Helpers:** [lucide-react](https://lucide.dev/), `clsx`, `tailwind-merge`
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Architecture Foundation:** Scalable modular directory layout with Prisma client singleton

---

## 📁 Scalable Project Structure

```text
lms_platform/
├── prisma/
│   └── schema.prisma         # Data models (User, Course, Module, Lesson, Enrollment, etc.)
├── public/                   # Static public assets (logos, images, favicon)
├── src/
│   ├── actions/              # Server Actions for mutations and business logic
│   ├── app/                  # Next.js App Router
│   │   ├── favicon.ico
│   │   ├── globals.css       # Tailwind CSS & global design system tokens
│   │   ├── layout.tsx        # Root HTML layout with font configurations & metadata
│   │   └── page.tsx          # Professional responsive LMS landing page
│   ├── components/
│   │   ├── courses/          # Course cards, lesson lists, curriculum views
│   │   ├── layout/           # Shared navigations, sidebars, headers, footers
│   │   └── ui/               # Reusable atomic UI components (buttons, modals, badges)
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client singleton (prevents connection exhaustion)
│   │   └── utils.ts          # Utility helpers (cn class merger)
│   └── types/
│       └── index.ts          # Shared TypeScript definitions & interfaces
├── .env.example              # Template environment variables
├── eslint.config.mjs         # ESLint configuration
├── next.config.ts            # Next.js compiler & build configuration
├── package.json              # Project scripts and dependencies
├── tsconfig.json             # TypeScript configuration with @/* path aliases
└── README.md                 # Project documentation
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js** (v18.18.0 or newer; tested on Node.js 24)
- **npm** (or pnpm/yarn)
- **PostgreSQL** instance running locally or hosted (e.g. Neon, Supabase)

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure your database connection string:

```bash
cp .env.example .env
```

Ensure your `DATABASE_URL` is set in `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/lms_platform?schema=public"
NODE_ENV="development"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Prisma Client Generation
Generate the Prisma Client types:
```bash
npx prisma generate
```

*(Note: Run database migrations when your PostgreSQL database is ready in future phases:)*
```bash
# npx prisma migrate dev --name init
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the responsive landing page.

---

## 🗄️ Database Models (Summary)

The `prisma/schema.prisma` file establishes the foundation for:
- **`User`**: Authentication, profile details, and role-based permissions (`Role: STUDENT | INSTRUCTOR | ADMIN`).
- **`Course`**: Instructor-created courses with publishing status, pricing (`Decimal`), and descriptions.
- **`Module`**: Sequential syllabus units within a course with ordering constraints.
- **`Lesson`**: Content units supporting text, video URLs, ordering, and free preview toggles.
- **`Enrollment`**: Student-course enrollment relationships with cached completion percentages.
- **`LessonProgress`**: Granular completion tracking per student and lesson.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server at `http://localhost:3000` |
| `npm run build` | Compiles the production build |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint across the codebase |
| `npx prisma studio` | Opens the visual database management GUI |

---

## 📌 Implementation Roadmap
- [x] **Phase 1: Project Initialization** (Next.js App Router, Tailwind CSS, Prisma setup, responsive landing page)
- [ ] **Phase 2: Authentication & Role-Based Access Control (RBAC)**
- [ ] **Phase 3: Instructor Course Creation & Curriculum Builder**
- [ ] **Phase 4: Student Enrollment & Progress Tracking**
- [ ] **Phase 5: Live Interactive Classes Integration**
- [ ] **Phase 6: Background Processing with Redis & BullMQ**

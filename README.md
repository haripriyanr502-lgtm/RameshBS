# B.S. Ramesh Executive Portfolio & CMS

A high-performance executive portfolio and full Content Management System (CMS) built for Lion B.S. Ramesh (MJF) — showcasing corporate leadership, entrepreneurship, CSR initiatives, Lionistic governance, and projects.

---

## Overview & Key Features

- **Public Executive Portfolio**: Fully responsive, high-end presentation showcasing biography, executive achievements, career journey, CSR water initiatives, Lionistic leadership, project highlights, and contact information.
- **Private Admin CMS (`/admin`)**: A comprehensive owner portal with real-time editing, image upload/replacement, and instant publication to the public website.
  - **Overview**: Content summary metrics and quick actions.
  - **Projects & Activities**: Manage field initiatives, meetings, service projects, and videos.
  - **Services Involved**: Manage enterprise platforms, CSR water projects, and talent staffing initiatives.
  - **About Me**: Manage biography narrative, core values, mission, and highlights.
  - **Career & Experience**: Manage corporate trajectory, leadership roles, and honors.
  - **Lionistic Journey**: Governance milestones, Melvin Jones Fellow (MJF) honors, and articles.
  - **Achievements**: Major accolades and recognitions.
  - **Media Asset Manager**: Upload, organize, and replace images across all media categories.
  - **Website Settings & SEO**: Manage meta tags, contact details, and account security.
- **Admin User Management**:
  - Secure role-based access control (`owner`, `admin`, `editor`).
  - Create additional administrator accounts directly from within the protected dashboard (`/admin/dashboard` → Admin Users).
  - PBKDF2 with SHA-512 password hashing and per-user salt generation.
  - Zero password or hash exposure across API responses, logs, or UI.
  - Status management (Active / Disabled) with self-lockout and last-admin protection safeguards.
- **SSR & Live Synchronization**: CMS content changes are dynamically persisted and reflected on the live public website upon publishing.

---

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Authentication**: Custom PBKDF2-SHA512 session engine with HTTP-only signed tokens
- **CMS Persistence**: Structured atomic JSON persistence engine with server-side validation

---

## Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm or yarn

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/haripriyanr502-lgtm/RameshBS.git
cd RameshBS
npm install
```

### 2. Environment Configuration

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:

```env
ADMIN_JWT_SECRET=your_secure_random_secret_here
NODE_ENV=development
```

### 3. Running Locally

Start the development server:

```bash
npm run dev
```

Visit the website at `http://localhost:3000`.

---

## Admin Portal & CMS Access

1. Open `http://localhost:3000/admin` in your browser.
2. Sign in with authorized administrator credentials.
3. Access the dashboard to edit website content or manage administrators.

> **Security Note**: Public registration is strictly disabled. Administrator accounts can only be provisioned by authenticated administrators inside the protected dashboard (`Admin Dashboard → Admin Users → + Add Admin`).

---

## Production Build & Deployment

To validate and build the production bundle:

```bash
npm run build
```

To run the production server:

```bash
npm run start
```

---

## Security Architecture

- **Protected Routes**: Middleware (`src/proxy.ts`) and server-side session checks (`src/lib/auth.ts`) enforce strict authentication for all `/admin/*` and `/api/admin/*` endpoints.
- **Least Privilege**: Only `owner` and `admin` roles can manage administrator accounts. `editor` roles have content-only editing permissions.
- **Safe Transmission**: Sensitive credentials (`password`, `passwordHash`, `salt`) are never transmitted in API responses or rendered in the DOM.
- **Fail-Safe Guards**: Prevents administrators from deleting or disabling their own accounts or removing the last active administrator.

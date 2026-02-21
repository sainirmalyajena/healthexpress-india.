# HealthExpress India

A production-grade surgery directory website where users can search/browse surgeries, view detailed information, and submit inquiries. Admins can manage leads through a dashboard.

## Features

- 🏥 **Surgery Directory**: 150+ surgeries across 13 medical specialties
- 🔍 **Search & Filter**: Find surgeries by name, category, symptoms, or insurance coverage
- 📋 **Detailed Pages**: Complete surgery information with costs, recovery, FAQs
- 📝 **Lead Capture**: Forms with validation, spam protection, and UTM tracking
- 👨‍💼 **Admin Dashboard**: Analytics, leads table, status pipeline, CSV export
- 🔒 **Authentication**: JWT-based session management
- 📱 **Responsive Design**: Mobile-first, modern UI with Tailwind CSS
- 🔎 **SEO Optimized**: Sitemap, meta tags, OpenGraph, robots.txt

## Tech Stack

- **Frontend/Backend**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod
- **Forms**: React Hook Form
- **Auth**: JWT with jose + bcryptjs

## Quick Start

### Prerequisites

- Node.js 18+
- Docker (for PostgreSQL)
- npm or yarn

### 1. Clone and Install

```bash
cd healthexpress-india
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values if needed (defaults work for local dev)
```

### 3. Start Database

```bash
# Start PostgreSQL in Docker
docker-compose up -d

# Verify it's running
docker ps
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed the database (creates 150+ surgeries + admin user)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

### Admin Access

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Email: `admin@healthexpress.in`
- Password: `admin123`

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── leads/        # Lead submission
│   │   └── admin/        # Admin APIs
│   ├── admin/            # Admin pages
│   ├── surgeries/        # Surgery list & detail
│   ├── contact/          # Contact page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── layout/           # Header, Footer
├── lib/
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # Authentication
│   ├── validations.ts    # Zod schemas
│   ├── email.ts          # Email service (stub)
│   └── utils.ts          # Utility functions
└── generated/prisma/     # Prisma client
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |
| `powershell -ExecutionPolicy Bypass -File scripts\HealthCheck.ps1` | Perform full system health check |

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: A secure random string
4. Deploy

### Managed PostgreSQL Options

- [Neon](https://neon.tech) - Serverless Postgres
- [Supabase](https://supabase.com) - Postgres with extras
- [Railway](https://railway.app) - Simple deployment

### Production Checklist

- [ ] Set unique `JWT_SECRET`
- [ ] Configure production `DATABASE_URL`
- [ ] Update `NEXT_PUBLIC_APP_URL`
- [ ] Set up email provider (optional)
- [ ] Enable rate limiting (built-in)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret for JWT signing | Yes |
| `NEXT_PUBLIC_APP_URL` | Public app URL | Yes |
| `EMAIL_FROM` | Sender email address | No |
| `EMAIL_API_KEY` | Email provider API key | No |
| `OPS_EMAIL` | Operations team email | No |

## Medical Disclaimer

Information provided on this website is for general awareness only and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider.

## License

Private - HealthExpress India

// app/routes/_index.tsx (or wherever your HOME route lives)
// Single-file, single-page HOME content using your exact working pattern:
// - imports Link from "react-router"
// - exports meta()
// - default export component
// No extra pages/components required.

import { Link } from "react-router";
import type { Route } from "./+types/aldrenbagual-v1";
import NavLinks from "~/components/NavLinks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aldren Bagual — Portfolio" },
    {
      name: "description",
      content:
        "Full-stack developer focused on clarity, maintainability, and real-world delivery — from idea to production.",
    },
  ];
}

type WorkCard = {
  title: string;
  outcome: string;
  href: string;
};

type Principle = {
  title: string;
  description: string;
};

const CRED: string[] = [
  "Built and maintained production web applications",
  "Experience across frontend and backend systems",
  "Worked with modern stacks (React, Next.js, Node.js)",
  "Comfortable owning features end-to-end",
];

const WORK: WorkCard[] = [
  {
    title: "Internal Ops Web App",
    outcome:
      "Reduced manual workflow steps by consolidating operations into one tool.",
    href: "/work", // keep simple for now
  },
  {
    title: "Headless Marketing Site",
    outcome:
      "Enabled non-technical updates while keeping performance and structure clean.",
    href: "/work",
  },
  {
    title: "Automation + Integrations",
    outcome:
      "Improved turnaround by standardizing intake and automating repetitive handoffs.",
    href: "/work",
  },
];

const PRINCIPLES: Principle[] = [
  {
    title: "Clarity First",
    description:
      "I prioritize clear requirements and communication to reduce rework.",
  },
  {
    title: "Ownership",
    description:
      "I take responsibility for what I build and how it performs in production.",
  },
  {
    title: "Maintainability",
    description: "I design systems that others can understand and extend.",
  },
];

function ButtonLink({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-neutral-800"
      : "bg-white text-neutral-900 ring-1 ring-neutral-200 hover:bg-neutral-50";
  return (
    <Link to={href} className={`${base} ${styles}`}>
      {label}
    </Link>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-950">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm sm:text-base text-neutral-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function Index() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      {/* Header (using your existing NavLinks) */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-neutral-50/80 backdrop-blur">
        <div className="mx-auto w-full max-w-300 px-5 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="text-sm font-semibold tracking-tight">
              Aldren Bagual
            </Link>

            <nav className="hidden md:block">
              <NavLinks />
            </nav>

            {/* Mobile: keep it simple; still uses your NavLinks component if it supports it */}
            <div className="md:hidden">
              <Link
                to="/contact"
                className="text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section className="pt-14 sm:pt-20">
        <div className="mx-auto w-full max-w-300 px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Full-Stack Developer
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-950">
              I build and maintain reliable web systems that teams can trust.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Full-stack developer focused on clarity, maintainability, and
              real-world delivery — from idea to production.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href="/work"
                label="View Case Studies"
                variant="primary"
              />
              <ButtonLink
                href="/contact"
                label="Contact Me"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — QUICK CREDIBILITY SNAPSHOT */}
      <section className="mt-12 sm:mt-16">
        <div className="mx-auto w-full max-w-300 px-5 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CRED.map((line) => (
              <div
                key={line}
                className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm"
              >
                <p className="text-sm text-neutral-800 leading-snug">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — FEATURED WORK PREVIEW */}
      <section className="mt-14 sm:mt-20">
        <div className="mx-auto w-full max-w-300 px-5 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading title="Selected Work" />
            <Link
              to="/work"
              className="hidden sm:inline-flex text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
            >
              View all →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {item.outcome}
                </p>
                <div className="mt-4">
                  <Link
                    to={item.href}
                    className="text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
                    aria-label={`View case study: ${item.title}`}
                  >
                    View case study →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              to="/work"
              className="inline-flex text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
            >
              View all →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW I WORK */}
      <section className="mt-14 sm:mt-20">
        <div className="mx-auto w-full max-w-300 px-5 sm:px-6 lg:px-8">
          <SectionHeading
            title="How I Work"
            description="I approach projects with a focus on clarity, ownership, and long-term maintainability."
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-neutral-950">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — SYSTEMS & PROCESS */}
      <section className="mt-14 sm:mt-20">
        <div className="mx-auto w-full max-w-300 px-5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-base sm:text-lg text-neutral-800 leading-relaxed">
              Beyond writing code, I design workflows and systems that reduce
              ambiguity and keep projects moving smoothly.
            </p>
            <div className="mt-4">
              <Link
                to="/systems"
                className="text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
              >
                Read about my process →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CALL TO ACTION */}
      <section className="mt-14 sm:mt-20 pb-16 sm:pb-20">
        <div className="mx-auto w-full max-w-300 px-5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-base sm:text-lg font-semibold text-neutral-950">
              If you’re looking for a reliable developer who can own work
              end-to-end, let’s talk.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href="/contact"
                label="Contact Me"
                variant="primary"
              />
              <ButtonLink
                href="/resume"
                label="View Resume"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FOOTER */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto w-full max-w-300 px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-neutral-950">
                Aldren Bagual
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                <a
                  className="hover:text-neutral-900 transition"
                  href="mailto:ab@zav.aero"
                >
                  ab@zav.aero
                </a>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                className="text-sm font-medium text-neutral-700 hover:text-neutral-950 transition"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="text-sm font-medium text-neutral-700 hover:text-neutral-950 transition"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <Link
                className="text-sm font-medium text-neutral-700 hover:text-neutral-950 transition"
                to="/work"
              >
                Work
              </Link>
              <Link
                className="text-sm font-medium text-neutral-700 hover:text-neutral-950 transition"
                to="/contact"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

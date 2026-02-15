// app/routes/aldrenbagual-v1.tsx
// Single-file HOME content (TypeScript + Tailwind) using your setup:
// - Link from "react-router"
// - meta() export
// - no extra pages required (links can point to placeholders for now)

import { Link } from "react-router";
import type { Route } from "./+types/aldrenbagual-v1";
import NavLinks from "~/components/NavLinks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aldren Bagual — Portfolio" },
    {
      name: "description",
      content:
        "I build and support reliable web systems that teams can trust — from idea to ongoing support.",
    },
  ];
}

type WorkCard = {
  title: string;
  outcome: string;
  to: string;
};

type Principle = {
  title: string;
  description: string;
};

const WORK: WorkCard[] = [
  {
    title: "Internal Ops Web App",
    outcome:
      "Reduced manual workflow steps by consolidating operations into one tool.",
    to: "/work",
  },
  {
    title: "Headless Marketing Site",
    outcome:
      "Enabled non-technical updates while keeping performance and structure clean.",
    to: "/work",
  },
  {
    title: "Automation + Integrations",
    outcome:
      "Improved turnaround by standardizing intake and automating repetitive handoffs.",
    to: "/work",
  },
];

const PRINCIPLES: Principle[] = [
  {
    title: "Clarity First",
    description:
      "I prioritize clear communication, scoped work, and documentation to avoid rework and confusion.",
  },
  {
    title: "Ownership",
    description:
      "I take responsibility for the systems I work on — not just building them, but supporting them after launch.",
  },
  {
    title: "Maintainability",
    description:
      "I design solutions that are understandable, extensible, and practical for real teams to maintain.",
  },
];

const CRED: string[] = [
  "Built and maintained production web applications",
  "Experience across frontend and backend systems",
  "Worked with modern stacks (React, Next.js, Node.js)",
  "Comfortable owning features end-to-end and providing ongoing support",
];

const WHAT_I_DO: string[] = [
  "Building and maintaining modern websites and web applications",
  "Ongoing website support, fixes, and improvements",
  "Technical troubleshooting and issue resolution",
  "CMS setup and content workflows for non-technical users",
  "Documentation, handover, and system organization",
];

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-300 px-5 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function ButtonLink({
  to,
  label,
  variant,
}: {
  to: string;
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
    <Link to={to} className={`${base} ${styles}`}>
      {label}
    </Link>
  );
}

function SectionTitle({
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

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm">
      {children}
    </div>
  );
}

export default function AldrenHome() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-neutral-50/80 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="text-sm font-semibold tracking-tight">
              Aldren Bagual
            </Link>

            <nav className="hidden md:block">
              <NavLinks />
            </nav>

            <div className="md:hidden">
              <Link
                to="/contact"
                className="text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* SECTION 1 — HERO */}
      <section className="pt-14 sm:pt-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Technical Developer • Digital Support VA
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-950">
              I build and support reliable web systems that teams can trust.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Technical developer and Digital Support VA focused on clarity,
              maintainability, and real-world delivery — from idea to ongoing
              support.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                to="/work"
                label="View Case Studies"
                variant="primary"
              />
              <ButtonLink
                to="/contact"
                label="Contact Me"
                variant="secondary"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — OVERVIEW / ABOUT (Context + Credibility) */}
      <section className="mt-12 sm:mt-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionTitle
                title="Overview"
                description="A short summary of what I do and how I work."
              />
              <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
                I’m a technical-focused developer and Digital Support VA with
                hands-on experience building, maintaining, and supporting
                production web platforms and internal systems. I currently work
                as an IT Developer / Team Lead, helping teams keep their digital
                tools reliable, usable, and running smoothly.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {CRED.map((line) => (
                  <div
                    key={line}
                    className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm"
                  >
                    <p className="text-sm text-neutral-800 leading-snug">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — WHAT I DO */}
      <section className="mt-14 sm:mt-20">
        <Container>
          <SectionTitle
            title="What I Do"
            description="Practical support and delivery across websites, systems, and workflows."
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card>
              <ul className="space-y-3">
                {WHAT_I_DO.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-neutral-300" />
                    <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                I’m most useful in roles where reliability matters: keeping
                production systems stable, improving UX and performance, fixing
                issues quickly, and making workflows easier for non-technical
                users. I communicate clearly, document what I build, and make
                handover simple.
              </p>
              <div className="mt-4">
                <Link
                  to="/contact"
                  className="text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
                >
                  Tell me what you need →
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* SECTION 4 — SELECTED WORK */}
      <section className="mt-14 sm:mt-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionTitle title="Selected Work" />
            <Link
              to="/work"
              className="hidden sm:inline-flex text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
            >
              View all →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.map((item) => (
              <Card key={item.title}>
                <h3 className="text-base font-semibold text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {item.outcome}
                </p>
                <div className="mt-4">
                  <Link
                    to={item.to}
                    className="text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
                  >
                    View case study →
                  </Link>
                </div>
              </Card>
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
        </Container>
      </section>

      {/* SECTION 5 — HOW I WORK */}
      <section className="mt-14 sm:mt-20">
        <Container>
          <SectionTitle
            title="How I Work"
            description="A reliable process built around clarity and long-term maintainability."
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <Card key={p.title}>
                <h3 className="text-base font-semibold text-neutral-950">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {p.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 6 — SYSTEMS & PROCESS */}
      <section className="mt-14 sm:mt-20">
        <Container>
          <Card>
            <p className="text-base sm:text-lg text-neutral-800 leading-relaxed">
              Beyond writing code, I design workflows and internal systems that
              reduce ambiguity and keep work moving smoothly. I care about how
              projects are delivered, supported, and handed over — not just how
              they’re built.
            </p>
            <div className="mt-4">
              <Link
                to="/systems"
                className="text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition"
              >
                Read about my process →
              </Link>
            </div>
          </Card>
        </Container>
      </section>

      {/* SECTION 7 — CALL TO ACTION */}
      <section className="mt-14 sm:mt-20 pb-16 sm:pb-20">
        <Container>
          <Card>
            <p className="text-base sm:text-lg font-semibold text-neutral-950">
              If you’re looking for a reliable developer who can build, support,
              and own systems end-to-end, let’s talk.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink to="/contact" label="Contact Me" variant="primary" />
              <ButtonLink
                to="/resume"
                label="View Resume"
                variant="secondary"
              />
            </div>
          </Card>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <Container>
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
        </Container>
      </footer>
    </main>
  );
}

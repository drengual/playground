import { Link } from "react-router";
import type { Route } from "./+types/about";
import NavLinks from "~/components/NavLinks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "Learn more about us" },
  ];
}

export default function About() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">About Us 📖</h1>
      <p className="text-lg text-gray-600 mb-6">
        This is your about page. Tell your story here!
      </p>
      <nav className="space-x-4">
        <NavLinks />
      </nav>
    </main>
  );
}

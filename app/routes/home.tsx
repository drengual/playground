import { Link } from "react-router";
import type { Route } from "./+types/home";
import NavLinks from "../components/NavLinks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to my app!" },
  ];
}

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome Home! 👋</h1>
      <p className="text-lg text-gray-600 mb-6">
        This is your homepage. We've kept it simple!
      </p>
      <nav className="space-x-4">
        <NavLinks />
      </nav>
    </main>
  );
}

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Star,
  Menu,
  X,
  Stethoscope,
  Smile,
  Shield,
  ArrowRight,
  Award,
  Users,
} from "lucide-react";

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* NAVIGATION */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <div className="bg-blue-600 p-2 rounded-xl">
              <Smile className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 uppercase">
              BrightSmile
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {["Services", "About", "Why Us", "Work", "Reviews"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  scrollToSection(item.toLowerCase().replace(/\s+/g, "-"))
                }
                className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-lg"
            >
              BOOK NOW
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 p-6 space-y-4 animate-in slide-in-from-top">
            {["Services", "About", "Why Us", "Work", "Reviews"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  scrollToSection(item.toLowerCase().replace(/\s+/g, "-"))
                }
                className="block w-full text-left text-sm font-bold text-slate-500 uppercase tracking-widest"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold"
            >
              BOOK NOW
            </button>
          </div>
        )}
      </nav>

      {/* 1. HERO SECTION: Catching attention & Overview */}
      <section id="hero" className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-widest uppercase">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              Now Accepting New Patients in Makati
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              World-class dental care for{" "}
              <span className="text-blue-600">modern lives.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
              We combine advanced clinical technology with a human-centered
              approach to give you the healthiest smile in the Philippines.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl shadow-blue-200"
              >
                Start Your Journey <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors"
              >
                View Results
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES: The different services provided */}
      <section id="services" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">
                Expertise
              </h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                Clinical Specializations
              </h3>
            </div>
            <p className="text-slate-500 max-w-sm">
              From prevention to complex restorations, we offer a full suite of
              specialized dental solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "General Care",
                desc: "Routine cleaning, fillings, and digital X-rays to maintain health.",
                icon: Stethoscope,
              },
              {
                title: "Orthodontics",
                desc: "Invisible aligners and modern braces for perfect alignment.",
                icon: Sparkles,
              },
              {
                title: "Surgery",
                desc: "Wisdom tooth removal and dental implants with minimal recovery.",
                icon: Shield,
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-200 hover:shadow-2xl transition-all group"
              >
                <s.icon
                  className="text-blue-600 mb-6 group-hover:scale-110 transition-transform"
                  size={40}
                />
                <h4 className="text-2xl font-bold mb-4">{s.title}</h4>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT: Branding & Persona */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
              alt="Dental Team"
              className="rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            />
            <div className="absolute -bottom-10 -right-10 bg-blue-600 text-white p-10 rounded-4xl hidden md:block">
              <p className="text-4xl font-black">15+</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-80">
                Years Excellence
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">
              The Brand
            </h2>
            <h3 className="text-5xl font-black tracking-tighter">
              We believe a smile is more than just teeth.
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed italic">
              "My goal as your lead dentist isn't just to fix problems—it's to
              design a lifestyle of confidence. We built BrightSmile to bridge
              the gap between clinical excellence and a spa-like experience."
            </p>
            <p className="text-slate-500">
              Founded by Dr. Cruz, our clinic serves the Makati business
              district with a focus on efficiency, transparency, and
              high-aesthetic results. We treat every patient as a partner in
              their own health journey.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SERVICE FLEX: Why we are great */}
      <section
        id="why-us"
        className="py-24 px-6 bg-slate-900 text-white rounded-[4rem] mx-4"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-4xl font-black tracking-tight mb-6">
              Why Patients Choose BrightSmile
            </h3>
            <p className="text-slate-400">
              We don't just do dentistry; we provide a superior patient
              experience built on three core pillars.
            </p>
          </div>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Pain-Free Guarantee",
                desc: "Our sedation and local anesthesia techniques ensure zero discomfort.",
                icon: Award,
              },
              {
                title: "Same-Day Results",
                desc: "Digital scanning allows for faster turnarounds on crowns and aligners.",
                icon: Clock,
              },
              {
                title: "PDA Certified",
                desc: "Full compliance with Philippine Dental Association safety standards.",
                icon: ShieldCheck,
              },
              {
                title: "Flexible Payments",
                desc: "0% interest installment plans for major orthodontic work.",
                icon: Users,
              },
            ].map((f, i) => (
              <div
                key={i}
                className="flex gap-6 p-6 bg-white/5 rounded-3xl border border-white/10"
              >
                <f.icon className="text-blue-400 shrink-0" size={32} />
                <div>
                  <h5 className="text-xl font-bold mb-2">{f.title}</h5>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICE WORK: Portfolio/Examples */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-blue-600 font-bold uppercase text-sm tracking-widest">
              Portfolio
            </h2>
            <h3 className="text-4xl font-black text-slate-900">
              Smile Transformations
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                label: "Full Veneers Case",
                time: "2 Sessions",
                img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
              },
              {
                label: "Invisible Aligners",
                time: "6 Months",
                img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
              },
            ].map((w, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden rounded-[2.5rem] mb-6 shadow-xl">
                  <img
                    src={w.img}
                    alt={w.label}
                    className="w-full h-100 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-center px-4">
                  <h5 className="text-2xl font-bold">{w.label}</h5>
                  <span className="bg-slate-100 px-4 py-1 rounded-full text-sm font-bold text-slate-500">
                    {w.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS: Proof of Satisfaction */}
      <section
        id="reviews"
        className="py-24 px-6 bg-blue-600 text-white rounded-[4rem] mx-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="flex gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} fill="currentColor" size={32} />
              ))}
            </div>
            <p className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">
              "BrightSmile changed my life. As a flight attendant, my smile is
              my uniform. They delivered exactly what they promised—and it was
              totally painless."
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?u=anna"
                className="w-16 h-16 rounded-full border-4 border-white/20"
                alt="Patient"
              />
              <div className="text-left">
                <p className="font-bold text-xl uppercase">Anna Gutierrez</p>
                <p className="text-blue-200">Patient since 2021</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT: Conversion CTA */}
      <section
        id="contact"
        className="py-24 px-6 max-w-4xl mx-auto scroll-mt-20"
      >
        <div className="bg-white border-2 border-slate-100 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="text-center mb-12">
            <h4 className="text-4xl font-black text-slate-900 mb-4">
              Ready to Transform Your Smile?
            </h4>
            <p className="text-slate-500 text-lg">
              Leave your details below and our clinic manager will contact you
              within 2 hours to confirm your slot.
            </p>
          </div>

          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              setFormStatus("success");
            }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full p-5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
              <input
                required
                type="tel"
                placeholder="Mobile Number"
                className="w-full p-5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
            </div>
            <select className="w-full p-5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 outline-none appearance-none">
              <option>Select Service</option>
              <option>General Checkup</option>
              <option>Cosmetic Dentistry</option>
              <option>Orthodontics</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-slate-900 shadow-2xl shadow-blue-200 transition-all"
            >
              {formStatus === "success"
                ? "REQUEST SENT! WE WILL CALL YOU."
                : "SECURE MY APPOINTMENT"}
            </button>
          </form>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-slate-100 mt-20">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          BrightSmile © 2024 • Built with Purpose
        </p>
      </footer>
    </div>
  );
};

export default App;

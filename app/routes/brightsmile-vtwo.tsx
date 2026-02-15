import React, { useState } from 'react';
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
  MessageCircle,
  Activity,
  Heart // Added missing Heart import
} from 'lucide-react';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* NAVIGATION */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="bg-blue-600 p-2 rounded-xl">
              <Smile className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 uppercase">BrightSmile</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Services', 'Why Us', 'Doctors', 'Process', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-slate-900 transition-all shadow-lg shadow-blue-100"
            >
              REQUEST APPOINTMENT
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 p-6 space-y-4 animate-in slide-in-from-top">
             {['Services', 'Why Us', 'Doctors', 'Process', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                className="block w-full text-left text-sm font-bold text-slate-500 uppercase tracking-widest"
              >
                {item}
              </button>
            ))}
            <button 
               onClick={() => scrollToSection('contact')}
               className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold"
            >
              REQUEST APPOINTMENT
            </button>
          </div>
        )}
      </nav>

      {/* 1. HERO SECTION */}
      <section id="hero" className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-widest uppercase">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              Trusted Dental Care in Makati
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Gentle, modern <span className="text-blue-600">dental care.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
              Trusted dental services for families and working professionals. Request your appointment online and our clinic will confirm your schedule shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => scrollToSection('contact')} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-900 transition-colors flex items-center justify-center gap-3 shadow-2xl shadow-blue-100">
                Request an Appointment <ArrowRight size={20} />
              </button>
              <a href="tel:09123456789" className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-3">
                <Phone size={20} /> Call Clinic
              </a>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              No instant booking. Our front desk confirms every request to avoid scheduling conflicts.
            </p>
          </div>
        </div>
      </section>

      {/* 2. QUICK TRUST SIGNALS */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { Icon: UserCheck, text: "Licensed Dentists" },
              { Icon: ShieldCheck, text: "Sterile & Modern Clinic" },
              { Icon: Heart, text: "Patient-First Care" },
              { Icon: Shield, text: "Privacy-Conscious Forms" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-600">
                <item.Icon className="text-blue-600 shrink-0" size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">Dental Services</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">How We Help You</h3>
            </div>
            <p className="text-slate-500 max-w-sm">We offer complete dental care—from routine checkups to cosmetic treatments—focused on comfort, clarity, and long-term oral health.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "General Dentistry", desc: "Checkups, diagnosis, and preventive care for a healthy baseline.", icon: Stethoscope },
              { title: "Teeth Cleaning", desc: "Professional prophylaxis to keep your gums healthy and breath fresh.", icon: Sparkles },
              { title: "Fillings & Restorations", desc: "Expertly repair and protect damaged teeth with modern materials.", icon: ShieldCheck },
              { title: "Orthodontics (Braces)", desc: "Alignment consultations and tailored plans for the perfect smile.", icon: Activity },
              { title: "Cosmetic Dentistry", desc: "Enhancement treatments including whitening and premium veneers.", icon: Smile },
              { title: "Tooth Extraction", desc: "Safe, guided extraction with comprehensive aftercare support.", icon: Shield },
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-4xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                <s.icon className="text-blue-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h4 className="text-xl font-bold mb-3">{s.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <button onClick={() => scrollToSection('contact')} className="text-blue-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Request consultation <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section id="why-us" className="py-24 px-6 bg-slate-900 text-white rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-4xl font-black tracking-tight mb-6">Why Patients Choose BrightSmile</h3>
            <p className="text-slate-400">We don't just do dentistry; we provide a superior patient experience built on reassurance and clarity.</p>
          </div>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {[
              { title: "Clear, Gentle Approach", desc: "We explain procedures clearly and prioritize patient comfort at every step.", icon: Smile },
              { title: "Modern, Clean Clinic", desc: "Updated equipment and strict sterilization standards for your safety.", icon: ShieldCheck },
              { title: "Easy Appointments", desc: "Book online anytime—our staff reviews every request to confirm your slot.", icon: Calendar },
              { title: "Busy Schedule Friendly", desc: "Efficient workflows designed for working professionals and families.", icon: Clock },
            ].map((f, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                <f.icon className="text-blue-400 shrink-0" size={32} />
                <div>
                  <h5 className="text-xl font-bold mb-2">{f.title}</h5>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MEET THE DOCTORS */}
      <section id="doctors" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">The Team</h2>
          <h3 className="text-4xl font-black text-slate-900">Meet Your Dentists</h3>
          <p className="text-slate-500 max-w-2xl mx-auto">BrightSmile Dental Clinic is led by licensed dentists dedicated to providing patient-first care in a calm, professional environment.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { name: "Dr. Sarah Cruz", role: "General Dentistry & Veneers", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400" },
            { name: "Dr. James Santos", role: "Orthodontics Specialist", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400" },
            { name: "Dr. Elena Reyes", role: "Pediatric Dentist", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400" },
          ].map((doc, i) => (
            <div key={i} className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-56 h-56 rounded-[3rem] overflow-hidden shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100">
                  <Smile className="text-blue-600" size={20} />
                </div>
              </div>
              <h4 className="text-2xl font-black text-slate-900">{doc.name}</h4>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mt-1">{doc.role}</p>
              <p className="text-slate-500 text-sm mt-4 px-6 leading-relaxed">Licensed dentist focused on gentle care and clear treatment guidance.</p>
            </div>
          ))}
        </div>
        <div className="mt-16 p-8 bg-blue-50 rounded-[2.5rem] text-center">
          <p className="text-blue-900 font-medium italic">"Our team believes good dental care starts with trust, comfort, and clear communication."</p>
        </div>
      </section>

      {/* 6. HOW BOOKING WORKS */}
      <section id="process" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">Transparency</h2>
            <h3 className="text-4xl font-black text-slate-900">How Booking Works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              { title: "Request Online", desc: "Choose your service and preferred date & time via our simple form.", icon: Calendar },
              { title: "Clinic Confirms", desc: "Our front desk reviews and confirms to avoid double bookings.", icon: CheckCircle2 },
              { title: "Visit the Clinic", desc: "Arrive on time and receive care in a comfortable environment.", icon: MapPin },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl text-blue-600">
                  <step.icon size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{i + 1}. {step.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-slate-400 text-sm font-medium italic">
            Note: This is a request-based system to ensure accurate scheduling.
          </p>
        </div>
      </section>

      {/* 7. EXPERIENCE */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-blue-600 font-bold uppercase text-sm tracking-widest">Experience</h2>
            <h3 className="text-4xl font-black text-slate-900">Patient-Centered Environment</h3>
            <div className="space-y-4 pt-4">
              {[
                "Clean, modern treatment rooms",
                "Friendly front desk assistance",
                "Clear aftercare guidance"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-blue-600 rounded-full p-1 text-white">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-slate-100">
              <p className="text-slate-500 italic">“The clinic staff was friendly and the process was very clear.”</p>
              <p className="font-bold text-slate-900 mt-2">— Verified Patient</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl aspect-square object-cover" alt="Clinic 1" />
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl aspect-square object-cover mt-8" alt="Clinic 2" />
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA + CONTACT */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto scroll-mt-20">
        <div className="bg-white border-2 border-slate-100 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-blue-600 font-bold uppercase text-xs tracking-widest mb-4">Final Step</h2>
            <h4 className="text-4xl font-black text-slate-900 mb-4">Ready to Visit the Clinic?</h4>
            <p className="text-slate-500 text-lg">Submit your preferred schedule online. Our clinic will confirm shortly.</p>
          </div>

          <form onSubmit={(e: React.FormEvent) => { e.preventDefault(); setFormStatus('success'); }} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input required type="text" placeholder="Full Name" className="w-full p-5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all" />
              <input required type="tel" placeholder="Mobile Number" className="w-full p-5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all" />
            </div>
            <select className="w-full p-5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 outline-none appearance-none">
              <option>Select Service</option>
              <option>General Dentistry</option>
              <option>Teeth Cleaning</option>
              <option>Fillings & Restorations</option>
              <option>Orthodontics</option>
              <option>Cosmetic Dentistry</option>
              <option>Extraction</option>
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-slate-900 shadow-2xl shadow-blue-200 transition-all">
              {formStatus === 'success' ? 'REQUEST SENT! WE WILL CALL YOU.' : 'REQUEST AN APPOINTMENT'}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="tel:09123456789" className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-600 transition-colors">
              <Phone size={18} /> Call the Clinic
            </a>
            <button className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-600 transition-colors">
              <MessageCircle size={18} /> Message via Messenger
            </button>
          </div>
          
          <p className="text-center mt-8 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            We collect only basic contact details. No medical history required online.
          </p>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-slate-100 mt-20">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">BrightSmile © 2024 • Professional & Gentle Care</p>
      </footer>
    </div>
  );
};

export default App;
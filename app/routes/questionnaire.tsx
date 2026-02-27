import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";

export function meta() {
  return [
    { title: "Brand Questionnaire - Parachute Consulting" },
    {
      name: "description",
      content:
        "Complete our brand questionnaire to help us understand your vision",
    },
  ];
}

export default function Questionnaire() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current!);

    try {
      const response = await fetch("https://formspree.io/f/xykdvgez", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-3xl p-12 text-center shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Thank You!</h2>
          <p className="text-slate-600 mb-8">
            Your questionnaire has been submitted successfully. We'll review
            your responses and be in touch shortly.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-800 font-bold hover:text-slate-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <span className="text-sm text-slate-500 font-medium">
            Parachute Consulting
          </span>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-3xl mx-auto py-12 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-slate-800 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-6">
              Brand Questionnaire
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Let's Define Your Brand
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              This questionnaire is designed to give you clarity on your brand's
              identity, audience, and goals. Take your time answering,{" "}
              <strong>there are no right or wrong responses</strong>, only what
              feels true to your brand!
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
            {/* Question 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-[#172F7C] text-white rounded-full flex items-center justify-center font-bold">
                  01
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Beyond looking "modern and fresh" what is the #1 goal?
                  </h3>
                  <p className="text-sm text-slate-500">
                    For example: Is it to build trust before a meeting, or to
                    generate cold inquiries from the site?
                  </p>
                </div>
              </div>
              <textarea
                name="question1_goal"
                rows={4}
                required
                placeholder="We want a site that acts as a 'digital handshake.' When I meet an ASX board member..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#172F7C] focus:border-transparent resize-none"
              />
            </div>

            {/* Question 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-[#172F7C] text-white rounded-full flex items-center justify-center font-bold">
                  02
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Who are the audience/we speaking to?
                  </h3>
                  <p className="text-sm text-slate-500">
                    For example: Are we targeting C-suite executives, small
                    business owners, or international partners?
                  </p>
                </div>
              </div>
              <textarea
                name="question2_audience"
                rows={4}
                required
                placeholder="Our primary audience is Australian enterprise leaders and decision-makers..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#172F7C] focus:border-transparent resize-none"
              />
            </div>

            {/* Question 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-[#172F7C] text-white rounded-full flex items-center justify-center font-bold">
                  03
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    The "De-Clutter" Goal: Which associations are we moving away
                    from?
                  </h3>
                  <p className="text-sm text-slate-500">
                    You mentioned wanting to remove references to previous
                    associations. What is the main message we should lead with
                    instead?
                  </p>
                </div>
              </div>
              <textarea
                name="question3_declutter"
                rows={4}
                required
                placeholder="I want to move away from the 'boutique subcontractor' image and pivot toward being a 'Lead Strategy Architect'..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#172F7C] focus:border-transparent resize-none"
              />
            </div>

            {/* Question 4 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-[#172F7C] text-white rounded-full flex items-center justify-center font-bold">
                  04
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Visual Vibe: Which "Interactive Concept" / Mockup websites
                    resonates most?
                  </h3>
                  <p className="text-sm text-slate-500">
                    Based on the live mockups, which direction feels like the
                    future of Parachute?
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="radio"
                    name="question4_mockup"
                    value="Editorial Prestige"
                    required
                    className="w-5 h-5 text-[#172F7C] focus:ring-[#172F7C]"
                  />
                  <div>
                    <span className="font-bold text-slate-800">
                      Direction 1: Editorial Prestige
                    </span>
                    <p className="text-sm text-slate-500">
                      Magazine style, classic
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="radio"
                    name="question4_mockup"
                    value="Kinetic Minimalist"
                    className="w-5 h-5 text-[#172F7C] focus:ring-[#172F7C]"
                  />
                  <div>
                    <span className="font-bold text-slate-800">
                      Direction 2: Kinetic Minimalist
                    </span>
                    <p className="text-sm text-slate-500">Tech-forward, fast</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="radio"
                    name="question4_mockup"
                    value="Mineral Vanguard"
                    className="w-5 h-5 text-[#172F7C] focus:ring-[#172F7C]"
                  />
                  <div>
                    <span className="font-bold text-slate-800">
                      Direction 3: Mineral Vanguard
                    </span>
                    <p className="text-sm text-slate-500">
                      Architectural, Australian
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Question 5 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-[#172F7C] text-white rounded-full flex items-center justify-center font-bold">
                  05
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    How should your LinkedIn profile support the site?
                  </h3>
                  <p className="text-sm text-slate-500">
                    As we fold this into a LinkedIn rewrite, what is the one key
                    takeaway you want someone to have after seeing your profile
                    banner and headline?
                  </p>
                </div>
              </div>
              <textarea
                name="question5_linkedin"
                rows={4}
                required
                placeholder="I want them to see 'Stability' and 'Precision.' The LinkedIn should look like a professional extension of the website's 'Mineral' aesthetic..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#172F7C] focus:border-transparent resize-none"
              />
            </div>

            {/* Question 6 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-[#172F7C] text-white rounded-full flex items-center justify-center font-bold">
                  06
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    What parts of the site will you want to change yourself?
                  </h3>
                  <p className="text-sm text-slate-500">
                    Even though we are building a custom-engineered site, I will
                    provide you with a <strong>Simple Edit</strong> option.
                  </p>
                </div>
              </div>
              <textarea
                name="question6_editable"
                rows={4}
                required
                placeholder="I'd like to be able to jump in once a month to update our 'Recent Projects' photos, change a few sentences in my bio, or post a new article..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#172F7C] focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-3 px-12 py-5 bg-[#172F7C] text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={22} />
                    Submit Questionnaire
                  </>
                )}
              </button>
              <p className="mt-4 text-sm text-slate-500">
                Your responses will be sent directly to our team via email.
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-8 bg-white border-t border-slate-200 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-500">
            Questions? Contact us at vericlla2@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
}

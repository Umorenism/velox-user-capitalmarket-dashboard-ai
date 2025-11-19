// src/pages/dashboard/Support.jsx
import React, { useEffect, useRef } from "react";
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Search, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  Zap,
  Shield,
  Clock,
  MessageCircleCode,
  ArrowRight
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SupportPage() {
  const containerRef = useRef(null);
  const faqRefs = useRef([]);
  const [openFaq, setOpenFaq] = React.useState(null);

  const faqs = [
    {
      q: "How do I reset my password?",
      a: "Go to Settings > Security > Change Password. You'll receive a verification code via email."
    },
    {
      q: "What are the withdrawal limits?",
      a: "Daily limit: $50,000. Monthly: $500,000. VIP members get higher limits."
    },
    {
      q: "How long do deposits take?",
      a: "Crypto: 5–15 mins. Bank wire: 1–3 business days. Internal transfer: instant."
    },
    {
      q: "Is my data secure?",
      a: "Yes. We use 256-bit SSL encryption, 2FA, and cold storage for funds."
    },
    {
      q: "How do I contact live support?",
      a: "Click the chat bubble in the bottom-right corner. Available 24/7."
    }
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(".support-hero h1", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(".support-hero p", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3 }
      );

      // Cards
      gsap.fromTo(".support-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".support-cards",
            start: "top 80%"
          }
        }
      );

      // FAQ
      faqRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%"
            }
          }
        );
      });

      // Form
      gsap.fromTo(".support-form",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: ".support-form",
            start: "top 85%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  const toggleFaq = (i) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8 px-4 sm:px-8 lg:px-16">
      {/* HERO */}
      <div className="support-hero text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          We're Here to Help
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Get instant support, explore guides, or contact our 24/7 team.
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="support-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
        <div className="support-card bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group">
          <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <MessageCircleCode className="text-teal-600 dark:text-teal-400" size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Chat with us now — average response: 30 sec</p>
          <button className="mt-4 text-teal-600 dark:text-teal-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Start Chat <Zap size={16} />
          </button>
        </div>

        <div className="support-card bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Mail className="text-blue-600 dark:text-blue-400" size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Email Support</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get detailed help within 2 hours</p>
          <a href="mailto:support@veloxcapital.com" className="mt-4 text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Send Email <ArrowRight size={16} />
          </a>
        </div>

        <div className="support-card bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group">
          <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Phone className="text-purple-600 dark:text-purple-400" size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Phone Support</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Call us: +1 (555) 123-4567</p>
          <p className="mt-4 text-purple-600 dark:text-purple-400 font-medium">Mon–Fri, 9AM–6PM EST</p>
        </div>

        <div className="support-card bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group">
          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <BookOpen className="text-amber-600 dark:text-amber-400" size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Knowledge Base</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Browse 200+ help articles</p>
          <button className="mt-4 text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Explore <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              ref={el => faqRefs.current[i] = el}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
              >
                <span className="font-medium text-gray-800 dark:text-white pr-4">
                  {faq.q}
                </span>
                {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300 text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="support-form max-w-2xl mx-auto bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Still Need Help? Send Us a Message
        </h2>
        <form className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
          />
          <textarea
            rows={5}
            placeholder="Describe your issue..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition resize-none"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          We typically respond within <strong>1 hour</strong>
        </p>
      </div>

      {/* LIVE CHAT FLOATING BUTTON */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-2xl flex items-center justify-center transition transform hover:scale-110 z-50">
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
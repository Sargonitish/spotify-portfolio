"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Globe,
  Code2,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { portfolioData } from "@/data/portfolio";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email format";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.length < 10)
      errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const contactLinks = [
    {
      label: "Email",
      value: portfolioData.email,
      href: `mailto:${portfolioData.email}`,
      icon: Mail,
    },
    {
      label: "LinkedIn",
      value: portfolioData.linkedin,
      href: portfolioData.linkedin,
      icon: Globe,
    },
    {
      label: "GitHub",
      value: portfolioData.github,
      href: portfolioData.github,
      icon: Code2,
    },
    {
      label: "X (Twitter)",
      value: portfolioData.twitter,
      href: portfolioData.twitter,
      icon: MessageCircle,
    },
  ];

  return (
    <section id="contact" className="px-4 py-16 md:py-24">
      <AnimatedSection>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <span
              className="w-1.5 h-6 rounded-full inline-block"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span style={{ color: "var(--text-primary)" }}>Contact</span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--accent)",
                color: "#fff",
              }}
            >
              Premium
            </span>
          </h2>

          <motion.div
            className="rounded-lg overflow-hidden border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Contact info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3
                      className="text-lg font-bold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Get in touch
                    </h3>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      Let&apos;s build something amazing together
                    </p>
                  </div>

                  <div className="space-y-3">
                    {contactLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-md transition-colors group"
                          style={{ backgroundColor: "var(--bg-hover)" }}
                        >
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors"
                            style={{ backgroundColor: "var(--bg-card)" }}
                          >
                            <Icon
                              className="w-4 h-4 transition-colors"
                              style={{ color: "var(--accent)" }}
                            />
                          </div>
                          <div className="min-w-0">
                            <p
                              className="text-xs font-medium"
                              style={{ color: "var(--text-subtext)" }}
                            >
                              {link.label}
                            </p>
                            <p
                              className="text-sm truncate"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {link.value}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-3">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center h-full py-12"
                    >
                      <CheckCircle
                        className="w-12 h-12 mb-3"
                        style={{ color: "var(--accent)" }}
                      />
                      <p
                        className="font-bold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Message sent!
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        I&apos;ll get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          className="block text-xs font-medium mb-1.5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => {
                            setForm({ ...form, name: e.target.value });
                            if (errors.name)
                              setErrors({ ...errors, name: undefined });
                          }}
                          className="w-full px-3 py-2.5 rounded-md text-sm outline-none transition-all duration-200 border"
                          style={{
                            backgroundColor: "var(--bg-hover)",
                            color: "var(--text-primary)",
                            borderColor: errors.name
                              ? "var(--spotify-error)"
                              : "transparent",
                          }}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="flex items-center gap-1 text-xs mt-1" style={{ color: "var(--spotify-error)" }}>
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-xs font-medium mb-1.5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                            if (errors.email)
                              setErrors({ ...errors, email: undefined });
                          }}
                          className="w-full px-3 py-2.5 rounded-md text-sm outline-none transition-all duration-200 border"
                          style={{
                            backgroundColor: "var(--bg-hover)",
                            color: "var(--text-primary)",
                            borderColor: errors.email
                              ? "var(--spotify-error)"
                              : "transparent",
                          }}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="flex items-center gap-1 text-xs mt-1" style={{ color: "var(--spotify-error)" }}>
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-xs font-medium mb-1.5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Message
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => {
                            setForm({ ...form, message: e.target.value });
                            if (errors.message)
                              setErrors({ ...errors, message: undefined });
                          }}
                          rows={4}
                          className="w-full px-3 py-2.5 rounded-md text-sm outline-none resize-none transition-all duration-200 border"
                          style={{
                            backgroundColor: "var(--bg-hover)",
                            color: "var(--text-primary)",
                            borderColor: errors.message
                              ? "var(--spotify-error)"
                              : "transparent",
                          }}
                          placeholder="Your message..."
                        />
                        {errors.message && (
                          <p className="flex items-center gap-1 text-xs mt-1" style={{ color: "var(--spotify-error)" }}>
                            <AlertCircle className="w-3 h-3" />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "#ffffff",
                        }}
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}

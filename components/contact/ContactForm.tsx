"use client";

import React, { useState } from "react";
import { useTransition } from "react";
import { submitEnquiry } from "@/lib/actions/enquiry";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";

interface ContactFormProps {
  initialCourseId?: string;
  initialCourseName?: string;
  coursesList?: { id?: string; title: string }[];
}

export function ContactForm({
  initialCourseId,
  initialCourseName,
  coursesList = [],
}: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: initialCourseId || "",
    courseName: initialCourseName || "",
    message: initialCourseName
      ? `Hi, I am interested in enrolling or learning more about "${initialCourseName}". Please share admission details.`
      : "",
    website_hp: "", // Honeypot
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });
    setFieldErrors({});

    startTransition(async () => {
      const res = await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        courseId: formData.courseId || null,
        courseName: formData.courseName,
        message: formData.message,
        website_hp: formData.website_hp,
      });

      if (res.success) {
        setStatus({ type: "success", message: res.message });
        setFormData({
          name: "",
          email: "",
          phone: "",
          courseId: "",
          courseName: "",
          message: "",
          website_hp: "",
        });
      } else {
        setStatus({ type: "error", message: res.message });
        if (res.errors) {
          setFieldErrors(res.errors);
        }
      }
    });
  };

  const whatsappDirectNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917397526669";
  const directWhatsappText = encodeURIComponent(
    formData.courseName
      ? `Hello! I would like to enquire about ${formData.courseName} at Fashion Art Institute.`
      : "Hello Fashion Art Institute! I would like to enquire about your courses."
  );

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-soft-lg border border-[#4A2511]/10">
      <div className="mb-8">
        <h3 className="font-heading text-2xl font-bold text-[#4A2511]">
          Send an Admission Enquiry
        </h3>
        <p className="text-sm text-[#7A6458] mt-1">
          Fill in your details below and our counseling faculty will connect
          with you within a few hours.
        </p>
      </div>

      {status.type === "success" ? (
        <div className="p-6 bg-[#FBF6EE] border-2 border-[#E8B520] rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#E8B520]/20 text-[#8F6C07] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-heading text-xl font-bold text-[#4A2511]">
            Enquiry Received!
          </h4>
          <p className="text-sm text-[#7A6458] max-w-md mx-auto">
            {status.message}
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${whatsappDirectNumber}?text=${directWhatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20b858] transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Chat on WhatsApp Directly
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot field (hidden from view) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_hp">Leave this empty</label>
            <input
              type="text"
              id="website_hp"
              name="website_hp"
              value={formData.website_hp}
              onChange={(e) =>
                setFormData({ ...formData, website_hp: e.target.value })
              }
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status.type === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-sm text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#4A2511] uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Priya Sundaram"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[#4A2511]/15 bg-[#FBF6EE]/40 text-[#4A2511] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B520] focus:border-transparent transition-all"
            />
            {fieldErrors.name && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.name[0]}</p>
            )}
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A2511] uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="priya@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-[#4A2511]/15 bg-[#FBF6EE]/40 text-[#4A2511] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B520] focus:border-transparent transition-all"
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-600 mt-1">
                  {fieldErrors.email[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A2511] uppercase tracking-wider mb-2">
                Phone Number / WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-[#4A2511]/15 bg-[#FBF6EE]/40 text-[#4A2511] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B520] focus:border-transparent transition-all"
              />
              {fieldErrors.phone && (
                <p className="text-xs text-red-600 mt-1">
                  {fieldErrors.phone[0]}
                </p>
              )}
            </div>
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#4A2511] uppercase tracking-wider mb-2">
              Interested Course
            </label>
            <select
              value={formData.courseName}
              onChange={(e) => {
                const selected = e.target.value;
                setFormData({
                  ...formData,
                  courseName: selected,
                });
              }}
              className="w-full px-4 py-3 rounded-xl border border-[#4A2511]/15 bg-[#FBF6EE]/40 text-[#4A2511] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B520] focus:border-transparent transition-all"
            >
              <option value="">-- Select a Course or General Query --</option>
              {coursesList.map((c) => (
                <option key={c.title} value={c.title}>
                  {c.title}
                </option>
              ))}
              <option value="General Tailoring & Designing Guidance">
                General Tailoring & Designing Guidance
              </option>
              <option value="Boutique Setup Assistance">
                Boutique Setup Assistance
              </option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-[#4A2511] uppercase tracking-wider mb-2">
              Your Message or Questions *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell us about your learning goals or ask any question regarding class timings, fees, or syllabus..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[#4A2511]/15 bg-[#FBF6EE]/40 text-[#4A2511] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B520] focus:border-transparent transition-all"
            />
            {fieldErrors.message && (
              <p className="text-xs text-red-600 mt-1">
                {fieldErrors.message[0]}
              </p>
            )}
          </div>

          {/* Submit Button & WhatsApp Alternative */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Button
              type="submit"
              disabled={isPending}
              variant="gold"
              size="lg"
              className="w-full sm:w-auto gap-2"
            >
              <Send className="w-4 h-4" />
              {isPending ? "Submitting Enquiry..." : "Submit Enquiry"}
            </Button>

            <a
              href={`https://wa.me/${whatsappDirectNumber}?text=${directWhatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#25D366] text-[#128C7E] font-medium text-sm hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Quick WhatsApp Enquiry
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

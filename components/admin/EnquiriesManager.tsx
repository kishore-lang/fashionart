"use client";

import React, { useState, useTransition } from "react";
import {
  MessageSquareText,
  Search,
  Filter,
  Phone,
  Mail,
  Trash2,
  ExternalLink,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { AdminEnquiry } from "@/data/seedAdmin";
import {
  updateEnquiryStatusAction,
  deleteEnquiryAction,
} from "@/lib/actions/admin";

interface EnquiriesManagerProps {
  initialEnquiries: AdminEnquiry[];
}

export function EnquiriesManager({ initialEnquiries }: EnquiriesManagerProps) {
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>(initialEnquiries);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (
    id: string,
    status: "new" | "contacted" | "enrolled" | "closed"
  ) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    startTransition(async () => {
      await updateEnquiryStatusAction(id, status);
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    startTransition(async () => {
      await deleteEnquiryAction(id);
    });
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus =
      filterStatus === "all" ? true : item.status === filterStatus;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const countByStatus = (status: string) =>
    enquiries.filter((e) => (status === "all" ? true : e.status === status)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2511]">
            Student Enquiries & Admissions
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6458]">
            Review, reply via WhatsApp, and track admission status of students.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A6458]" />
          <input
            type="text"
            placeholder="Search by student, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#4A2511]/15 bg-white focus:outline-none focus:ring-2 focus:ring-[#E8B520]/40"
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { key: "all", label: "All Enquiries" },
          { key: "new", label: "New (Pending)" },
          { key: "contacted", label: "Contacted" },
          { key: "enrolled", label: "Enrolled" },
          { key: "closed", label: "Closed" },
        ].map((tab) => {
          const count = countByStatus(tab.key);
          const active = filterStatus === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border ${
                active
                  ? "bg-[#4A2511] text-[#E8B520] border-[#4A2511] shadow-sm"
                  : "bg-white text-[#7A6458] border-[#4A2511]/10 hover:border-[#E8B520]/40"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  active ? "bg-[#E8B520] text-[#4A2511]" : "bg-[#FBF6EE] text-[#7A6458]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Enquiries List */}
      <div className="bg-white rounded-3xl border border-[#4A2511]/10 shadow-soft overflow-hidden">
        {filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-[#7A6458] space-y-2">
            <MessageSquareText className="w-8 h-8 text-[#E8B520] mx-auto opacity-60" />
            <p className="text-sm font-medium">No enquiries match your search.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#4A2511]/5">
            {filteredEnquiries.map((enq) => {
              const whatsappMsg = encodeURIComponent(
                `Vanakkam ${enq.name}! This is Suguna Shanmugam from Fashion Art Institute, Gandhipuram, Coimbatore. Regarding your enquiry for ${enq.courseTitle}, we have weekday and weekend hands-on batches available. When would you like to visit us?`
              );

              return (
                <div
                  key={enq.id}
                  className="p-5 sm:p-6 hover:bg-[#FBF6EE]/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading font-bold text-base text-[#4A2511]">
                        {enq.name}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E8B520]/15 text-[#8F6C07] border border-[#E8B520]/30">
                        {enq.courseTitle}
                      </span>
                      <span className="text-xs text-[#7A6458] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#E8B520]" />
                        {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4A2511]/90 bg-[#FBF6EE]/70 p-3 rounded-xl border border-[#4A2511]/5 leading-relaxed">
                      &ldquo;{enq.message}&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#7A6458]">
                      <span className="flex items-center gap-1 font-medium">
                        <Phone className="w-3.5 h-3.5 text-[#E8B520]" />
                        {enq.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#E8B520]" />
                        {enq.email}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 md:pt-0">
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        handleStatusChange(
                          enq.id,
                          e.target.value as "new" | "contacted" | "enrolled" | "closed"
                        )
                      }
                      disabled={isPending}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
                        enq.status === "new"
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : enq.status === "contacted"
                          ? "bg-blue-50 text-blue-800 border-blue-300"
                          : enq.status === "enrolled"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                    >
                      <option value="new">Status: New</option>
                      <option value="contacted">Status: Contacted</option>
                      <option value="enrolled">Status: Enrolled</option>
                      <option value="closed">Status: Closed</option>
                    </select>

                    <a
                      href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition-colors"
                    >
                      <MessageSquareText className="w-3.5 h-3.5" />
                      <span>WhatsApp Reply</span>
                    </a>

                    <button
                      onClick={() => handleDelete(enq.id)}
                      disabled={isPending}
                      className="p-1.5 text-[#7A6458] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete enquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

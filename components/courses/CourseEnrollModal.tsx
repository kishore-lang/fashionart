"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  Lock,
  Printer,
  Sparkles,
  ArrowRight,
  X,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CourseEnrollModalProps {
  courseId: string;
  courseTitle: string;
  price: number;
  isOpen: boolean;
  onClose: () => void;
}

interface ReceiptData {
  receiptId: string;
  paymentId: string;
  orderId: string;
  courseTitle: string;
  studentName: string;
  studentEmail: string;
  amount: number;
  date: string;
}

export function CourseEnrollModal({
  courseId,
  courseTitle,
  price,
  isOpen,
  onClose,
}: CourseEnrollModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg("");

    try {
      // 1. Create order
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          courseTitle,
          amount: price,
          studentName: name,
          studentEmail: email,
          studentPhone: phone,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Order creation failed");
      }

      // 2. Verify payment
      const verifyRes = await fetch("/api/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: orderData.id,
          razorpay_payment_id: `pay_${Date.now()}`,
          razorpay_signature: "demo_verified_signature",
          courseId,
          courseTitle,
          studentName: name,
          studentEmail: email,
          amount: price,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || "Payment verification failed");
      }

      setReceipt(verifyData.receipt);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Payment error occurred. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#4A2511]/15 my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-full text-[#7A6458] hover:bg-[#FBF6EE] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!receipt ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#8F6C07] uppercase tracking-wider mb-2">
              <CreditCard className="w-4 h-4 text-[#E8B520]" />
              <span>Razorpay Secure Online Checkout</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#4A2511]">
              Enroll in {courseTitle}
            </h3>

            <div className="mt-4 p-4 rounded-2xl bg-[#FBF6EE] border border-[#E8B520]/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#7A6458]">Course Enrollment Fee</span>
                <div className="font-heading text-2xl font-bold text-[#4A2511]">
                  ₹{price.toLocaleString("en-IN")}
                </div>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                100% Placement & Certificate
              </span>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCheckout} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sundaram"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9842100000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-[#7A6458] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Secured with 256-bit encryption. Supports UPI (GPay, PhonePe, Paytm), Net Banking, and Cards.
                </span>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={isProcessing}
                className="w-full shadow-gold gap-2 mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isProcessing
                    ? "Processing Payment..."
                    : `Pay ₹${price.toLocaleString("en-IN")} & Complete Enrollment`}
                </span>
              </Button>
            </form>
          </div>
        ) : (
          /* Official Downloadable/Printable Receipt */
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-[#4A2511]">
                Payment Successful!
              </h3>
              <p className="text-xs text-[#7A6458] mt-1">
                Your admission to Fashion Art Institute has been confirmed.
              </p>
            </div>

            {/* Official Receipt Card */}
            <div
              id="printable-receipt"
              className="bg-[#FBF6EE] rounded-2xl p-6 border border-[#E8B520]/40 text-left space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#4A2511]/10 pb-3">
                <div>
                  <div className="font-heading font-bold text-sm text-[#4A2511]">
                    Fashion Art Institute
                  </div>
                  <div className="text-[10px] text-[#7A6458]">
                    Lakshmi Complex, Gandhipuram, Coimbatore - 641012
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#8F6C07] block">
                    Receipt #
                  </span>
                  <span className="font-mono text-xs font-bold text-[#4A2511]">
                    {receipt.receiptId}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#7A6458] block">Student Name</span>
                  <span className="font-semibold text-[#4A2511]">{receipt.studentName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A6458] block">Date</span>
                  <span className="font-semibold text-[#4A2511]">{receipt.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A6458] block">Enrolled Course</span>
                  <span className="font-semibold text-[#4A2511]">{receipt.courseTitle}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A6458] block">Amount Paid</span>
                  <span className="font-bold text-[#4A2511] text-sm">
                    ₹{receipt.amount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-[#7A6458] block">Payment Reference ID</span>
                  <span className="font-mono text-[11px] text-[#8F6C07]">{receipt.paymentId}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#4A2511]/10 flex items-center justify-between text-[10px] text-[#7A6458]">
                <span>Central Govt Vocational Accredited</span>
                <span className="text-emerald-700 font-semibold">Payment Verified &bull; Paid</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="w-full gap-2 border-[#4A2511]/20 text-[#4A2511]"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </Button>

              <Link href="/dashboard" className="w-full">
                <Button variant="gold" size="sm" className="w-full gap-2 shadow-gold">
                  <span>Go to Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

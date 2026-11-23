"use client";

import React, { useState } from "react";
import { CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CourseEnrollModal } from "./CourseEnrollModal";

interface CourseDetailEnrollButtonProps {
  courseId: string;
  courseTitle: string;
  price: number;
}

export function CourseDetailEnrollButton({
  courseId,
  courseTitle,
  price,
}: CourseDetailEnrollButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="gold"
        size="lg"
        onClick={() => setIsOpen(true)}
        className="w-full shadow-gold gap-2"
      >
        <CreditCard className="w-4 h-4 text-[#4A2511]" />
        <span>Enroll & Pay Online (Razorpay)</span>
      </Button>

      <CourseEnrollModal
        courseId={courseId}
        courseTitle={courseTitle}
        price={price}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

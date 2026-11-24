"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  Layers,
  Clock,
  IndianRupee,
  X,
  CheckCircle,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CourseData } from "@/data/seedCourses";
import {
  createCourseAction,
  updateCourseAction,
  deleteCourseAction,
} from "@/lib/actions/admin";
import { CourseInput } from "@/lib/validations/course";

interface CoursesManagerProps {
  initialCourses: CourseData[];
}

export function CoursesManager({ initialCourses }: CoursesManagerProps) {
  const [courses, setCourses] = useState<CourseData[]>(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<CourseInput["category"]>("Fashion Designing");
  const [mode, setMode] = useState<"online" | "offline" | "both">("both");
  const [price, setPrice] = useState(3999);
  const [durationDays, setDurationDays] = useState(60);
  const [stepsCount, setStepsCount] = useState(45);
  const [thumbnailUrl, setThumbnailUrl] = useState(
    "/images/courses/diploma-fashion.jpg"
  );
  const [nuancesInput, setNuancesInput] = useState(
    "Armhole curve drafting, Princess cut bust shaping, Concealed zip installation"
  );

  const handleStartEdit = (course: CourseData) => {
    setEditingCourse(course);
    setTitle(course.title);
    setDescription(course.description);
    setCategory(course.category as CourseInput["category"]);
    setMode(course.mode as "online" | "offline" | "both");
    setPrice(course.price);
    setDurationDays(course.durationDays);
    setStepsCount(course.stepsCount);
    setThumbnailUrl(course.thumbnailUrl);
    setNuancesInput(course.nuances?.join(", ") || "");
    setErrorMsg("");
  };

  const handleUpdateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    setErrorMsg("");

    const nuances = nuancesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updates: Partial<CourseInput> = {
      title,
      description,
      category,
      mode,
      price: Number(price),
      durationDays: Number(durationDays),
      stepsCount: Number(stepsCount),
      thumbnailUrl,
      nuances,
    };

    startTransition(async () => {
      try {
        const idOrSlug = editingCourse.id || editingCourse.slug;
        const res = await updateCourseAction(idOrSlug, updates);
        if (res.course) {
          setCourses((prev) =>
            prev.map((c) =>
              (c.id === idOrSlug || c.slug === idOrSlug) ? { ...c, ...res.course } : c
            )
          );
          setEditingCourse(null);
        }
      } catch (err: unknown) {
        setErrorMsg(err instanceof Error ? err.message : "Failed to update course.");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
    startTransition(async () => {
      await deleteCourseAction(id);
    });
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const nuances = nuancesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newCourseInput: CourseInput = {
      title,
      description,
      category,
      mode,
      price: Number(price),
      durationDays: Number(durationDays),
      stepsCount: Number(stepsCount),
      thumbnailUrl,
      syllabus: [
        {
          title: "Foundation & Drafting",
          items: ["Measurements taking", "Body proportion analysis", "Pattern paper cutting"],
        },
        {
          title: "Practical Stitching",
          items: ["Machine tuning & needle selection", "Garment assembly", "Finishing & pressing"],
        },
      ],
      nuances,
      isFeatured: false,
      isPublished: true,
    };

    startTransition(async () => {
      try {
        const res = await createCourseAction(newCourseInput);
        if (res.course) {
          setCourses((prev) => [res.course, ...prev]);
          setIsModalOpen(false);
          // Reset form
          setTitle("");
          setDescription("");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("Failed to create course.");
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2511]">
            Curriculum & Course Management
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6458]">
            Add new tailored programmes, update syllabus nuances, and manage enrollment pricing.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="gap-2 shadow-gold text-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </Button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const courseId = course.id || course.slug;
          return (
            <div
              key={courseId}
              className="bg-white rounded-3xl border border-[#4A2511]/10 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-hover transition-all"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FBF6EE]">
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#4A2511]/90 text-[#E8B520] backdrop-blur-sm shadow-sm">
                      {course.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-[#4A2511] backdrop-blur-sm shadow-sm">
                      {course.mode}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <h2 className="font-heading font-bold text-lg text-[#4A2511] line-clamp-1">
                    {course.title}
                  </h2>
                  <p className="text-xs text-[#7A6458] line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#4A2511]/10 text-center">
                    <div className="p-2 rounded-xl bg-[#FBF6EE]">
                      <span className="text-[10px] text-[#7A6458] block">Fee</span>
                      <span className="font-bold text-xs text-[#4A2511]">
                        {course.price === 0 ? "Free" : `₹${course.price.toLocaleString("en-IN")}`}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#FBF6EE]">
                      <span className="text-[10px] text-[#7A6458] block">Steps</span>
                      <span className="font-bold text-xs text-[#4A2511]">
                        {course.stepsCount} Steps
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#FBF6EE]">
                      <span className="text-[10px] text-[#7A6458] block">Duration</span>
                      <span className="font-bold text-xs text-[#4A2511]">
                        {course.durationDays}d
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer / Actions */}
              <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-[#4A2511]/5 mt-2">
                <Link
                  href={`/courses/${course.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#8F6C07] hover:text-[#4A2511]"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(course)}
                    disabled={isPending}
                    className="p-2 text-[#7A6458] hover:text-[#E8B520] hover:bg-[#E8B520]/10 rounded-xl transition-colors"
                    title="Edit course"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(courseId)}
                    disabled={isPending}
                    className="p-2 text-[#7A6458] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#4A2511]/20 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A2511]/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#E8B520]" />
                <h3 className="font-heading font-bold text-xl text-[#4A2511]">
                  Add New Course
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-[#7A6458] hover:bg-[#FBF6EE]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateCourse} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Bridal Blouse & Saree Draping"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as CourseInput["category"])
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  >
                    <option value="Fashion Designing">Fashion Designing</option>
                    <option value="Tailoring">Tailoring</option>
                    <option value="Embroidery">Embroidery</option>
                    <option value="Jewellery">Jewellery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Mode of Class *
                  </label>
                  <select
                    value={mode}
                    onChange={(e) =>
                      setMode(e.target.value as "online" | "offline" | "both")
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  >
                    <option value="both">Both (Online + Offline)</option>
                    <option value="offline">Offline Only (Gandhipuram)</option>
                    <option value="online">Online Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Fee (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Steps Count *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={stepsCount}
                    onChange={(e) => setStepsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Duration (Days) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Thumbnail Image URL (Cloudinary / Unsplash) *
                </label>
                <input
                  type="url"
                  required
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Comprehensive training designed for homemakers and aspiring boutique owners..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Nuances Covered (comma separated)
                </label>
                <input
                  type="text"
                  value={nuancesInput}
                  onChange={(e) => setNuancesInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  className="shadow-gold gap-2"
                  disabled={isPending}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isPending ? "Saving..." : "Create Course"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#4A2511]/20 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A2511]/10">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#E8B520]" />
                <h3 className="font-heading font-bold text-xl text-[#4A2511]">
                  Edit Course: {editingCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-1 rounded-xl text-[#7A6458] hover:bg-[#FBF6EE]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleUpdateCourse} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as CourseInput["category"])
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  >
                    <option value="Fashion Designing">Fashion Designing</option>
                    <option value="Tailoring">Tailoring</option>
                    <option value="Embroidery">Embroidery</option>
                    <option value="Jewellery">Jewellery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Training Mode *
                  </label>
                  <select
                    value={mode}
                    onChange={(e) =>
                      setMode(e.target.value as "online" | "offline" | "both")
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  >
                    <option value="both">Online & Offline</option>
                    <option value="online">Online Only</option>
                    <option value="offline">Offline / Practical Studio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Fee (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                    Steps Count
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={stepsCount}
                    onChange={(e) => setStepsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Thumbnail Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Nuances Covered (comma separated)
                </label>
                <input
                  type="text"
                  value={nuancesInput}
                  onChange={(e) => setNuancesInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingCourse(null)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  className="shadow-gold gap-2"
                  disabled={isPending}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isPending ? "Updating..." : "Save Changes"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GallerySeedItem } from "@/data/seedPhase2";
import {
  createGalleryItemAction,
  deleteGalleryItemAction,
} from "@/lib/actions/admin";
import { GalleryItemInput } from "@/lib/validations/course";

interface GalleryManagerProps {
  initialGallery: GallerySeedItem[];
}

export function GalleryManager({ initialGallery }: GalleryManagerProps) {
  const [gallery, setGallery] = useState<GallerySeedItem[]>(initialGallery);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");

  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
  );
  const [category, setCategory] = useState<GalleryItemInput["category"]>("Fashion Show");
  const [caption, setCaption] = useState("");

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to remove this photo?")) return;
    setGallery((prev) => prev.filter((item) => item.id !== id));
    startTransition(async () => {
      await deleteGalleryItemAction(id);
    });
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const newPhotoInput: GalleryItemInput = {
      imageUrl,
      category,
      caption,
    };

    startTransition(async () => {
      try {
        const res = await createGalleryItemAction(newPhotoInput);
        if (res.item) {
          setGallery((prev) => [res.item, ...prev]);
          setIsModalOpen(false);
          setCaption("");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("Failed to add photo.");
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
            Media Gallery & Showcase
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6458]">
            Manage high-resolution images stored via Cloudinary across bridal, Aari, and record categories.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="gap-2 shadow-gold text-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-3xl border border-[#4A2511]/10 shadow-soft overflow-hidden hover:shadow-hover transition-all"
          >
            <div className="relative aspect-square w-full bg-[#FBF6EE]">
              <Image
                src={item.imageUrl}
                alt={item.caption || item.category}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#4A2511]/85 text-[#E8B520] backdrop-blur-sm shadow-sm">
                  {item.category}
                </span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isPending}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-colors"
                  title="Delete image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {item.caption && (
              <div className="p-4 border-t border-[#4A2511]/5">
                <p className="text-xs text-[#4A2511] font-medium truncate">
                  {item.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#4A2511]/20">
            <div className="flex items-center justify-between pb-4 border-b border-[#4A2511]/10">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#E8B520]" />
                <h3 className="font-heading font-bold text-xl text-[#4A2511]">
                  Add Photo to Gallery
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

            <form onSubmit={handleAddPhoto} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Image URL (Cloudinary / CDN) *
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as GalleryItemInput["category"])
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#4A2511]/20 focus:ring-2 focus:ring-[#E8B520]/40 focus:outline-none"
                >
                  <option value="Fashion Show">Fashion Show</option>
                  <option value="Students Works">Students Works</option>
                  <option value="Photo Shoot">Photo Shoot</option>
                  <option value="Convocation">Convocation</option>
                  <option value="Couture Gowns">Couture Gowns</option>
                  <option value="Bridal Blouses">Bridal Blouses</option>
                  <option value="Aari Embroidery">Aari Embroidery</option>
                  <option value="Terracotta">Terracotta</option>
                  <option value="Student Fests">Student Fests</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2511] mb-1">
                  Caption / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zardosi peacock sleeve design by student batch 2025"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
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
                  <span>{isPending ? "Adding..." : "Upload Photo"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

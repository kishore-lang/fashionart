import React from "react";
import { Metadata } from "next";
import { getAllGalleryAdmin } from "@/db/admin";
import { GalleryManager } from "@/components/admin/GalleryManager";

export const metadata: Metadata = {
  title: "Manage Gallery | Fashion Art Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await getAllGalleryAdmin();

  return <GalleryManager initialGallery={items} />;
}

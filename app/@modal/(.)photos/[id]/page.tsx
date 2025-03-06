import { ImageModal } from "@/components/image-modal";
import { getImageById } from "@/lib/db";
import { notFound } from "next/navigation";

interface PhotoModalPageProps {
  params: {
    id: string;
  };
}

export default async function PhotoModalPage({ params }: PhotoModalPageProps) {
  const image = await getImageById(params.id);

  if (!image) {
    notFound();
  }

  return <ImageModal image={image} />;
}

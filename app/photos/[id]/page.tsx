import ImageDetail from "@/components/image-detail";
import { getImageById } from "@/lib/db";
import { notFound } from "next/navigation";

interface PhotoPageProps {
  params: {
    id: string;
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const image = await getImageById(params.id);

  if (!image) {
    notFound();
  }

  return (
    <div className="container py-12">
      <ImageDetail image={image} />
    </div>
  );
}

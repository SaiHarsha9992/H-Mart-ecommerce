"use client";
import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface iAppProps {
  images: SanityImageSource[];
}

export default function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState<SanityImageSource>(images[0]);

  const handleSmallImageClick = (image: SanityImageSource) => {
    setBigImage(image);
  };

  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Thumbnail images */}
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()} // Generate image URL
              alt={`Product Image ${idx + 1}`} // Improve alt text for accessibility
              className="w-full h-full object-center object-cover cursor-pointer"
              width={200} // Control the thumbnail size
              height={200}
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      {/* Main large image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()} // URL for big image
          alt="Main Product Photo"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />
        {/* Sale Tag */}
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}

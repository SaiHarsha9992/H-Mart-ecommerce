import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
}

export interface fullProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  slug: string;
  image: SanityImageSource; // Replace 'any' with the appropriate type
  categoryName: string;
  price_id: string;
}

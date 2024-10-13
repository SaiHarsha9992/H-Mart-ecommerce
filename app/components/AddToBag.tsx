"use client";
import { Button } from "@/components/ui/button";
import { useShoppingCart, CartEntry } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: SanityImageSource;
  price_id: string;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product: CartEntry = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(), // assuming this is a valid image URL generator
    id: price_id, // `id` is required for `CartEntry`
  };

  return (
    <Button
      onClick={() => {
        addItem(product);
        handleCartClick();
      }}
    >
      Add to Cart
    </Button>
  );
}

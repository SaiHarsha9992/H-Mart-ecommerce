import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types"; // Import the type for image source

export const client = createClient({
  projectId: "5jwdnvws",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-03-25",
});

const builder = imageUrlBuilder(client);

// Define the type of the source parameter
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

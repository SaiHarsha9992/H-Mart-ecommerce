import AddToBag from "@/app/components/AddToBag";
import CheckOutNow from "@/app/components/CheckOutNow";
import ImageGallery from "@/app/components/imageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to get the URL for an image
function urlFor(source) {
  return builder.image(source);
}

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
        _id,
        name,
        price,
        description,
        "slug": slug.current,
        image,
        "categoryName": category->name,
        price_id
    }`;

  const data = await client.fetch(query);
  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  // Build image URLs using urlFor and pass them to the ImageGallery component
  const images = Array.isArray(data.image)
    ? data.image.map((img) => urlFor(img).url())
    : [urlFor(data.image).url()];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Ensure images are passed as an array of URLs */}
          <ImageGallery images={images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100">
                56 Rating
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  &#8377;{data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through ">
                  &#8377;{data.price + 30}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Incl. Vat plus Shipping
              </span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>
            <div className="flex gap-2.5">
              <AddToBag
                currency="INR"
                description={data.description}
                image={images[0]} // Use the first image URL
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
              <CheckOutNow
                currency="INR"
                description={data.description}
                image={images[0]} // Use the first image URL
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
            </div>
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

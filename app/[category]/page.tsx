"use client";
import Link from "next/link";
import { simplifiedProduct } from "../interface"; // Assuming you have an interface for the products
import { client } from "../lib/sanity"; // Sanity client for fetching data
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Function to fetch products based on the category
async function getData(category: string) {
  console.log("Fetching data for category:", category);

  const query = `*[_type == "product" && "${category}" in categories[]->name] {
    _id,
    "imageUrl": image[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryNames": categories[]->name
  }`;

  const data = await client.fetch(query);
  console.log("Fetched products:", data);
  return data;
}

// Enable dynamic rendering
export const dynamic = "force-dynamic";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [data, setData] = useState<simplifiedProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getData(params.category);
      setData(products);
    };

    fetchData();
  }, [params.category]); // Re-fetch data when category changes

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products for {params.category}
          </h2>

          <Link href="/All" className="text-primary flex items-center gap-x-1">
            See All{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        {/* Grid layout for displaying products */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt="Product Image"
                  className="w-full h-full object-center object-cover lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.categoryName} {/* Display all category names */}
                  </p>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  &#8377;{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

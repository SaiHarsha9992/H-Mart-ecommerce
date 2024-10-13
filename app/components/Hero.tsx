import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";
  const data = await client.fetch(query);
  return data;
}

export default async function Hero() {
  const data = await getData();
  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-800 sm:text-5xl md:mb-8 md:text-6xl">
            Discover Your Unique Style
          </h1>
          <p className="max-w-md leading-relaxed text-gray-600 xl:text-lg">
            Explore a curated selection of fashion-forward pieces designed for
            every occasion. Elevate your wardrobe with our premium collection.
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-200 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src={urlFor(data.image1).url()}
              alt="Stylish Clothing"
              width={500}
              height={500}
              priority
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 shadow-lg">
            <Image
              src={urlFor(data.image2).url()}
              alt="Trendy Apparel"
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-14 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
          <Link
            href="/Men"
            className="flex w-1/3 items-center justify-center rounded-l-lg border-r border-gray-300 bg-blue-500 text-white transition duration-200 hover:bg-blue-600"
          >
            For Him
          </Link>
          <Link
            href="/Women"
            className="flex w-1/3 items-center justify-center border-r border-gray-300 bg-green-500 text-white transition duration-200 hover:bg-green-600"
          >
            For Her
          </Link>
          <Link
            href="/Teen"
            className="flex w-1/3 items-center justify-center rounded-r-lg bg-red-500 text-white transition duration-200 hover:bg-red-600"
          >
            For Teens
          </Link>
        </div>
      </div>
    </section>
  );
}

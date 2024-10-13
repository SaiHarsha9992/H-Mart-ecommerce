"use client";
import { useState } from "react"; // Import useState for managing state
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Men",
    href: "/Men",
  },
  {
    name: "Women",
    href: "/Women",
  },
  {
    name: "Kids",
    href: "/Kids",
  },
  {
    name: "Teens",
    href: "/Teens",
  },
];

export default function Navbar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle the mobile menu
  };
  const { handleCartClick } = useShoppingCart();

  return (
    <header>
      <nav className="bg-white shadow-lg p-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-1">
              {/* Style H as orange and Mart as black with larger font sizes */}
              <span className="text-orange-600 text-6xl font-bold">H</span>
              <span className="text-black text-6xl font-semibold">Mart</span>
            </Link>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex space-x-8">
            {links.map((link, idx) => (
              <div key={idx}>
                <Link
                  href={link.href}
                  className={`${
                    pathName === link.href
                      ? "text-black font-semibold" // Active link
                      : "text-gray-600"
                  } text-lg hover:text-orange-500 transition duration-300 ease-in-out`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Notification and User Profile Section */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <Button
              type="button"
              className="relative p-6 rounded-full text-gray-600 hover:text-orange-500 transition duration-300"
              aria-label="View notifications"
              onClick={() => handleCartClick()} // Add click handler to open cart
            >
              <ShoppingBag size={30} color="black" />{" "}
              {/* Optional: adjust icon size */}
              <span className="hidden md:inline-block text-lg font-semibold text-black">
                Cart
              </span>
            </Button>

            {/* User Profile */}
            <div className="relative">
              {/* Dropdown Menu */}
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 hidden"
                aria-labelledby="user-menu-button"
                role="menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-orange-500 focus:outline-none transition duration-300"
              aria-label="Open main menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-4">
          {links.map((link, idx) => (
            <div key={idx}>
              <Link
                href={link.href}
                className={`${
                  pathName === link.href
                    ? "text-black font-semibold"
                    : "text-gray-600"
                } text-lg hover:text-orange-500 block transition duration-300 ease-in-out`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

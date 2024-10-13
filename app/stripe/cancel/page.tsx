import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelStripe() {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <XCircle className="text-red-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Cancelled:
          </h3>
          <p className="text-gray-600 my-2">
            Your payment was not successful. Please try again or contact support
            if you need help.
          </p>
          <p>We hope to serve you in the future.</p>

          <Button asChild className="mt-5">
            <Link href="/">GO BACK</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

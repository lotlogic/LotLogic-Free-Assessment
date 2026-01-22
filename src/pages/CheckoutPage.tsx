import Header from "@/components/layouts/Header";
import Heading from "@/components/ui/Heading";
import { classList } from "@/utils/tailwind";
import { useSessionStorage } from "@uidotdev/usehooks";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const CheckoutPage = () => {
  const [status, setStatus] = useState<"success" | "cancel" | "error">();

  const [searchParams] = useSearchParams();
  const [savedAddress] = useSessionStorage("address", "");

  useEffect(() => {
    const success = !!searchParams.get("success");
    const cancel = !!searchParams.get("cancel");

    if (success && !cancel) setStatus("success");
    else if (cancel && !success) setStatus("cancel");
    else setStatus("error");
  }, [searchParams]);

  return (
    <>
      <Header />
      <main>
        {!!status && (
          <section>
            <div className="relative max-w-260 mx-auto rounded-md shadow-lg">
              <div className="bg-white p-10 md:px-16 md:pb-16">
                <Heading tag="h1" size="h1">
                  Checkout
                </Heading>

                <hr className="my-6 border-gray-300" />

                {status === "success" && (
                  <div className="mt-15 mb-10">
                    <Heading tag="h2" size="h3">
                      Success
                    </Heading>
                    <Heading tag="p" size="h4">
                      Order placed! You will receive an email confirmation.
                    </Heading>
                  </div>
                )}

                {status === "cancel" && (
                  <div className="mt-15 mb-10">
                    <Heading tag="h2" size="h3">
                      Order Cancelled
                    </Heading>
                    <Heading tag="p" size="h4">
                      Please try again when you are ready.
                    </Heading>
                  </div>
                )}

                {status === "error" && (
                  <div className="mt-15 mb-10">
                    <Heading tag="h2" size="h3">
                      Order Error
                    </Heading>
                    <Heading tag="p" size="h4">
                      Please contact us to confirm your order status.
                    </Heading>
                  </div>
                )}

                {!!savedAddress && (
                  <Link
                    to={
                      "/assessment?address=" + encodeURIComponent(savedAddress)
                    }
                    className={classList([
                      "inline-flex items-center gap-1",
                      "rounded outline-primary outline-offset-3",
                      "underline underline-offset-2 decoration-transparent",
                      "transition-colors",
                      "focus-visible:outline-2",
                      "hover:text-primary hover:decoration-primary",
                    ])}
                  >
                    <ArrowLeft />
                    Back to free report
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default CheckoutPage;

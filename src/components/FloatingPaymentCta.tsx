import { classList } from "@/utils/tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import TextModal from "./ui/TextModal";

const paymentFormSchema = z.object({
  email: z
    .email({ pattern: z.regexes.rfc5322Email, message: "Invalid email format" })
    .trim(),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

type Props = {
  email?: string;
  address?: string;
  showButton?: boolean;
};

export const FloatingPaymentCta = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
  });

  const onSubmit: SubmitHandler<PaymentFormValues> = async (formData) => {
    try {
      if (!formData.email) throw new Error("Missing query parameter - email");
      if (!props.address) throw new Error("Missing query parameter - address");
      if (!location.origin) throw new Error("Missing query parameter - site");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            address: props.address,
            site: location.origin,
          }),
        },
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // redirect the user to the Stripe-hosted URL
      const { url } = await response.json();

      if (url) window.location.href = url;
      else throw new Error("Stripe error! No checkout URL returned");
    } catch (error: any) {
      console.log("Error: " + error.message);
    }
  };

  if (!props.address) return null;

  return (
    <div className="fixed top-5 right-2">
      <Button
        label="Purchase full report"
        className={classList([
          "px-6 py-4 shadow-lg",
          "translate-y-full opacity-0 transition-all duration-300",
          "data-show:translate-y-0 data-show:opacity-100",
        ])}
        onClick={openModal}
        data-show={props.showButton}
      />

      <TextModal open={isOpen} onClose={closeModal}>
        <Heading tag="h2" size="h2">
          Want an assessment that considers your current house?
        </Heading>

        <Heading tag="p" size="h4">
          Upgrade to the full PDF report and see what changes are possible when
          your existing dwelling is taken into account. You’ll get clearer,
          plain-English guidance on likely constraints, opportunities, and next
          steps for your property, delivered straight to your inbox.
        </Heading>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-91 mx-auto mt-6"
          noValidate
        >
          <div>
            <label>
              <span className="sr-only">Enter your email address</span>
              <span className="relative">
                <Mail className="absolute top-1/2 left-3 size-6 -translate-y-1/2 text-gray-300" />
                <input
                  type="email"
                  defaultValue={props.email}
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="Enter your email address"
                  className={classList(
                    "w-full px-4 py-3 pl-12",
                    "bg-white placeholder-gray-500",
                    "border border-gray-300 rounded-md",
                    "focus-visible:border-transparent",
                  )}
                />
              </span>
            </label>
            {errors.email && (
              <p className="text-xs text-error pl-1 mt-1" role="alert">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <Button label="Purchase report" type="submit" />
        </form>
      </TextModal>
    </div>
  );
};

export default FloatingPaymentCta;

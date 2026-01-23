import { classList } from "@/utils/tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, FileText, Mail, Phone, Target, User } from "lucide-react";
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
  intention: z.enum(["Develop", "Joint venture", "Sell", "Exploring"], {
    message: "Please select from above",
  }),
  clientName: z.string().trim().min(2, "Please enter a name"),
  clientPhone: z
    .string()
    .trim()
    .regex(/^[0-9+().\-\s]{7,}$/i, "Please enter a valid phone number"),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

type Props = {
  email?: string;
  address?: string;
  reportId?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  suburb?: string;
  blockSizeM2?: string | number;
  zone?: string;
  showButton?: boolean;
  className?: string;
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
            site: location.origin,

            intention: formData.intention,

            // Backwards-compatible alias
            email: formData.email,

            reportId: props.reportId,
            clientName: formData.clientName ?? props.clientName,
            clientEmail: props.clientEmail ?? formData.email,
            clientPhone: formData.clientPhone ?? props.clientPhone,
            address: props.address,
            suburb: props.suburb,
            blockSizeM2: props.blockSizeM2,
            zone: props.zone,
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
    <div className={props.className}>
      <Button
        label="Purchase full report"
        leftIcon={<FileText className="size-5" />}
        className={classList([
          "px-6 py-4 shadow-lg w-full justify-center",
          "translate-y-4 opacity-0 transition-all duration-300 pointer-events-none",
          "data-show:translate-y-0 data-show:opacity-100 data-show:pointer-events-auto",
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
              <span className="sr-only">What is your primary intention?</span>
              <span className="relative">
                <Target className="absolute top-1/2 left-3 size-6 -translate-y-1/2 text-gray-300 pointer-events-none" />
                <ChevronDown className="absolute top-1/2 right-4 size-5 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <select
                  defaultValue=""
                  {...register("intention")}
                  aria-invalid={errors.intention ? "true" : "false"}
                  className={classList(
                    "w-full px-4 py-3 pl-12 pr-10 appearance-none",
                    "bg-white text-gray-700",
                    "border border-gray-300 rounded-md",
                    "focus-visible:border-transparent",
                    "invalid:text-gray-500",
                  )}
                >
                  <option value="" disabled>
                    What&apos;s your primary intention?
                  </option>
                  <option value="Develop">Develop</option>
                  <option value="Joint venture">Joint venture</option>
                  <option value="Sell">Sell</option>
                  <option value="Exploring">Exploring</option>
                </select>
              </span>
            </label>
            {errors.intention && (
              <p className="text-xs text-error pl-1 mt-1" role="alert">
                {errors.intention.message as string}
              </p>
            )}
          </div>

          <div>
            <label>
              <span className="sr-only">Your name</span>
              <span className="relative">
                <User className="absolute top-1/2 left-3 size-6 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  defaultValue={props.clientName}
                  {...register("clientName")}
                  aria-invalid={errors.clientName ? "true" : "false"}
                  placeholder="Your name"
                  className={classList(
                    "w-full px-4 py-3 pl-12",
                    "bg-white placeholder-gray-500",
                    "border border-gray-300 rounded-md",
                    "focus-visible:border-transparent",
                  )}
                  autoComplete="name"
                />
              </span>
            </label>
            {errors.clientName && (
              <p className="text-xs text-error pl-1 mt-1" role="alert">
                {errors.clientName.message as string}
              </p>
            )}
          </div>

          <div>
            <label>
              <span className="sr-only">Your phone number</span>
              <span className="relative">
                <Phone className="absolute top-1/2 left-3 size-6 -translate-y-1/2 text-gray-300" />
                <input
                  type="tel"
                  defaultValue={props.clientPhone}
                  {...register("clientPhone")}
                  aria-invalid={errors.clientPhone ? "true" : "false"}
                  placeholder="Your phone number"
                  className={classList(
                    "w-full px-4 py-3 pl-12",
                    "bg-white placeholder-gray-500",
                    "border border-gray-300 rounded-md",
                    "focus-visible:border-transparent",
                  )}
                  autoComplete="tel"
                />
              </span>
            </label>
            {errors.clientPhone && (
              <p className="text-xs text-error pl-1 mt-1" role="alert">
                {errors.clientPhone.message as string}
              </p>
            )}
          </div>

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

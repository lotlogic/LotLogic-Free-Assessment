import Button from "@/components//ui/Button";
import Heading from "@/components//ui/Heading";
import TextModal from "@/components//ui/TextModal";
import { trackEvent } from "@/utils/analytics";
import { classList } from "@/utils/tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  email: z
    .email({ pattern: z.regexes.rfc5322Email, message: "Invalid email format" })
    .trim(),
  address: z.string().trim().min(2, "Please enter an address"),
  clientName: z.string().trim().min(2, "Please enter a name"),
  clientPhone: z
    .string()
    .trim()
    .regex(/^[0-9+().\-\s]{7,}$/i, "Please enter a valid phone number"),
  company: z.string(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

type Props = {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  email?: string;
  address?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
};

export const ContactModal = (props: Props) => {
  const closeModal = () => props.setIsOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (formData) => {
    const userData = {
      address: props.address,
      name: formData.clientName ?? props.clientName,
      email: props.clientEmail ?? formData.email,
      phone: formData.clientPhone ?? props.clientPhone,
    };

    try {
      if (!formData.email) throw new Error("Missing query parameter - email");
      if (!props.address) throw new Error("Missing query parameter - address");
      if (!location.origin) throw new Error("Missing query parameter - site");

      trackEvent("feasibility_form_submit", {
        ...userData,
        message: "",
        timestamp: new Date().toISOString(),
      });

      // send email
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/enquiry/get-in-touch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userData, company: formData.company }),
        },
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error: any) {
      trackEvent("feasibility_form_error", {
        ...userData,
        message: error?.message,
        timestamp: new Date().toISOString(),
      });
      console.log("Error: " + error.message);
    }
  };

  if (!props.address) return null;

  return (
    <TextModal open={props.isOpen} onClose={closeModal}>
      <Heading tag="h2" size="h2" className="text-center">
        Contact us
      </Heading>

      <p className="text-center text-lg">{props.address}</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-91 mx-auto mt-6"
        noValidate
      >
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
        <input type="hidden" name="company" />
        <Button label="Get in touch" type="submit" />
      </form>
    </TextModal>
  );
};

export default ContactModal;

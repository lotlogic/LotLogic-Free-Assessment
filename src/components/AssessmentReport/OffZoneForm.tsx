import Button from "@/components//ui/Button";
import Heading from "@/components//ui/Heading";
import TextModal from "@/components//ui/TextModal";
import { classList } from "@/utils/tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Mail, Phone, User } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const offZoneFormSchema = z.object({
  email: z
    .email({
      pattern: z.regexes.rfc5322Email,
      message: "Invalid email format",
    })
    .trim(),
  clientName: z.string().trim().min(2, "Please enter a name"),
  clientPhone: z
    .string()
    .trim()
    .regex(/^[0-9+().\-\s]{7,}$/i, "Please enter a valid phone number"),
  address: z.string().trim(),
  terms: z.literal(true, {
    error: "You must agree to proceed",
  }),
});

export type OffZoneFormValues = z.infer<typeof offZoneFormSchema>;

type Props = {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  address: string;
  onSubmit: (data: OffZoneFormValues) => void;
};

const OffZoneForm = (props: Props) => {
  const closeModal = () => props.setIsOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OffZoneFormValues>({
    resolver: zodResolver(offZoneFormSchema),
  });

  const onSubmit: SubmitHandler<OffZoneFormValues> = async (formData) => {
    props.onSubmit(formData);
  };

  return (
    <TextModal open={props.isOpen} onClose={closeModal}>
      <div className="text-center">
        <Heading tag="h2" size="h2">
          Your property is outside the free report zones - but you can still get
          your free assessment.
        </Heading>

        <p className="pt-2 text-balance">
          The free report covers RZ1 and RZ2 properties, where the missing
          middle reforms have the most direct impact. Your property is in a
          higher-density zone - RZ3, RZ4, or RZ5 - where different rules apply
          so we assess these individually.
        </p>

        <p className="pt-2 text-balance">
          Leave your name and email and we'll be in touch to get started.
        </p>

        <Heading tag="p" size="h4">
          {props.address}
        </Heading>
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
                  {...register("email")}
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
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("terms")}
                aria-invalid={errors.terms ? "true" : "false"}
                className={classList(
                  "peer",
                  "relative",
                  "appearance-none",
                  "shrink-0 size-4.5 mt-0.5",
                  "border border-gray-300 rounded-sm",
                  "focus-visible:border-transparent",
                )}
                required
              />
              <Check
                className={classList([
                  "absolute size-4 p-px mt-0.75 ml-px",
                  "hidden outline-none",
                  "peer-checked:block",
                ])}
              />
              <span className="text-sm text-left">
                I agree to BlockPlanner's{" "}
                <a href="/privacy" className="font-semibold" target="_blank">
                  Privacy Policy
                </a>{" "}
                and to receive occasional updates (you can unsubscribe anytime)
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-error pl-1 mt-1" role="alert">
                {errors.terms.message}
              </p>
            )}
          </div>
          <Button className="mt-4" label="Send my details" type="submit" />
        </form>
      </div>
    </TextModal>
  );
};

export default OffZoneForm;

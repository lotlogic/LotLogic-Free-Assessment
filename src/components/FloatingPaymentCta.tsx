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
  email: z.email({ message: "Invalid email format" }),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

type Props = {
  showButton?: boolean;
  email?: string;
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
    console.log("Paid assessment form submit: ", formData);
  };

  return (
    <div className="fixed bottom-3 right-2">
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
          {/* We can look at the real footprint and shape of your block.  */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, natus ab?
          Vero, sit. Necessitatibus doloremque accusantium modi aut dignissimos,
          est eius magni illum corrupti suscipit ducimus. Non exercitationem
          dignissimos maiores.
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

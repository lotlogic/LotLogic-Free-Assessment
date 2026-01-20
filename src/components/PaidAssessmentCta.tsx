import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import TextModal from "./ui/TextModal";

export const PaidAssessmentCta = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForm = () => {
    console.log("Handle paid assessment fom submit");
  };

  return (
    <div className="fixed bottom-3 right-2">
      <Button
        label="Purchase full report"
        className="px-6 py-4 shadow-lg"
        onClick={openModal}
      />

      <TextModal open={modalIsOpen} onClose={closeModal}>
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
          onSubmit={handleSubmit(handleForm)}
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
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="Enter your email address"
                  className={cn(
                    "w-full px-4 py-3 pl-12",
                    "bg-white placeholder-gray-500",
                    "border border-gray-300 rounded-md",
                    "focus-visible:border-transparent"
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
          <Button label="Purchase report" onClick={handleForm} />
        </form>
      </TextModal>
    </div>
  );
};

export default PaidAssessmentCta;

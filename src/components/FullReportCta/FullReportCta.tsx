import { trackCtaClick } from "@/utils/analytics";
import { classList } from "@/utils/tailwind";
import { FileText } from "lucide-react";
import { useMemo, useState } from "react";
import AnimatedLogo from "../ui/AnimatedLogo";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import { PaymentModal, type CheckoutData } from "./PaymentModal";

type Props = {
  data?: CheckoutData;
  isLoading?: boolean;
  isGated?: boolean;
  error?: string;
  location: "mobile" | "desktop";
};

export const FullReportCta = ({
  data,
  isLoading,
  isGated,
  error,
  location,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const isDisabled = useMemo(() => {
    return !!error || isLoading || isGated;
  }, [error, isLoading, isGated]);

  const ctaLocation =
    location === "mobile" ? "report_sticky" : "report_sidebar";

  const ctaClasses =
    location === "mobile"
      ? classList([
          "lg:hidden",
          "fixed bottom-0 left-0 right-0 z-50",
          "border-t border-gray-200",
          "shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-500",
          { "translate-y-full": isGated },
        ])
      : classList(["hidden lg:block w-80 sticky top-8 pt-20"]);

  const bodyClasses =
    location === "mobile"
      ? "bg-white p-4 "
      : "bg-white border border-gray-200 rounded-xl p-6 shadow-sm";

  const openModal = () => {
    if (!isDisabled) {
      trackCtaClick("purchase_full_report", {
        address: data?.address,
        zone: data?.zone,
        block_size: data?.blockSizeM2,
        location: ctaLocation,
      });
      setIsOpen(true);
    }
  };

  return (
    <div className={ctaClasses}>
      <div className={classList([bodyClasses, "text-center"])}>
        <AnimatedLogo className="mx-auto" />
        <Heading tag="h3" size="h4" className="mb-3">
          Unlock your block's full potential
        </Heading>
        <p className="text-gray-600 text-sm mb-6">
          Get a detailed PDF report with constraints, opportunities, and
          plain-English guidance for this block.
        </p>

        <Button
          label="Purchase full report"
          leftIcon={<FileText className="size-5" />}
          className={classList(["w-full px-6 py-4 shadow-lg"])}
          onClick={openModal}
          disabled={isDisabled}
        />
        <PaymentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ctaLocation={ctaLocation}
          //
          email={data?.email}
          address={data?.address}
          reportId={data?.reportId}
          suburb={data?.suburb}
          blockSizeM2={data?.blockSizeM2}
          zone={data?.zone}
        />
      </div>
    </div>
  );
};

export default FullReportCta;

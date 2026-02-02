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
        <Heading tag="h3" size="h4" className="-mt-4 mb-0">
          <span>Is there something here worth exploring?</span>
        </Heading>

          <p className="">
            The free results show what the rules allow. The full report looks at
            what's actually on your site &mdash; your home, trees, setbacks,
            access &mdash; so you can see whether it's worth taking the next
            step.
          </p>

          <p className="">
            A practical next step, not a planning assessment.Prepared by our
            team. Delivered within 48 hours.
          </p>

          <p>
            <strong className="text-base">$299</strong>
          </p>
        <Button
          label="Request your report"
          leftIcon={<FileText className="size-5" />}
          className={classList(["w-full px-6 py-4 shadow-lg"])}
          onClick={openModal}
          disabled={isDisabled}
        />

        <div className="text-xs">
          Based on publicly available spatial data at time of preparation.
        </div>
          <p className="mt-4">
            Want to go straight to a full feasibility assessment with a town
            planner?
            <br />
            <a href="mailto: ">Get in touch</a> &mdash; we'll reach out to
            discuss your options.
          </p>
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

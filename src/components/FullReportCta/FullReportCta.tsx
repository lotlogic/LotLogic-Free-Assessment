import Logomark from "@/images/BlockPlanner-Logomark.svg?react";
import { trackCtaClick } from "@/utils/analytics";
import { classList } from "@/utils/tailwind";
import { ArrowUp, FileText } from "lucide-react";
import { useMemo, useState } from "react";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDisabled = useMemo(() => {
    return !!error || isLoading || isGated;
  }, [error, isLoading, isGated]);

  const ctaLocation =
    location === "mobile" ? "report_sticky" : "report_sidebar";

  const ctaClasses =
    location === "mobile"
      ? classList([
          "bg-white",
          "lg:hidden",
          "fixed bottom-0 left-0 right-0 z-50",
          "border-t border-gray-200",
          "shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-500",
          { "translate-y-full": isGated },
        ])
      : classList(["hidden lg:block w-80 sticky top-8 pt-20"]);

  const bodyClasses =
    location === "mobile"
      ? "flex flex-col gap-4 px-4 pb-8 mx-auto max-w-[80ch]"
      : "border border-gray-200 rounded-lg p-5 shadow-sm flex flex-col gap-4";

  const openModal = () => {
    if (!isDisabled) {
      trackCtaClick("purchase_full_report", {
        address: data?.address,
        zone: data?.zone,
        block_size: data?.blockSizeM2,
        location: ctaLocation,
      });
      setModalOpen(true);
    }
  };

  return (
    <div className={ctaClasses}>
      <div
        className={classList([
          // "relative",
          "group",
          bodyClasses,
          "bg-white",
          "text-center",
          "text-sm",
          "text-gray-600",
          "rte",
        ])}
        data-state={drawerOpen ? "open" : "closed"}
      >
        <Button
          variant="outline"
          label="toggle drawer"
          leftIcon={<ArrowUp />}
          iconOnly
          className={classList([
            "absolute top-4 right-4 border-none lg:hidden",
            "group-data-[state=open]:transform-[scaleY(-1)]",
            "transition-all",
            "duration-500",
          ])}
          onClick={() => setDrawerOpen(!drawerOpen)}
        />

        <Logomark width={100} className="mx-auto" />

        <Heading tag="h3" size="h4" className="-mt-4 mb-0">
          <span>Is there something here worth exploring?</span>
        </Heading>

        <div
          className={classList([
            "flex flex-col gap-4",
            "max-lg:max-h-54",
            "max-sm:max-h-40",
            "opacity-100",
            "overflow-hidden",
            "max-lg:transition-all",
            "duration-500",
            "max-lg:group-data-[state=closed]:max-h-0",
            "max-lg:group-data-[state=closed]:opacity-0",
          ])}
        >
          <p className="">
            The free results show what the rules allow. The full report looks at
            what's actually on your site &mdash; your home, trees, setbacks,
            access &mdash; so you can see whether it's worth taking the next
            step.
          </p>

          <p className="">
            A practical next step, not a planning assessment. Prepared by our
            team. Delivered within 48 hours.
          </p>

          <p>
            <strong className="text-base">$299</strong>
          </p>
        </div>

        <Button
          label="Request your report"
          leftIcon={<FileText className="size-5" />}
          className={classList([
            "w-full px-6 py-4 shadow-lg animate-attention",
          ])}
          onClick={openModal}
          disabled={isDisabled}
        />

        <div className="text-xs">
          Based on publicly available spatial data at time of preparation.
        </div>

        <div
          className={classList([
            "max-lg:max-h-20",
            "max-sm:max-h-10",
            "opacity-100",
            "overflow-hidden",
            "max-lg:transition-all",
            "duration-500",
            "max-lg:group-data-[state=closed]:max-h-0",
            "max-lg:group-data-[state=closed]:opacity-0",
          ])}
        >
          <p className="mt-4">
            Want to go straight to a full feasibility assessment with a town
            planner?
            <br />
            <a href="mailto: ">Get in touch</a> &mdash; we'll reach out to
            discuss your options.
          </p>
        </div>

        <PaymentModal
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
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

import InfoGraphic from "@/images/blueprint.svg?react";
// import InfoGraphic from "@/images/house.svg?react";
import { trackCtaClick } from "@/utils/analytics";
import { classList } from "@/utils/tailwind";
import { ArrowUp, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import ContactModal from "./ContactModal";
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

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
          "animate-drawer",
        ])
      : classList(["hidden lg:block w-80 sticky top-8 pt-20 animate-aside"]);

  const bodyClasses =
    location === "mobile"
      ? "flex flex-col gap-4 px-4 py-8 mx-auto max-w-[80ch]"
      : "border border-gray-200 rounded-lg px-5 py-10 shadow-sm flex flex-col gap-4";

  const openPaymentModal = () => {
    if (!isDisabled) {
      trackCtaClick("purchase_full_report", {
        address: data?.address,
        zone: data?.zone,
        block_size: data?.blockSizeM2,
        location: ctaLocation,
      });
      setPayModalOpen(true);
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

        <InfoGraphic width={70} className="mx-auto" fill="#494f4a" />

        <Heading tag="h3" size="h4" className="mt-0! mb-0">
          <span>
            Take the next step - a detailed report that considers what's already
            on your block.
          </span>
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
            what's actually on your property &mdash; your home, trees,
            easements, setbacks, access &mdash; so you get a clearer picture of
            what's realistic.
          </p>

          <hr className="my-4 border-gray-300" />

          <div className="mb-4">
            <p className="text-base font-normal mb-2">
              Delivered within 48 hours
            </p>
            <p className="font-bold text-2xl">$299</p>
          </div>
        </div>

        <Button
          label="Request your report"
          leftIcon={<FileText className="size-5" />}
          className={classList([
            "w-full px-6 py-4 shadow-lg animate-attention",
          ])}
          onClick={openPaymentModal}
          disabled={isDisabled}
        />

        <div className="text-xs">
          Based on current satellite imagery and publicly available spatial
          data. Site conditions may have changed.
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
            Already know it's worth pursuing? Skip ahead - talk to us directly
            about a professional feasibility assessment covering your planning
            options, design and whether it's financially viable.
            <br />
            <button
              className="font-medium text-bp-blueGum! underline decoration-transparent! underline-offset-2 hover:decoration-bp-blueGum! transition-colors duration-200"
              onClick={() => setContactModalOpen(true)}
            >
              Get in touch
            </button>
          </p>
        </div>

        <PaymentModal
          isOpen={payModalOpen}
          setIsOpen={setPayModalOpen}
          ctaLocation={ctaLocation}
          // data
          email={data?.email}
          address={data?.address}
          reportId={data?.reportId}
          suburb={data?.suburb}
          blockSizeM2={data?.blockSizeM2}
          zone={data?.zone}
        />

        <ContactModal
          isOpen={contactModalOpen}
          setIsOpen={setContactModalOpen}
          email={data?.email}
          address={data?.address}
        />
      </div>
    </div>
  );
};

export default FullReportCta;

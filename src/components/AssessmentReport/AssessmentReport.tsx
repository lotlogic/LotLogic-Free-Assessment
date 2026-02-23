import type { GeoApi } from "@/@types/api";
import Heading from "@/components/ui/Heading";
import Logo from "@/images/BlockPlanner-Inline.svg?react";
import {
  identifyUser,
  trackCtaClick,
  trackEvent,
  trackLookupPerformed,
} from "@/utils/analytics";
import { classList } from "@/utils/tailwind";
import { useLocalStorage, useSessionStorage } from "@uidotdev/usehooks";
import { motion as m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FullReportCta } from "../FullReportCta/FullReportCta";
import ErrorMessage from "./ErrorMessage";
import GatedContentForm, {
  type GatedContentFormValues,
} from "./GatedContentForm";
import LoadingMessage from "./LoadingMessage";
import OffZoneForm, { type OffZoneFormValues } from "./OffZoneForm";
import ReportContent from "./ReportContent";

type ReportSaves = Record<string, { email: string; expiry: number }>;

export const FreeBlockAssessmentReport = () => {
  const [report, setReport] = useState<GeoApi>();
  const [isLoading, setIsLoading] = useState(true);
  const [isOffZone, setIsOffZone] = useState(false);
  const [showOffZone, setShowOffZone] = useState(false);
  const [isGated, setIsGated] = useState(false);
  const [error, setError] = useState<string>();
  const [email, setEmail] = useState<string>();

  const hasTrackedLookup = useRef(false);

  const [searchParams] = useSearchParams();
  const [savedAddress, setSavedAddress] = useSessionStorage("address", "");
  const [savedSearches, setSavedSearches] = useLocalStorage<ReportSaves>(
    "searches",
    {},
  );

  /****************************************************
    fetch API data
  ****************************************************/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const address = searchParams.get("address");
        if (!address) throw new Error("Missing query parameter - address");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/geo/act-zone?address=${address}`,
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        setReport(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  /****************************************************
    tracking for successful lookup
  ****************************************************/
  useEffect(() => {
    if (!report || hasTrackedLookup.current) return;
    trackLookupPerformed(report, { address: report.formattedAddress });
    hasTrackedLookup.current = true;
  }, [report]);

  /****************************************************
    show gated content if it is a saved search
  ****************************************************/
  useEffect(() => {
    if (!report?.formattedAddress) return;

    // save current address for checkout (and key for gated content)
    setSavedAddress(report.formattedAddress);

    // clear expired saves
    const time = new Date().getTime();
    let newSaves = { ...savedSearches };
    Object.entries(savedSearches).forEach(([key, value]) => {
      if (value.expiry < time) delete newSaves[key];
    });

    // persist if we removed anything
    if (Object.keys(newSaves).length !== Object.keys(savedSearches).length)
      setSavedSearches(newSaves);

    // check for current save (using de-expired saves)
    const currentSave = newSaves[report.formattedAddress];
    if (currentSave) setEmail(currentSave.email);

    // check property zoning
    if (!["RZ1", "RZ2"].includes(report.zone.zoneCode || "")) {
      setIsOffZone(true);
      setShowOffZone(!currentSave);
    }

    // check gated content
    setIsGated(!currentSave);
  }, [report]);

  /****************************************************
    checkout data for payload
  ****************************************************/
  const checkoutData = {
    email,
    address: report?.formattedAddress || savedAddress,
    reportId:
      report?.block?.blockKey ||
      (report?.block?.objectId != null
        ? String(report.block.objectId)
        : undefined),
    suburb: report?.block?.properties?.DIVISION_NAME || undefined,
    zone: report?.lotCheckRules?.zoneCode || report?.zone?.zoneCode || "",
    blockSizeM2: report?.lotCheckRules?.blockAreaSqm,
  };

  /****************************************************
    handle forms
  ****************************************************/
  const handleGatedContent = (formData: GatedContentFormValues) => {
    const addressKey = report?.formattedAddress || savedAddress;
    if (addressKey) {
      identifyUser(formData.email, {
        address: addressKey,
        zone: report?.lotCheckRules?.zoneCode ?? report?.zone?.zoneCode ?? null,
        block_size: report?.lotCheckRules?.blockAreaSqm ?? null,
        parcel_id:
          report?.block?.blockKey ??
          (report?.block?.objectId != null
            ? String(report.block.objectId)
            : null),
      });

      trackCtaClick("view_report", { address: addressKey });
      trackEvent("gated_email_submit", {
        address: addressKey,
        email: formData.email,
        timestamp: new Date().toISOString(),
      });

      // save the search to localstorage
      let newSaves = { ...savedSearches };
      newSaves[addressKey] = {
        email: formData.email,
        expiry: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
      };
      setSavedSearches(newSaves);

      // save email for payment form
      setEmail(formData.email);

      // keep session address in sync (used for checkout return link)
      setSavedAddress(addressKey);

      // show content
      setIsGated(false);
    }
  };

  const handleOffZone = (formData: OffZoneFormValues) => {
    const addressKey = report?.formattedAddress || savedAddress;
    if (addressKey) {
      // identifyUser(formData.email, {
      //   address: addressKey,
      //   zone: report?.lotCheckRules?.zoneCode ?? report?.zone?.zoneCode ?? null,
      //   block_size: report?.lotCheckRules?.blockAreaSqm ?? null,
      //   parcel_id:
      //     report?.block?.blockKey ??
      //     (report?.block?.objectId != null
      //       ? String(report.block.objectId)
      //       : null),
      // });

      //   trackCtaClick("view_report", { address: addressKey });
      //   trackEvent("gated_email_submit", {
      //     address: addressKey,
      //     email: formData.email,
      //     timestamp: new Date().toISOString(),
      //   });

      // save the search to localstorage
      let newSaves = { ...savedSearches };
      newSaves[addressKey] = {
        email: formData.email,
        expiry: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
      };
      setSavedSearches(newSaves);
      setSavedAddress(addressKey);
      setShowOffZone(false);
    }
  };

  return (
    <>
      <OffZoneForm
        isOpen={showOffZone}
        setIsOpen={setShowOffZone}
        address={savedAddress}
        onSubmit={handleOffZone}
      />

      {!isOffZone && isGated && (
        <GatedContentForm onSubmit={handleGatedContent} />
      )}

      <section
        className={classList([
          "mt-12 container mx-auto px-4 pb-60 lg:pb-12",
          { "blur-xs": showOffZone || isGated },
        ])}
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex-1 w-full lg:max-w-260">
            <m.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
            >
              <Heading tag="h1" size="h1">
                Your block assessment
              </Heading>
            </m.div>
            <m.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative mt-10"
            >
              <div className="bg-white p-10 md:px-16 md:pb-16 shadow-lg aspect-[1/1.414]">
                <Logo
                  width={200}
                  className="w-40 lg:w-50 ml-auto -mr-5 -mt-6 lg:-mr-10"
                />
                {isLoading ? (
                  <LoadingMessage />
                ) : error ? (
                  <ErrorMessage error={error} />
                ) : (
                  <ReportContent report={report} savedAddress={savedAddress} />
                )}
              </div>
            </m.div>

            <section className="text-gray-400 text-center mt-8">
              This free tool provides general information only, not professional
              advice. Covers RZ1 (Suburban) and RZ2 (Suburban Core) zones.
            </section>
          </div>

          <FullReportCta
            data={{
              ...checkoutData,
            }}
            isDisabled={isLoading || isGated || isOffZone || !!error}
            location="desktop"
          />
        </div>
      </section>

      <FullReportCta
        data={{
          ...checkoutData,
        }}
        isDisabled={isLoading || isGated || isOffZone || !!error}
        location="mobile"
      />
    </>
  );
};

export default FreeBlockAssessmentReport;

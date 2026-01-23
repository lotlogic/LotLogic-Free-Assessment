import type { GeoApi } from "@/@types/api";
import { classList } from "@/utils/tailwind";
import { toTitleCase } from "@/utils/text";
import { useLocalStorage, useSessionStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FloatingPaymentCta from "./FloatingPaymentCta";
import GatedContentForm, {
  type GatedContentFormValues,
} from "./GatedContentForm";
import Heading from "./ui/Heading";

type ReportSaves = Record<string, { email: string; expiry: number }>;

export const FreeBlockAssessmentReport = () => {
  const [report, setReport] = useState<GeoApi>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [isGated, setIsGated] = useState(true);
  const [email, setEmail] = useState<string>();

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
    show gated content if it is a saved search
  ****************************************************/
  useEffect(() => {
    if (!report?.formattedAddress) return;

    // save current address for checkout (and for gating key)
    setSavedAddress(report.formattedAddress);

    // clear expired saves
    const time = new Date().getTime();
    let newSaves = { ...savedSearches };
    Object.entries(savedSearches).forEach(([key, value]) => {
      if (value.expiry < time) delete newSaves[key];
    });

    // persist if we removed anything
    if (Object.keys(newSaves).length !== Object.keys(savedSearches).length) {
      setSavedSearches(newSaves);
    }

    // check for current save (using de-expired saves)
    const currentSave = newSaves[report.formattedAddress];
    if (currentSave) {
      setEmail(currentSave.email);
      setIsGated(false);
    } else {
      setIsGated(true);
    }
  }, [savedSearches, report]);

  /****************************************************
    page loading or page error
  ****************************************************/
  if (isLoading) return null;

  if (error)
    return (
      <section className="mt-12">
        <Heading tag="h1" size="h1">
          Your block assessment
        </Heading>
        <div className="relative max-w-260  mt-10 mx-auto rounded-md shadow-lg">
          <div className={classList(["bg-white p-10 md:px-16 md:pb-16"])}>
            <div className="grid place-items-center min-h-100 text-xl">
              <div className="grid place-items-center min-h-100 text-xl">
                <div className="text-center">
                  <p>
                    Unfortunately there was a error fetching this block
                    assessment.
                  </p>
                  <p className="mt-4 text-base">
                    Error:{" "}
                    {error
                      ?.replace("(did you import the GeoJSON datasets?)", "")
                      .trim()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  /****************************************************
    page content
  ****************************************************/
  // create zone text
  const zoneText = [
    report?.zone.zoneCode,
    toTitleCase(report?.zone.properties?.LAND_USE_POLICY_DESC),
  ]
    .filter(Boolean)
    .join(" - ");

  // combine rule matches by pathway
  const rules: Record<
    string,
    { confidence?: string | null; explanation: string }[]
  > = {};
  report?.lotCheckRules.matches.forEach((match) => {
    if (match.pathway && match.explanationResolved) {
      rules[match.pathway] = rules[match.pathway] || [];
      rules[match.pathway].push({
        confidence: match.confidence,
        explanation: match.explanationResolved,
      });
    }
  });
  const ruleMatches = Object.entries(rules);

  // commencement date
  const today = new Date();
  const commencementDate = import.meta.env.VITE_COMMENCEMENT_DATE
    ? new Date(import.meta.env.VITE_COMMENCEMENT_DATE)
    : undefined;

  // data used for checkout payload
  const checkoutAddress = report?.formattedAddress || savedAddress;
  const reportId =
    report?.block?.blockKey ||
    (report?.block?.objectId != null ? String(report.block.objectId) : undefined);
  const suburb = report?.block?.properties?.DIVISION_NAME || undefined;
  const zone = report?.lotCheckRules?.zoneCode || report?.zone?.zoneCode || "";
  const blockSizeM2 = report?.lotCheckRules?.blockAreaSqm;

  /****************************************************
    handle form
  ****************************************************/
  const handleGatedContent = (formData: GatedContentFormValues) => {
    // handle email queue
    // ...do stuff here

    // display gated content
    const addressKey = report?.formattedAddress || savedAddress;
    if (addressKey) {
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

  return (
    <>
      {isGated && <GatedContentForm onSubmit={handleGatedContent} />}

      <section
        className={classList([
          "mt-12 container mx-auto px-4 pb-32 lg:pb-12",
          { "blur-xs": isGated },
        ])}
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex-1 w-full lg:max-w-260">
            <Heading tag="h1" size="h1">
              Your block assessment
            </Heading>
            <div className="relative mt-10 rounded-md shadow-lg">
              <div className="bg-white p-10 md:px-16 md:pb-16">
                <Heading tag="h2" size="h2" className="">
                  {(report?.formattedAddress || savedAddress).replace(
                    ", Australia",
                    "",
                  )}
                </Heading>

                <div className="text-lg">
                  {!!zoneText && <p>Zone: {zoneText}</p>}
                  {!!report?.lotCheckRules.blockAreaSqm && (
                    <p>
                      Block size: {report?.lotCheckRules.blockAreaSqm} m&sup2;
                    </p>
                  )}
                </div>

                <hr className="my-6 border-gray-300" />

                <Heading tag="h3" size="h4" className="font-bold mb-4">
                  What the new rules allow on a block this size
                </Heading>
                {commencementDate && today < commencementDate && (
                  <p className="text-lg -mt-3 mb-5">
                    Based on draft rules. Final rules expected on{" "}
                    {commencementDate
                      .toLocaleDateString("en-AU", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(/\//g, " ")}
                  </p>
                )}

                {!isLoading && !error && (
                  <>
                    {!!ruleMatches.length && (
                      <ul className="block space-y-6 [&>li]:pl-6 [&_strong]:block [&_strong]:text-lg">
                        {ruleMatches.map((rule, i) => (
                          <li key={"rule_" + i} className="relative">
                            <div
                              className={classList([
                                "absolute top-2 left-0.5 size-3",
                                "bg-gray-300 rounded-full",
                                {
                                  "bg-success":
                                    rule[1][0].confidence === "High",
                                },
                                {
                                  "bg-warning":
                                    rule[1][0].confidence === "Medium",
                                },
                                {
                                  "bg-error": rule[1][0].confidence === "Low",
                                },
                              ])}
                            ></div>
                            <strong className="[&:first-letter]:capitalize [&+p]:mt-1">
                              {rule[0]}
                            </strong>
                            {rule[1].map((item, i) => (
                              <p key={"p_" + i} className="mt-2">
                                {item.explanation}
                              </p>
                            ))}
                          </li>
                        ))}
                      </ul>
                    )}

                    {!ruleMatches.length && (
                      <>
                        <div className="grid place-items-center min-h-100 text-xl">
                          <div className="text-center">
                            <p>
                              The Missing Middle changes do not materially apply
                              to this zone.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                <hr className="my-6 border-gray-300" />

                <div className="text-gray-400">
                  <ul className="block space-y-2 [&>li]:pl-6">
                    <li className="relative">
                      <div
                        className={classList([
                          "absolute top-1 left-0.5 size-3.5",
                          "flex items-center justify-center",
                          "text-xs text-white",
                          "bg-gray-400 rounded-full",
                        ])}
                      >
                        i
                      </div>
                      No major overlays checked in this version
                    </li>
                    <li>
                      Height, setbacks and detailed design rules not assessed
                      here
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <section className="text-gray-400 text-center mt-8">
              LotCheck is an informational tool based on ACT planning changes
              for RZ1/RZ2. This version assesses blank-site rules only.
            </section>
          </div>

          <div className="hidden lg:block w-80 shrink-0 sticky top-8 pt-20">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <Heading tag="h3" size="h4" className="mb-3 text-center">
                Unlock your block's full potential
              </Heading>
              <p className="text-gray-600 text-sm text-center mb-6">
                Get a detailed PDF report with constraints, opportunities, and
                plain-English guidance for this block.
              </p>
              <FloatingPaymentCta
                email={email}
                address={checkoutAddress}
                reportId={reportId}
                suburb={suburb}
                blockSizeM2={blockSizeM2}
                zone={zone}
                showButton={!isGated || undefined}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <div
        className={classList([
          "fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 lg:hidden transition-transform duration-500",
          { "translate-y-full": isGated },
        ])}
      >
        <Heading tag="h3" size="h4" className="mb-3 text-center">
          Unlock your block's full potential
        </Heading>
        <p className="text-gray-600 text-sm text-center mb-6">
          Get a detailed PDF report with constraints, opportunities, and
          plain-English guidance for this block.
        </p>
        <FloatingPaymentCta
          className="w-full"
          email={email}
          address={checkoutAddress}
          reportId={reportId}
          suburb={suburb}
          blockSizeM2={blockSizeM2}
          zone={zone}
          showButton={!isGated || undefined}
        />
      </div>
    </>
  );
};
export default FreeBlockAssessmentReport;

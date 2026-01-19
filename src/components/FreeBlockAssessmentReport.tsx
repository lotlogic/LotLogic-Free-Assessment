import type { GeoApi } from "@/@types/api";
import { cn } from "@/lib/utils";
import { toTitleCase } from "@/utils/text";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Heading from "./ui/Heading";

export const FreeBlockAssessmentReport = () => {
  const [searchParams] = useSearchParams();

  const [data, setData] = useState<GeoApi>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  // fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const address = searchParams.get("address");
        if (!address) throw new Error("Missing query parameter - address");

        const response = await fetch(
          import.meta.env.VITE_API_URL +
            "/geo/act-zone?address=" +
            searchParams.get("address")
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // create zone text
  const zoneText = [
    data?.zone.zoneCode,
    toTitleCase(data?.zone.properties?.LAND_USE_POLICY_DESC),
  ]
    .filter(Boolean)
    .join(" - ");

  // combine rule matches by pathway
  const rules: Record<
    string,
    { confidence?: string | null; explanation: string }[]
  > = {};
  data?.lotCheckRules.matches.forEach((match) => {
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

  return (
    <section className="mt-12">
      <div className="">
        <Heading tag="h1" size="h1">
          Your block assessment
        </Heading>
        <div className="max-w-260 bg-white p-10 md:px-16 mt-10 mx-auto rounded-md shadow-lg">
          <Heading tag="h2" size="h2" className="">
            {data?.formattedAddress.replace(", Australia", "")}
          </Heading>

          <div className="text-lg">
            {!!zoneText && <p>Zone: {zoneText}</p>}
            {!!data?.lotCheckRules.blockAreaSqm && (
              <p>Block size: {data?.lotCheckRules.blockAreaSqm} m&sup2;</p>
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

          {isLoading && (
            <div className="grid place-items-center min-h-100 text-xl">
              <p>Loading...</p>
            </div>
          )}

          {error && (
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
          )}

          {!isLoading && !error && (
            <>
              {!!ruleMatches.length && (
                <>
                  {/* Listing rules separately */}
                  {/* <ul className="block space-y-4 [&>li]:pl-6 [&_strong]:block [&_strong]:text-lg">
                    {data?.lotCheckRules.matches.map((rule, i) => (
                      <li key={"rule_" + i} className="relative">
                        <div
                          className={cn([
                            "absolute top-2 left-0.5 size-3",
                            "bg-gray-300 rounded-full",
                            { "bg-success": rule.confidence === "High" },
                            { "bg-warning": rule.confidence === "Medium" },
                            { "bg-error": rule.confidence === "Low" },
                          ])}
                        ></div>
                        <strong className="[&:first-letter]:capitalize">
                          {rule.pathway}
                        </strong>
                        <p className="mt-1">{rule.explanationResolved}</p>
                      </li>
                    ))}
                  </ul> */}

                  {/* <hr className="my-6 border-gray-300" /> */}

                  {/* Combining rules together */}
                  <ul className="block space-y-6 [&>li]:pl-6 [&_strong]:block [&_strong]:text-lg">
                    {ruleMatches.map((rule, i) => (
                      <li key={"rule_" + i} className="relative">
                        <div
                          className={cn([
                            "absolute top-2 left-0.5 size-3",
                            "bg-gray-300 rounded-full",
                            { "bg-success": rule[1][0].confidence === "High" },
                            {
                              "bg-warning": rule[1][0].confidence === "Medium",
                            },
                            { "bg-error": rule[1][0].confidence === "Low" },
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
                </>
              )}

              {!ruleMatches.length && (
                <>
                  <div className="grid place-items-center min-h-100 text-xl">
                    <div className="text-center">
                      <p>
                        The Missing Middle changes do not materially apply to
                        this zone.
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
                  className={cn([
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
                Height, setbacks and detailed design rules not assessed here
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeBlockAssessmentReport;

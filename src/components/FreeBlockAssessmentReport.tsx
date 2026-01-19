import type { GeoApi } from "@/@types/api";
import { cn } from "@/lib/utils";
import { toSentenceCase } from "@/utils/text";
import { useEffect, useState } from "react";
import Heading from "./ui/Heading";

export const FreeBlockAssessmentReport = () => {
  const [data, setData] = useState<GeoApi>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL +
            "/geo/act-zone?address=6%20keane%20place%20Canberra%20ACT"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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

  const zoneText = [
    data?.zone.zoneCode,
    toSentenceCase(data?.zone.properties?.LAND_USE_POLICY_DESC),
  ]
    .filter(Boolean)
    .join(" - ");

  const matches: Record<
    string,
    { confidence?: string | null; explanation: string }[]
  > = {};
  data?.lotCheckRules.matches.forEach((match) => {
    if (match.pathway && match.explanationResolved) {
      matches[match.pathway] = matches[match.pathway] || [];
      matches[match.pathway].push({
        confidence: match.confidence,
        explanation: match.explanationResolved,
      });
    }
  });
  const rules = Object.entries(matches);

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

          {isLoading && (
            <div className="text-lg">
              <p>Loading data...</p>
            </div>
          )}

          {error && (
            <div className="text-lg">
              <p>Error: {error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <>
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

              {/* Listing rules separately */}
              <ul className="block space-y-4 [&>li]:pl-6 [&_strong]:block [&_strong]:text-lg">
                {data?.lotCheckRules.matches.map((rule) => (
                  <li className="relative">
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
              </ul>

              <hr className="my-6 border-gray-300" />

              {/* Combining rules together */}
              <ul className="block space-y-6 [&>li]:pl-6 [&_strong]:block [&_strong]:text-lg">
                {rules.map((rule) => (
                  <li className="relative">
                    <div
                      className={cn([
                        "absolute top-2 left-0.5 size-3",
                        "bg-gray-300 rounded-full",
                        { "bg-success": rule[1][0].confidence === "High" },
                        { "bg-warning": rule[1][0].confidence === "Medium" },
                        { "bg-error": rule[1][0].confidence === "Low" },
                      ])}
                    ></div>
                    <strong className="[&:first-letter]:capitalize [&+p]:mt-1">
                      {rule[0]}
                    </strong>
                    {rule[1].map((item) => (
                      <p className="mt-2">{item.explanation}</p>
                    ))}
                  </li>
                ))}
              </ul>

              <hr className="my-6 border-gray-300" />

              {/* Dummy data */}
              <ul className="block space-y-4 [&>li]:pl-6 [&_strong]:block [&_strong]:text-lg">
                {results.map((result) => (
                  <li className="relative">
                    <div
                      className={cn([
                        "absolute top-2 left-0.5 size-3",
                        "bg-gray-300 rounded-full",
                        { "bg-success": result.status === "success" },
                        { "bg-warning": result.status === "warning" },
                        { "bg-error": result.status === "error" },
                      ])}
                    ></div>
                    <strong className="[&+p]:mt-1">{result.heading}</strong>
                    {result.content.map((text) => (
                      <p className="mt-2">{text}</p>
                    ))}
                  </li>
                ))}
              </ul>

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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FreeBlockAssessmentReport;

const results = [
  {
    heading: "Add a second home",
    content: ["Allowed. Minimum block size rules have been removed."],
    status: "success",
  },
  {
    heading: "Build a backyard flat (granny flat)",
    content: ["Allowed. Up to 90 m²."],
    status: "success",
  },
  {
    heading: "Subdivide the block",
    content: [
      "Unlikely. You'd need two lots of at least 350 m² each.",
      "This block is too small for a compliant split.",
    ],
    status: "warning",
  },
  {
    heading: "Build more than two homes",
    content: [
      "Allowed in principal. RZ1 permits townhouses and small low-rise flats.",
      "A block this size is generally too small rto fit more than two dwellings.",
    ],
    status: "warning",
  },
  {
    heading: "Sell dwellings separately (unit-title)",
    content: ["Not likely. Usually requires a block of 600 m² or more."],
    status: "error",
  },
];

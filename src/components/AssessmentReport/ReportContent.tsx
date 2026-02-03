import type { GeoApi } from "@/@types/api";
import { classList } from "@/utils/tailwind";
import { toTitleCase } from "@/utils/text";
import Heading from "../ui/Heading";

type Props = {
  savedAddress: string;
  report?: GeoApi;
};

export const ReportContent = ({ report, savedAddress }: Props) => {
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

  return (
    <>
      <Heading tag="h2" size="h2" className="">
        {(report?.formattedAddress || savedAddress).replace(", Australia", "")}
      </Heading>

      <div className="text-lg">
        {!!zoneText && <p>Zone: {zoneText}</p>}
        {!!report?.lotCheckRules.blockAreaSqm && (
          <p>Block size: {report?.lotCheckRules.blockAreaSqm} m&sup2;</p>
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

      {!!ruleMatches.length && (
        <ul className="block space-y-6 [&>li]:pl-6 [&_strong]:block [&_strong]:text-lg">
          {ruleMatches.map((rule, i) => (
            <li key={"rule_" + i} className="relative">
              <div
                className={classList([
                  "absolute top-2 left-0.5 size-3",
                  "bg-gray-300 rounded-full",
                  {
                    "bg-success": rule[1][0].confidence === "High",
                  },
                  {
                    "bg-warning": rule[1][0].confidence === "Medium",
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
                The Missing Middle changes do not materially apply to this zone.
              </p>
            </div>
          </div>
        </>
      )}

      <hr className="my-6 border-gray-300" />

      <div className="text-gray-400">
        <ul className="block space-y-2 [&>li]:pl-6">
          <li className="relative">
            <div
              className={classList([
                "absolute top-1.25 left-0.5 size-3.5",
                "flex items-center justify-center",
                "text-xs text-white",
                "bg-gray-400 rounded-full",
              ])}
            >
              i
            </div>
            This guide is based on block size and zoning only.
          </li>
          <li>
            It doesn't account for overlays, setbacks, trees, or what's already
            on your site. Our full report takes these into account.
          </li>
        </ul>
      </div>
    </>
  );
};

export default ReportContent;

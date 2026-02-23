import type { GeoApi } from "@/@types/api";
import Heading from "@/components//ui/Heading";
import { classList } from "@/utils/tailwind";
import { toTitleCase } from "@/utils/text";
import { CircleCheck } from "lucide-react";

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

  // report map
  const address = report?.formattedAddress || savedAddress;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <div className="flex flex-col h-full">
        <Heading tag="h2" size="h2" className="">
          {address.replace(", Australia", "")}
        </Heading>
        <div className="flex flex-wrap gap-x-7 text-lg">
          {!!zoneText && <p>Zone: {zoneText}</p>}
          {!!report?.lotCheckRules.blockAreaSqm && (
            <p>Block size: {report?.lotCheckRules.blockAreaSqm} m&sup2;</p>
          )}
        </div>
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?size=550x225&scale=2&zoom=17&maptype=satellite&markers=${encodeURIComponent(address)}&key=${apiKey}`}
          className="my-4"
        />
        <Heading tag="h3" size="h4" className="font-semibold mb-4">
          What the new rules allow on a block this size
        </Heading>
        {commencementDate && today < commencementDate && (
          <p className="text-base -mt-4 mb-5">
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

        <div className="grow">
          {!!ruleMatches.length && (
            <ul className="block space-y-3 text-sm">
              {ruleMatches.map((rule, i) => {
                const iconClass =
                  rule[1][0].confidence === "Low"
                    ? "text-error"
                    : rule[1][0].confidence === "Medium"
                      ? "text-warning"
                      : "text-success";
                const badgeClass =
                  rule[1][0].confidence === "Low"
                    ? "bg-red-50 text-error border-red-200"
                    : rule[1][0].confidence === "Medium"
                      ? "bg-amber-50 text-warning border-amber-200"
                      : "bg-green-50 text-success border-green-200";
                const badgeLabel =
                  rule[1][0].confidence === "Low"
                    ? "???"
                    : rule[1][0].confidence === "Medium"
                      ? "???"
                      : "Allowed";

                return (
                  <li
                    key={"rule_" + i}
                    className="relative rounded-lg border border-gray-200 bg-card p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex gap-3">
                      <div
                        className={`mt-0.5 text-300 rounded-full ${iconClass}`}
                      >
                        <CircleCheck width="20" height="20" className="" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <strong className="block text-base font-semibold [&:first-letter]:capitalize [&+p]:mt-1">
                            {rule[0]}
                          </strong>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badgeClass}`}
                          >
                            {badgeLabel}
                          </span>
                        </div>
                        {rule[1].map((item, i) => (
                          <p key={"p_" + i} className="mt-2">
                            {item.explanation}
                          </p>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {!ruleMatches.length && (
            <p className="text-xl text-center pt-25">
              The Missing Middle changes do not materially apply to this zone.
            </p>
          )}
        </div>

        <hr className="mt-8 mb-6 border-gray-300" />
        <ul className="block space-y-1 [&>li]:pl-6 text-sm text-gray-400">
          <li className="relative">
            <div
              className={classList([
                "absolute top-0.75 left-0.5 size-3.5",
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

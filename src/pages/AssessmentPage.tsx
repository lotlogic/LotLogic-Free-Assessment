import Header from "@/components/layouts/Header";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

export const AssessmentPage = () => {
  const handleForm = () => {
    console.log("Handle form");
  };

  return (
    <>
      <Header />
      <main>
        <section className="mt-12 md:mt-18">
          <div className="">
            <Heading tag="h1" size="h1">
              Your block assessment
            </Heading>
            <div className="bg-white p-10 mt-10 rounded-md shadow-lg">
              <Heading tag="h2" size="h2" className="">
                7 Sample Place, Kambah
              </Heading>
              <div className="text-lg">
                <p>Zone: RZ1 - Suburban</p>
                <p>Block size: 420 m&sup2;</p>
              </div>

              <hr className="my-6 border-gray-300" />

              <Heading tag="h3" size="h4" className="font-bold mb-4">
                What the new rules allow on a block this size
              </Heading>

              <ul className="block space-y-4 [&>li]:pl-5 [&_strong]:block [&_strong]:text-lg">
                {results.map((result) => (
                  <li className="relative">
                    <div className="absolute top-2 left-0.5 size-3 bg-gray-300 rounded-full"></div>
                    <strong>{result.heading}</strong>
                    {result.content.map((text) => (
                      <p>{text}</p>
                    ))}
                  </li>
                ))}
              </ul>

              <hr className="my-6 border-gray-300" />

              <div className="text-gray-400">
                <ul>
                  <li>No major overlays checked in this version</li>
                  <li>
                    Height, setbacks and detailed design rules not assessed here
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <div className="">
            <Heading tag="h2" size="h2">
              Want an assessment that considers your current house?
            </Heading>

            <Heading tag="p" size="h4">
              We can look at the real footprint and shape of your block.
            </Heading>

            <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg md:max-w-2xl mt-10 mx-auto">
              <div className="grow">
                <label>
                  <span className="sr-only">Enter your email address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className={cn(
                      "w-full px-4 py-3",
                      "bg-white placeholder-gray-500",
                      "border border-gray-300 rounded-md",
                      "outline-primary-hover outline-offset-2",
                      "focus-visible:outline-2 focus-visible:border-transparent"
                    )}
                  />
                </label>
              </div>
              <Button
                label="Send me the free one-page report"
                onClick={handleForm}
              />
            </div>

            <div className="text-gray-400 mt-20">
              LotCheck is an informational tool based on ACT planning changes
              for RZ1/RZ2. This version assesses blank-site rules only.
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AssessmentPage;

const results = [
  {
    heading: "Add a second home",
    content: ["Allowed. Minimum block size rules have been removed."],
  },
  {
    heading: "Build a backyard flat (granny flat)",
    content: ["Allowed. Up to 90 m²."],
  },
  {
    heading: "Subdivide the block",
    content: [
      "Unlikely. You'd need two lots of at least 350 m² each.",
      "This block is too small for a compliant split.",
    ],
  },
  {
    heading: "Build more than two homes",
    content: [
      "Allowed in principal. RZ1 permits townhouses and small low-rise flats.",
      "A block this size is generally too small rto fit more than two dwellings.",
    ],
  },
  {
    heading: "Sell dwellings separately (unit-title)",
    content: ["Not likely. Usually requires a block of 600 m² or more."],
  },
];

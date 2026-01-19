import FreeBlockAssessmentReport from "@/components/FreeBlockAssessmentReport";
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
        <FreeBlockAssessmentReport />

        <section className="mt-20 text-center">
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

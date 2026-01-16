import Header from "@/components/layouts/Header";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main className="group flex grow pt-15 bg-gray-100 text-gray-700">
        <section className="w-full mt-[5vh] md:mt-[10vh]">
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-24 text-center text-lg">
            <Heading tag="h1" size="h1">
              See what the new ACT planning rules allow on your block.
            </Heading>

            <Heading tag="p" size="h4" className="mt-6">
              Fast, plain-English results for RZ1 and RZ2 residential land.
            </Heading>

            <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg md:max-w-3xl mt-10 mx-auto">
              <div className="relative grow">
                <label className="block">
                  <span className="input__label sr-only">
                    Enter your ACT address
                  </span>
                  <span className="relative flex items-center">
                    <Search className="absolute top-1/2 left-3 size-6 -translate-y-1/2 text-gray-300" />
                    <input
                      type="search"
                      name="search"
                      className={cn(
                        "w-full px-4 py-3 pl-12",
                        "bg-white placeholder-gray-500",
                        "border border-gray-300 rounded-md",
                        "outline-primary-hover outline-offset-2",
                        "focus-visible:outline-2 focus-visible:border-transparent"
                      )}
                      placeholder="Enter your ACT address"
                    />
                  </span>
                </label>
              </div>
              <Button label="Check my block" />
            </div>

            <ul className="flex flex-wrap justify-center gap-x-10 gap-y-2 mt-10">
              <li className="flex items-start gap-2">
                <span className="block min-w-2 h-2 bg-gray-700 rounded-full mt-2.5" />
                Based on new Territory Plan rules
              </li>
              <li className="flex items-start gap-2">
                <span className="block min-w-2 h-2 bg-gray-700 rounded-full mt-2.5" />
                Free assessment
              </li>
            </ul>

            <hr className="mt-10 mb-20 border-gray-300" />

            <p className="text-base text-balance">
              LotCheck is an informational tool. Not professional advice. Based
              on ACT planning changes.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;

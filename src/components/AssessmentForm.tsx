import { trackCtaClick, trackLookupStarted } from "@/utils/analytics";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressInput from "./ui/AddressInput";
import Button from "./ui/Button";
import Heading from "./ui/Heading";

export const FreeBlockAssessment = () => {
  const [address, setAddress] = useState<string | null | undefined>();
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const handlePlaceSelect = (place: google.maps.places.Place | null) => {
    if (place) {
      const address = place.formattedAddress;
      setAddress(address);
      setDisabled(false);
    }
  };

  const handleInputChange = () => {
    if (address) setDisabled(true);
  };

  const onSearch = () => {
    if (disabled || !address) return;

    trackCtaClick("check_my_block", { address });
    trackLookupStarted(address);
    navigate("/assessment?address=" + encodeURIComponent(address));
  };

  return (
    <section className="mt-[5vh]! md:mt-[10vh]!">
      <div className="text-center text-lg">
        <div className="max-w-4xl mx-auto">
          <Heading tag="h1" size="h1">
            The rules have changed. Find out what that means for your block.
          </Heading>

          <Heading tag="p" size="h4" className="mt-6">
            Check what housing types the new ACT planning rules allow on your
            block.
          </Heading>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg md:max-w-2xl mt-10 md:mt-20 mx-auto">
            <div className="grow">
              <label>
                <span className="sr-only">Enter your ACT address</span>
                <AddressInput
                  name="search"
                  placeholder="88 Prospect Lane, Curtin"
                  handlePlaceSelect={handlePlaceSelect}
                  handleInputChange={handleInputChange}
                />
              </label>
            </div>
            <Button
              label="Check my block"
              disabled={disabled}
              onClick={onSearch}
            />
          </div>

          <p className="max-w-lg md:max-w-2xl mx-auto mt-10">
            Enter your residential address and see what the new planning rules
            mean for your property: free, instant, no sign-up.
          </p>

          <hr className="mt-10 mb-20 border-gray-300" />

          <p className="text-base text-balance">
            This free tool provides general information only, not professional
            advice. Results are based on publicly available data and may not
            reflect current site conditions. Read full disclaimer.{" "}
            <a
              href="/disclaimer"
              className="font-medium italic underline decoration-transparent underline-offset-2 hover:decoration-gray-700 transition-colors duration-200"
            >
              Read full disclaimer
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeBlockAssessment;

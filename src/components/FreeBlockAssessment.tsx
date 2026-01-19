import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressInput from "./ui/AddressInput";
import Button from "./ui/Button";
import Heading from "./ui/Heading";

export const FreeBlockAssessment = () => {
  const [address, setAddress] = useState<string | null | undefined>();

  const navigate = useNavigate();

  const onPlaceSelect = (place: google.maps.places.Place | null) => {
    if (place) {
      const address = place.formattedAddress;
      setAddress(address);
    }
  };

  const onSearch = () => {
    console.log("Handle search for: ", address);
    navigate("/assessment?address=" + address);
  };

  return (
    <section className="mt-[5vh]! md:mt-[10vh]!">
      <div className="text-center text-lg">
        <div className="max-w-4xl mx-auto">
          <Heading tag="h1" size="h1">
            See what the new ACT planning rules allow on your block.
          </Heading>

          <Heading tag="p" size="h4" className="mt-6">
            Fast, plain-English results for RZ1 and RZ2 residential land.
          </Heading>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg md:max-w-2xl mt-10 md:mt-20 mx-auto">
            <div className="grow">
              <label>
                <span className="sr-only">Enter your ACT address</span>
                <AddressInput
                  name="search"
                  placeholder="Enter your ACT address"
                  onPlaceSelect={onPlaceSelect}
                />
              </label>
            </div>
            <Button
              label="Check my block"
              disabled={!address}
              onClick={onSearch}
            />
          </div>

          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-2 mt-10">
            <li className="flex items-start gap-2">
              <span className="block min-w-1.5 h-1.5 bg-gray-700 rounded-full mt-2.5" />
              Based on new Territory Plan rules
            </li>
            <li className="flex items-start gap-2">
              <span className="block min-w-1.5 h-1.5 bg-gray-700 rounded-full mt-2.5" />
              Free assessment
            </li>
          </ul>

          <hr className="mt-10 mb-20 border-gray-300" />

          <p className="text-base text-balance">
            LotCheck is an informational tool. Not professional advice. Based on
            ACT planning changes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeBlockAssessment;

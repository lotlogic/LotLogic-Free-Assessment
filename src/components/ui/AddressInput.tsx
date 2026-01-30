import { useAutocompleteSuggestions } from "@/hooks/use-autocomplete-suggestions";
import { classList } from "@/utils/tailwind";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Search } from "lucide-react";
import {
  useCallback,
  useState,
  type ComponentProps,
  type FormEvent,
} from "react";

export type AddressInputProps = ComponentProps<"input"> & {
  name: string;
  placeholder?: string;
  handlePlaceSelect: (place: google.maps.places.Place | null) => void;
  handleInputChange: () => void;
};

// hard coded bound for Canberra
const canberraBounds = {
  south: -35.483281,
  west: 149.007223,
  north: -35.139246,
  east: 149.229696,
};

export const AddressInput = ({
  name,
  placeholder,
  handlePlaceSelect,
  handleInputChange,
}: AddressInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showListing, setShowListing] = useState(false);

  const places = useMapsLibrary("places");
  const { suggestions, resetSession } = useAutocompleteSuggestions(inputValue, {
    locationRestriction: canberraBounds,
    // region: "au",
  });

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setShowListing(true);
    setInputValue((event.target as HTMLInputElement).value);
    handleInputChange();
  };

  const handleSuggestionClick = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!places || !suggestion.placePrediction) return;

      // get place fields - list the fields that need to be available
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({
        fields: ["viewport", "location", "formattedAddress"],
      });

      // calling fetchFields invalidates the session-token, so we now have to call
      // resetSession() so a new one gets created for further search
      resetSession();

      // setInputValue("");
      setInputValue(suggestion.placePrediction.text.text);
      setShowListing(false);
      handlePlaceSelect(place);
    },
    [places, handlePlaceSelect],
  );

  return (
    <span className="relative block">
      <Search className="absolute top-1/2 left-3 size-6 -translate-y-1/2 text-gray-300" />
      <input
        type="search"
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onInput={(event) => handleInput(event)}
        className={classList(
          "w-full px-4 py-3 pl-12",
          "bg-white placeholder-gray-500",
          "border border-gray-300 rounded-md",
          "outline-primary-hover outline-offset-2",
          "focus-visible:outline-2 focus-visible:border-transparent",
        )}
        autoComplete="off"
      />

      {showListing && suggestions.length > 0 && (
        <ul
          className={classList(
            "absolute top-full left-0",
            "w-full bg-white",
            "mt-1",
            "border border-gray-300 rounded-md",
            "divide-y divide-gray-300",
            "overflow-hidden",
          )}
        >
          {suggestions.map((suggestion, index) => {
            return (
              <li
                key={index}
                className="p-2 transition-colors cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.placePrediction?.text.text}
              </li>
            );
          })}
        </ul>
      )}
    </span>
  );
};

export default AddressInput;

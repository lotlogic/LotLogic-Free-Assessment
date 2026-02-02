type Props = {
  error?: string;
};

const ErrorMessage = (props: Props) => {
  return (
    <div className="text-center">
      <p>Unfortunately there was a error fetching this block assessment.</p>
      <p className="mt-4 text-base">
        Error:{" "}
        {props.error
          ?.replace("(did you import the GeoJSON datasets?)", "")
          .trim()}
      </p>
    </div>
  );
};

export default ErrorMessage;

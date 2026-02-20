import { Link } from "react-router-dom";

type Props = {
  error?: string;
};

const ErrorMessage = (props: Props) => {
  if (props.error) console.error("Error: " + props.error.trim());
  return (
    <div className="text-lg text-center pt-15 mx-auto prose">
      <p>Unfortunately there was a error fetching this block assessment.</p>
      <p>Please try searching for you address again.</p>
      <p>
        <Link to="/">Search again</Link>
      </p>
    </div>
  );
};

export default ErrorMessage;

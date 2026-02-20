import AnimatedLogo from "../ui/AnimatedLogo";

const LoadingMessage = () => (
  <div className="text-center">
    <AnimatedLogo width={100} className="mx-auto" />
    Loading...
  </div>
);

export default LoadingMessage;

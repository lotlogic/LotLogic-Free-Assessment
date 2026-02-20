import AssessmentForm from "@/components/AssessmentForm";
import { useEffect } from "react";

export const HomePage = () => {
  useEffect(() => {
    console.log("useEffect");
    document.body.classList.add("home");
    return () => document.body.classList.remove("home");
  }, []);

  return <AssessmentForm />;
};

export default HomePage;

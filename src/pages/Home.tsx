import AssessmentForm from "@/components/AssessmentForm/AssessmentForm";
import Main from "@/components/layouts/Main";
import { motion as m } from "framer-motion";

export const HomePage = () => {
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="homeBg"
      ></m.div>
      <Main>
        <AssessmentForm />
      </Main>
    </>
  );
};

export default HomePage;

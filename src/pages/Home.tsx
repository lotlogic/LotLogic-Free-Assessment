import AssessmentForm from "@/components/AssessmentForm";
import Header from "@/components/layouts/Header";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main className="home">
        <AssessmentForm />
      </main>
    </>
  );
};

export default HomePage;

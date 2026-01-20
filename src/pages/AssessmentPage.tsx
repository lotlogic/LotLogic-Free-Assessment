import FreeBlockAssessmentReport from "@/components/FreeBlockAssessmentReport";
import Header from "@/components/layouts/Header";
import PaidAssessmentCta from "@/components/PaidAssessmentCta";

export const AssessmentPage = () => {
  return (
    <>
      <Header />
      <main>
        <FreeBlockAssessmentReport />

        <PaidAssessmentCta />

        <section className="text-gray-400 text-center">
          LotCheck is an informational tool based on ACT planning changes for
          RZ1/RZ2. This version assesses blank-site rules only.
        </section>
      </main>
    </>
  );
};

export default AssessmentPage;

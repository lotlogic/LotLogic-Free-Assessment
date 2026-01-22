import Header from "@/components/layouts/Header";
import Heading from "@/components/ui/Heading";

export const AboutPage = () => {
  return (
    <>
      <Header />
      <main>
        <section>
          <div className="max-w-7xl mx-auto px-4 py-12">
            <Heading tag="h1" size="h1">
              About Page
            </Heading>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;

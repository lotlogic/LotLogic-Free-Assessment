import Main from "@/components/layouts/Main";
import Heading from "@/components/ui/Heading";

export const AboutPage = () => {
  return (
    <Main>
      <section>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Heading tag="h1" size="h1">
            About Page
          </Heading>
        </div>
      </section>
    </Main>
  );
};

export default AboutPage;

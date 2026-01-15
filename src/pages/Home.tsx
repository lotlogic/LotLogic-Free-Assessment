import Header from "@/components/layouts/Header";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main className="grow pt-15 bg-gray-100 text-gray-700">
        <section>
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1>Home page</h1>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;

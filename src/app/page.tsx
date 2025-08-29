import React from "react";
import Accordion from "@/_components/accordion";
import Head from "next/head";
import Navbar from "@/_components/navbar";
import Hero from "@/_components/hero";
import SectionTitle from "@/_components/sectionTitle";
import Testimonials from "@/_components/testimonials";
import Footer from "@/_components/footer";

export default function Home() {
  // const [topics, setTopics] = useState<any>();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchTopics = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/topics");
  //       if (!res.ok) throw new Error("Failed to fetch topics");
  //       const data = await res.json();
  //       setTopics(data); // assuming API returns an array of topics
  //     } catch (err: any) {
  //       console.error(err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTopics();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* <Accordion items={topics?.topics} /> */}
      <Head>
        <title>Nextly - Free Nextjs & TailwindCSS Landing Page Template</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <SectionTitle
        pretitle="Nextly Benefits"
        title=" Why should you use this landing page">
        Nextly is a free landing page & marketing website template for startups
        and indie projects. Its built with Next.js & TailwindCSS. And its
        completely open-source.
      </SectionTitle>
      <SectionTitle
        pretitle="Watch a video"
        title="Learn how to fullfil your needs">
        This section is to highlight a promo or demo video of your product.
        Analysts says a landing page with video has 3% more conversion rate. So,
        don't forget to add one. Just like this.
      </SectionTitle>
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>
      <Footer />
    </>
  );
}

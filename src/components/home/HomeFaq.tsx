import FaqAccordion from "@/components/FaqAccordion";
import { faqs } from "@/data/faqs";
import { sectionTitle } from "@/components/home/ui";

export default function HomeFaq() {
  return (
    <section className="bg-[hsl(210,40%,98%)] px-4 py-16 lg:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="faq-heading" className={sectionTitle}>
          Frequently asked questions
        </h2>
        <div className="mt-8">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

const FAQSection = () => {
  return (
    <section className="py-6 lg:py-12 px-3 lg:px-4 bg-background" data-testid="section-faq">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-4 lg:mb-8">
          <h2 className="font-heading font-bold text-xl lg:text-3xl text-foreground mb-1 lg:mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-xs lg:text-sm">
            Everything you need to know before booking
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-primary-foreground/15 rounded-lg mb-2 px-3 lg:px-4 bg-primary"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-sm lg:text-base text-white hover:no-underline py-3 lg:py-4 [&>svg]:text-white">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/80 text-xs lg:text-sm leading-relaxed pb-3 lg:pb-4">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;

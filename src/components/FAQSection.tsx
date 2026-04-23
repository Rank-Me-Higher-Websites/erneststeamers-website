import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How much does carpet cleaning cost?",
    a: "Pricing depends on the size of the area and the type of cleaning required. Most residential jobs start at $99. Call us at 630-830-9867 for a free, no-obligation quote tailored to your home.",
  },
  {
    q: "How long does the carpet take to dry?",
    a: "Carpets typically dry within 4–6 hours after our steam cleaning service. We use powerful extraction equipment that removes most of the moisture during cleaning, so your home is back to normal fast.",
  },
  {
    q: "Are the cleaning solutions safe for kids and pets?",
    a: "Absolutely. We use eco-friendly, non-toxic cleaning solutions that are safe for children, pets, and people with allergies — without sacrificing cleaning power.",
  },
  {
    q: "What areas do you serve?",
    a: "We proudly serve Chicago and the surrounding suburbs, including Bartlett, Schaumburg, Naperville, Elgin, Aurora, and Franklin Park. Not sure if we cover your area? Just give us a call.",
  },
  {
    q: "Do you offer same-day or emergency service?",
    a: "Yes! We offer same-day service whenever possible and respond to emergency requests within 24 hours. Call us early in the day for the best chance of same-day availability.",
  },
  {
    q: "Can you remove tough stains and pet odors?",
    a: "Yes. Our certified technicians specialize in removing tough stains — wine, coffee, ink, mud — as well as deep-set pet odors. We use professional-grade enzyme treatments that neutralize odors at the source.",
  },
  {
    q: "Do I need to move my furniture?",
    a: "No. Our team will move standard furniture as part of the service. We just ask that you remove fragile items and any small belongings beforehand.",
  },
];

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
              className="border border-border rounded-lg mb-2 px-3 lg:px-4 bg-card"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-sm lg:text-base text-foreground hover:no-underline py-3 lg:py-4">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-xs lg:text-sm leading-relaxed pb-3 lg:pb-4">
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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  q: string;
  a: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="grid items-start gap-3 lg:grid-cols-2">
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q} className="rounded-xl border border-border bg-white px-4">
          <AccordionTrigger className="min-h-12 text-left text-base font-semibold text-primary hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-[hsl(216,30%,26%)]">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

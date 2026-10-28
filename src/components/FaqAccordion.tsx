import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  q: string;
  a: ReactNode;
};

export default function FaqAccordion({ items, defaultOpen = false }: { items: FaqItem[]; defaultOpen?: boolean }) {
  const className = "grid items-start gap-3 lg:grid-cols-2";
  const list = items.map((item) => (
    <AccordionItem key={item.q} value={item.q} className="rounded-xl border border-border bg-white px-4">
      <AccordionTrigger className="min-h-12 text-left text-base font-semibold text-primary hover:no-underline">
        {item.q}
      </AccordionTrigger>
      <AccordionContent className="text-base leading-relaxed text-[hsl(216,30%,26%)]">{item.a}</AccordionContent>
    </AccordionItem>
  ));

  if (defaultOpen) {
    return (
      <Accordion type="multiple" defaultValue={items.map((item) => item.q)} className={className}>
        {list}
      </Accordion>
    );
  }

  return (
    <Accordion type="single" collapsible className={className}>
      {list}
    </Accordion>
  );
}

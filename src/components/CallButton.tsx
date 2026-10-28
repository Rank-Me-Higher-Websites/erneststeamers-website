import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, phoneTelHref } from "@/data/locations";

type CallButtonProps = {
  className?: string;
  children?: ReactNode;
};

export default function CallButton({ className = "", children }: CallButtonProps) {
  return (
    <a href={phoneTelHref()} className={className}>
      <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{children ?? `Call ${PHONE_DISPLAY}`}</span>
    </a>
  );
}

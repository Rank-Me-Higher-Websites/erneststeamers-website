import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { inputClass } from "@/components/home/ui";

export const SERVICE_OPTIONS = [
  "Carpet Cleaning",
  "Upholstery Cleaning",
  "Area Rug Cleaning",
  "Tile & Grout Cleaning",
  "Commercial Carpet Cleaning",
] as const;

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  service: "",
  rooms: "",
  squareFootage: "",
  preferredDate: "",
  message: "",
  website: "",
};

type QuoteFormProps = {
  id?: string;
  defaultService?: string;
  compact?: boolean;
  heading?: string;
  onSubmitted?: () => void;
};

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-base font-semibold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function QuoteForm({
  id,
  defaultService = "",
  compact = false,
  heading,
  onSubmitted,
}: QuoteFormProps) {
  const generatedId = useId().replace(/:/g, "");
  const formId = id ?? `quote-${generatedId}`;
  const [formData, setFormData] = useState({ ...initialFormData, service: defaultService });
  const [detailsOpen, setDetailsOpen] = useState(!compact);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    setFormData((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const source = typeof window !== "undefined" ? window.location.href : "";
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source }),
      });
      if (!response.ok) throw new Error("submit failed");
      setSubmitted(true);
      setFormData({ ...initialFormData, service: defaultService });
      onSubmitted?.();
    } catch {
      setError("Something went wrong. Please try again or call 630-830-9867.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <p className="font-heading text-2xl font-bold text-primary">Thanks — we'll contact you shortly.</p>
      </div>
    );
  }

  const extraId = `${formId}-extra`;

  return (
    <form id={formId} onSubmit={handleSubmit} className="relative scroll-mt-24 space-y-3" aria-busy={submitting}>
      {heading ? <h2 className="font-heading text-2xl font-bold text-primary">{heading}</h2> : null}
      <div aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>
      <Field id={`${formId}-name`} label="Full name *">
        <input
          id={`${formId}-name`}
          name="name"
          required
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>
      <Field id={`${formId}-phone`} label="Phone *">
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>
      <Field id={`${formId}-email`} label="Email *">
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>
      <Field id={`${formId}-address`} label="Service address *">
        <input
          id={`${formId}-address`}
          name="address"
          autoComplete="street-address"
          required
          value={formData.address}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>
      <Field id={`${formId}-service`} label="Service needed *">
        <select
          id={`${formId}-service`}
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </Field>
      {compact ? (
        <button
          type="button"
          className="min-h-12 text-base font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(174,62%,26%)]"
          aria-expanded={detailsOpen}
          aria-controls={extraId}
          onClick={() => setDetailsOpen((open) => !open)}
        >
          {detailsOpen ? "Hide extra details" : "More details"}
        </button>
      ) : null}
      <div id={extraId} hidden={compact && !detailsOpen} className="space-y-3">
        <Field id={`${formId}-rooms`} label="Number of rooms">
          <input
            id={`${formId}-rooms`}
            name="rooms"
            type="number"
            inputMode="numeric"
            min={1}
            value={formData.rooms}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
        <Field id={`${formId}-squareFootage`} label="Approx. square footage">
          <input
            id={`${formId}-squareFootage`}
            name="squareFootage"
            inputMode="numeric"
            value={formData.squareFootage}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
        <Field id={`${formId}-preferredDate`} label="Preferred date">
          <input
            id={`${formId}-preferredDate`}
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
        <Field id={`${formId}-message`} label="Additional details">
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass} py-2`}
          />
        </Field>
      </div>
      <p role="status" aria-live="polite" className="text-base text-[hsl(216,30%,26%)]">
        {submitting ? "Sending your request." : ""}
      </p>
      {error ? (
        <p role="alert" className="text-base font-semibold text-destructive">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-cta-orange px-5 text-base font-heading font-bold text-[hsl(216,50%,12%)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(174,62%,26%)]"
      >
        {submitting ? "Sending…" : "Get my free quote"}
      </button>
    </form>
  );
}

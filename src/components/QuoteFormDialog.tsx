import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle2 } from "lucide-react";

interface QuoteFormDialogProps {
  children: React.ReactNode;
}

const serviceOptions = [
  "Carpet Cleaning",
  "Upholstery Cleaning",
  "Area Rug Cleaning",
  "Tile & Grout Cleaning",
  "Commercial Carpet Cleaning",
];

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
};

const QuoteFormDialog = ({ children }: QuoteFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const source = typeof window !== "undefined" ? window.location.href : "";
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source }),
      });
      if (!res.ok) throw new Error("submit failed");
      setSubmitted(true);
      setFormData(initialFormData);
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => setSubmitted(false), 300);
      }, 2500);
    } catch {
      alert("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) {
      setTimeout(() => setSubmitted(false), 300);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border-2 border-muted-foreground/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto animate-scale-in mx-4 sm:mx-auto rounded-xl">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-scale-in" />
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground text-center">
              We'll get back to you within 24 hours with your free quote.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl text-foreground">
                Get Your Free Quote
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Fill out the details below and we'll get back to you within 24 hours.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
                  <label className="text-xs font-medium text-foreground mb-1 block">Full Name *</label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className={inputClass}
                  />
                </div>
                <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <label className="text-xs font-medium text-foreground mb-1 block">Phone *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(630) 555-1234"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
                <label className="text-xs font-medium text-foreground mb-1 block">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={inputClass}
                />
              </div>

              <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <label className="text-xs font-medium text-foreground mb-1 block">Service Address *</label>
                <input
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, Chicago, IL"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "250ms" }}>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Service Needed *</label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Number of Rooms</label>
                  <input
                    name="rooms"
                    type="number"
                    min="1"
                    value={formData.rooms}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Approx. Sq. Footage</label>
                  <input
                    name="squareFootage"
                    value={formData.squareFootage}
                    onChange={handleChange}
                    placeholder="e.g. 1500"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Preferred Date</label>
                  <input
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: "350ms" }}>
                <label className="text-xs font-medium text-foreground mb-1 block">
                  Additional Details (stains, pet odors, special requests)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about any specific concerns..."
                  className={inputClass + " resize-none"}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold py-3 rounded-lg text-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed animate-fade-in flex items-center justify-center gap-2"
                style={{ animationDelay: "400ms" }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit for Free Quote"
                )}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuoteFormDialog;

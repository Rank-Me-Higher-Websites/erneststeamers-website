import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const QuoteFormDialog = ({ children }: QuoteFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    rooms: "",
    squareFootage: "",
    preferredDate: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just close - can integrate with backend later
    setOpen(false);
    alert("Thank you! We'll get back to you within 24 hours with your free quote.");
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground">
            Get Your Free Quote
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Fill out the details below and we'll get back to you within 24 hours.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
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
            <div>
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

          <div>
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

          <div>
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

          <div className="grid grid-cols-2 gap-3">
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

          <div className="grid grid-cols-2 gap-3">
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

          <div>
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
            className="w-full bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold py-3 rounded-lg text-lg transition-all"
          >
            Submit for Free Quote
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteFormDialog;

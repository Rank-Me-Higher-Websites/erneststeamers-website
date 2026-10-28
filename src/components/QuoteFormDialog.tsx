import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QuoteForm from "@/components/QuoteForm";

type QuoteFormDialogProps = {
  children: ReactNode;
  defaultService?: string;
};

const QuoteFormDialog = ({ children, defaultService }: QuoteFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setFormKey((key) => key + 1);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="mx-4 max-h-[85vh] overflow-y-auto rounded-xl sm:mx-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground">Get your free quote</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Tell us about the space and we will contact you with a quote.
          </DialogDescription>
        </DialogHeader>
        <QuoteForm
          key={`${defaultService ?? ""}-${formKey}`}
          defaultService={defaultService}
          onSubmitted={() => {
            window.setTimeout(() => setOpen(false), 2500);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QuoteFormDialog;

import Steps from "@/components/Steps";
import { PHONE_DISPLAY } from "@/data/locations";
import { bodyText, sectionTitle } from "@/components/home/ui";

export default function HowItWorks() {
  return (
    <section className="bg-[hsl(210,40%,98%)] px-4 py-16 lg:py-24" aria-labelledby="how-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="how-heading" className={sectionTitle}>
          How it works
        </h2>
        <p className={`${bodyText} mt-3 max-w-2xl`}>Three steps from the first call to the walkthrough.</p>
        <div className="mt-8">
          <Steps
            steps={[
              {
                title: "Request a quote",
                body: `Call ${PHONE_DISPLAY} or send the form on this page. Tell us the service and the address.`,
              },
              {
                title: "We confirm details and schedule",
                body: "We review the rooms, size, and condition, then confirm a time.",
              },
              {
                title: "Steam clean and walkthrough",
                body: "Certified technicians clean with hot-water extraction and walk the space with you.",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

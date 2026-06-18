import ContactForm from "@/components/ContactForm";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionTitle
        title="Contact Us"
        subtitle="Send a message to Nexus DevOps Limited and we will get back to you."
      />

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-bold">Get in Touch</h3>
          <p className="mt-4 text-slate-600">Nexus DevOps Limited</p>
          <p className="text-slate-600">Port Moresby, Papua New Guinea</p>
          <p className="text-slate-600 mt-2">Email: info@ndo.com</p>
          <p className="text-slate-600">Phone: +675 78337326</p>

          <Image
            src="/images/team.webp"
            alt="Contact Nexus DevOps"
            width={600}
            height={400}
            className="rounded-xl mt-6 w-full h-auto object-cover"
          />
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

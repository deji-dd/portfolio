"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const placeholders = [
  "How can I reach you?",
  "Tell me about the IS Unit documentation...",
  "What's the status of the Lab?",
  "Ask about ERPNext customizations...",
  "Initialize a collaboration...",
];

export function ContactSection() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <section className="flex flex-col items-center justify-center pb-40">
      <h2 className="mb-10 text-xl text-center sm:text-4xl dark:text-white text-black font-bold tracking-tighter">
        Initialize&nbsp;&nbsp;a&nbsp;&nbsp;
        <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">
          Connection
        </span>
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </section>
  );
}

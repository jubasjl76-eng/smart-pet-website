import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join the waitlist" };

/** Stub — task B4 (Cursor) builds the real application form here. */
export default function Apply() {
  return (
    <main className="mx-auto max-w-[46ch] px-6 py-32">
      <h1 className="font-display text-4xl">Join the waitlist</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        The application form lands here. It will ask about your home and which
        litter you are hoping for, and create an enquiry the breeder follows up
        personally. No deposit is taken online.
      </p>
      <p className="mt-6 text-lg">
        For now, email{" "}
        <a
          className="text-accent underline underline-offset-4"
          href="mailto:hello@rathmoreretrievers.example"
        >
          hello@rathmoreretrievers.example
        </a>
        .
      </p>
    </main>
  );
}

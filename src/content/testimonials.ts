/**
 * Placeholder testimonials for the home "From families" section.
 * Task B5 (Cursor) owns the final copy — keep the shape.
 */
export interface Testimonial {
  quote: string;
  name: string;
  town: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "“They knew every puppy by temperament, not by collar colour. Ours was matched to us before we had even chosen a name.”",
    name: "The Nolans",
    town: "Trim",
  },
  {
    quote:
      "“Two years on and the health testing still gives us peace of mind. Any question we send gets a real answer the same day.”",
    name: "Aoife M.",
    town: "Kilkenny",
  },
  {
    quote:
      "“He came home settled, crate-happy and used to the car. You can tell the first eight weeks were done with care.”",
    name: "The Brennan family",
    town: "Maynooth",
  },
];

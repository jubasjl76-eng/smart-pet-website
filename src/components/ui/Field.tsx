import { cn } from "@/lib/cn";

const control =
  "w-full rounded-sm border border-line bg-bg px-3 py-2.5 text-base text-ink placeholder:text-ink-soft/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  className?: string;
};

export function Field({
  label,
  name,
  error,
  optional,
  className,
  id: idProp,
  ...input
}: FieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "className">) {
  const id = idProp ?? name;
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-sm text-ink">
        {label}
        {optional && <span className="text-ink-soft"> (optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={control}
        {...input}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  optional,
  className,
  id: idProp,
  ...input
}: FieldProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "className">) {
  const id = idProp ?? name;
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-sm text-ink">
        {label}
        {optional && <span className="text-ink-soft"> (optional)</span>}
      </label>
      <textarea
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, "min-h-32 resize-y")}
        {...input}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden honeypot — real users never see or fill this. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="company">Company</label>
      <input
        id="company"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

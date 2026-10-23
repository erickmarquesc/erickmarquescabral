import type { AnchorHTMLAttributes, HTMLAttributes, LiHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
  secondary: "border-line-strong bg-surface text-ink hover:border-subtle",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

/** Link com aparência de botão (todas as ações do site levam a algum lugar). */
export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-transparent px-5",
        "text-[0.9375rem] font-semibold whitespace-nowrap",
        "transition-[background-color,border-color,color,transform] duration-200 ease-brand active:translate-y-px",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

/** Link de texto sublinhado, com a seta que desliza no hover (só com mouse). */
export function TextLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "group/link touch-target inline-flex items-center gap-1 border-b border-line-strong pb-0.5",
        "text-[0.9375rem] font-semibold text-ink transition-colors duration-200 ease-brand",
        "hover:border-accent hover:text-accent",
        "[&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-brand hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

export function ChipList({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex flex-wrap gap-2", className)} {...props} />;
}

export function Chip({ className, ...props }: LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn(
        "inline-flex rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[0.8125rem] font-medium text-muted",
        className,
      )}
      {...props}
    />
  );
}

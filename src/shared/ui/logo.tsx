interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={`font-display text-2xl font-semibold tracking-tight text-foreground ${className ?? ""}`}>
      cb<span className="text-accent">.</span>
    </span>
  );
}

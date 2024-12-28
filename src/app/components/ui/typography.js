export function TypographyH1({ children, className = "" }) {
  return <h1 className={`text-3xl font-bold ${className}`}>{children}</h1>;
}

export function TypographyH2({ children, className = "" }) {
  return <h2 className={`text-2xl font-semibold ${className}`}>{children}</h2>;
}

export function TypographyP({ children, className = "" }) {
  return <p className={className}>{children}</p>;
}

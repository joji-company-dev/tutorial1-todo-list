export function Alert({ children, variant = "default" }) {
  return <div className={`alert alert-${variant}`}>{children}</div>;
}

export function AlertDescription({ children }) {
  return <div className="alert-description">{children}</div>;
}

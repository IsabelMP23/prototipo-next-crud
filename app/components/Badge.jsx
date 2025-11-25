export default function Badge({ children }) {
  return (
    <span
      className="rounded-full w-full px-3 py-1 text-sm font-semibold inline-block text-white"
      style={{ background: "var(--background)" }}
    >
      {children}
    </span>
  );
}
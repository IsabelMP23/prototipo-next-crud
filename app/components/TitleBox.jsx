export default function TitleBox({ children }) {
  return (
    <h2
      className="text-xl rounded-2xl font-bold mb-4 text-white block px-2 py-1"
      style={{ background: "var(--background)" }}
    >
      {children}
    </h2>
  );
}

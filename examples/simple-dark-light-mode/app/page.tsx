import ThemeSelector from "./ThemeSelector";

export default function Page() {
  return (
    <div className="container">
      <h1>Simple Dark Light Mode</h1>
      <hr />
      <p>
        Example showing how to use <code>nextjs-themes</code> to implement simple dark/light mode
      </p>
      <ThemeSelector />
    </div>
  );
}

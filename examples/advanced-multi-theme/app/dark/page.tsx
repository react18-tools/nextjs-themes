import { ForceColorScheme } from "nextjs-themes/dist/ForceColorScheme";

export default function DarkPage() {
  return (
    <div>
      <ForceColorScheme colorScheme="dark" />
      <h1>This is a dark page - forcedColorScheme -&gt; dark</h1>
    </div>
  );
}

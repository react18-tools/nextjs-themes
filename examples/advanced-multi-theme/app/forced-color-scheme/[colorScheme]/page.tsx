import { ForceColorScheme } from "nextjs-themes";

export default function PageWithForcedColorScheme({ params: { colorScheme } }) {
  return (
    <>
      <ForceColorScheme colorScheme={colorScheme} />
      <p>Color scheme is forced to {colorScheme}</p>
      <p>Thus, default-{colorScheme}-theme is applied</p>
    </>
  );
}

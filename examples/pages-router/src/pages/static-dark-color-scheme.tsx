import { Editor } from "@repo/shared";
import { ColorSchemeType } from "nextjs-themes";

const code = `function MyPage() {
    return (<>...</>)
}

MyPage.colorScheme = "dark";

export default MyPage;
// Make sure you update _app.(jsx|tsx) file as well.`;

function StaticDarkColorScheme() {
  return (
    <div className="center">
      <h1>Static Color Scheme by setting colorScheme on page Component</h1>
      <Editor code={code} language="tsx" className="code" />
    </div>
  );
}

StaticDarkColorScheme.colorScheme = "dark" as ColorSchemeType;

export default StaticDarkColorScheme;

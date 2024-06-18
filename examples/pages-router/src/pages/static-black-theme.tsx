import { Editor } from "@repo/shared";

const code = `function MyPage() {
    return (<>...</>)
}

MyPage.theme = "my-theme";

export default MyPage;
// Make sure you update _app.(jsx|tsx) file as well.`;
function StaticBlackTheme() {
  return (
    <div className="center">
      <h1>Static Black theme by setting theme on page Component</h1>
      <Editor code={code} language="tsx" className="code" />
    </div>
  );
}

StaticBlackTheme.theme = "dark";

export default StaticBlackTheme;

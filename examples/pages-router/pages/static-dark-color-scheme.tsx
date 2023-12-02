import { ColorSchemeType } from "nextjs-themes";

function StaticBlackTheme() {
  return (
    <div>
      <h1>Static Black theme by setting theme on page Component</h1>
      <code>
        <pre>
          {`function MyPage() {
    return (<>...</>)
}

MyPage.theme = "my-theme";

export default MyPage;`}
        </pre>
      </code>
    </div>
  );
}

StaticBlackTheme.colorScheme = "dark" as ColorSchemeType;

export default StaticBlackTheme;

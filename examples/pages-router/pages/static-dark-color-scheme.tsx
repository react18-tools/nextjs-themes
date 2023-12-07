import { ColorSchemeType } from "nextjs-themes";

function StaticDarkColorScheme() {
  return (
    <div>
      <h1>Static Color Scheme by setting colorScheme on page Component</h1>
      <code>
        <pre>
          {`function MyPage() {
    return (<>...</>)
}

MyPage.colorScheme = "dark";

export default MyPage;`}
        </pre>
      </code>
    </div>
  );
}

StaticDarkColorScheme.colorScheme = "dark" as ColorSchemeType;

export default StaticDarkColorScheme;

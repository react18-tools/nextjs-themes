import { darkThemes, lightThemes } from "@repo/shared";
import { GetStaticPaths, GetStaticProps } from "next";

export default function PageWithForcedTheme({ theme }: { theme?: string }) {
  return (
    <>
      <h1>
        Example page showing Themed page with <code>forcedTheme</code>
      </h1>
      <p>Theme is forced to {theme}</p>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [...darkThemes, ...lightThemes].map(theme => {
      return {
        params: {
          theme,
        },
      };
    }),
    fallback: false,
  };
};

// @ts-expect-error -- ok
export const getStaticProps: GetStaticProps = ({ params: { theme } }) => {
  // @ts-expect-error -- ok
  PageWithForcedTheme.theme = theme;
  return {
    props: {
      theme,
    },
  };
};

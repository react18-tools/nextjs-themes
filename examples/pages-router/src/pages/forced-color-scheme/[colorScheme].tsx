import { GetStaticPaths } from "next";
import { useRouter } from "next/router";

export default function PageWithForcedColorScheme() {
  const router = useRouter();
  const { colorScheme } = router.query;
  return (
    <>
      <h1>
        Example page showing <code>forcedColorScheme</code>
      </h1>
      <p>Color scheme is forced to {colorScheme}</p>
      <p>Thus, default-{colorScheme}-theme is applied</p>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: ["system", "dark", "light"].map(colorScheme => {
      return {
        params: {
          colorScheme,
        },
      };
    }),
    fallback: false,
  };
};

// @ts-expect-error -- ok
export const getStaticProps: GetStaticProps = ({ params: { colorScheme } }) => {
  // @ts-expect-error -- ok
  PageWithForcedColorScheme.colorScheme = colorScheme;
  return {
    props: {
      colorScheme,
    },
  };
};

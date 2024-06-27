interface CardProps {
  href: string;
  title: string;
  text: string;
}

/** Card */
export default function Card({ href, title, text }: CardProps) {
  return (
    <a
      href={href}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer">
      <h2 className={"mb-3 text-2xl font-semibold"}>
        {`${title} `}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={"m-0 max-w-[30ch] text-sm opacity-50"}>{text}</p>
    </a>
  );
}

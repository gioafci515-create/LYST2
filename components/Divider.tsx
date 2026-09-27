/* eslint-disable @next/next/no-img-element */
export default function Divider({ className }: { className?: string }) {
  return (
    <img
      src="/images/divider.svg"
      alt=""
      width={1280}
      height={1}
      className={className ? `divider ${className}` : "divider"}
    />
  );
}

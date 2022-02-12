import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/" passHref>
        <h1>
          <a>Cijene stanova</a>
        </h1>
      </Link>
    </header>
  );
}

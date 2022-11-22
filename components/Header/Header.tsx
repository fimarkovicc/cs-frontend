import Link from "next/link"
import { HeaderStyled } from './Header.styled'

export default function Header() {
  return (
    <HeaderStyled>
      <header>
        <Link href="/" passHref>
          <h1 className="header__home">
            <a>Cijene Stanova</a>
          </h1>
        </Link>

        <nav className="header__menu">
          <a href="#gradovi">Gradovi</a>
          <a href="#usporedbe">Usporedbe</a>
          <a href="#kalkulator">Kreditni kalkulator</a>
          <a href="#faq">ČPP</a>
        </nav>
      </header>
    </HeaderStyled>
  );
}

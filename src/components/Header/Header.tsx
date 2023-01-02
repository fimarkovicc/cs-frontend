import Link from "next/link"
import { HeaderStyled } from "./Header.styled"

export default function Header() {
    return (
        <HeaderStyled>
            <div className="header-wrapper container">
                <Link href="/" passHref>
                    <span className="logo">
                        <a>Cijene Stanova</a>
                    </span>
                </Link>
                <nav className="header-nav">
                    <a href="#gradovi">Gradovi</a>
                    <a href="#usporedbe">Usporedbe</a>
                    <a href="#kalkulator">Kreditni kalkulator</a>
                    <a href="#faq">FAQ</a>
                </nav>
            </div>
            <div className="menu-btn">
                
            </div>
        </HeaderStyled>
    )
}

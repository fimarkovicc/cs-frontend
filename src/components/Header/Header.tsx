import React, { useState } from "react"
import Link from "next/link"
import { HeaderStyled } from "./Header.styled"
import StateSelect from "@utils/StateSelect/StateSelect"
import { useRouter } from "next/router"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()

    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const renderMobileNav = () => {
        return router.pathname == "/" ?
            (
                <nav className="header-mobile-nav">
                    <a href="#gradovi">Gradovi</a>
                    <a href="#usporedbe">Usporedbe</a>
                    <a href="#kalkulator">Kreditni kalkulator</a>
                    <a href="#faq">FAQ</a>
                </nav>
            ) :
            (
                <nav className="header-mobile-nav">
                    <Link href="/#gradovi">Gradovi</Link>
                    <Link href="/#usporedbe">Usporedbe</Link>
                    <Link href="/#kalkulator">Kreditni kalkulator</Link>
                    <Link href="/#faq">FAQ</Link>
                    <StateSelect />
                </nav>
            )
    }

    const renderDesktopNav = () => {
        return router.pathname == "/" ?
            (
                <nav className="header-desktop-nav">
                    <a href="#gradovi">Gradovi</a>
                    <a href="#usporedbe">Usporedbe</a>
                    <a href="#kalkulator">Kreditni kalkulator</a>
                    <a href="#faq">FAQ</a>
                </nav>
            ) :
            (
                <nav className="header-desktop-nav">
                    <StateSelect />
                </nav>
            )
    }

    return (
        <HeaderStyled isMenuOpen={isMenuOpen}>
            <div className="header-wrapper container">
                <Link legacyBehavior href="/" passHref>
                    <a className="logo">Cijene Stanova</a>
                </Link>
                {renderMobileNav()}
                {renderDesktopNav()}
            </div>
            <div className={["menu-btn", isMenuOpen ? "open" : ""].join(" ")} onClick={handleClick}>
                <span />
                <span />
                <span />
            </div>
        </HeaderStyled>
    )
}

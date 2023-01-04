import React, { useState, useEffect } from "react"
import Link from "next/link"
import { HeaderStyled } from "./Header.styled"
import useScreenSize from "@components/Hooks/useScreenSize"

export default function Header() {
    const screen = useScreenSize()
    const [isMenuOpen, setIsMenuOpen] = useState(screen?.isMobile ? false : true)

    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        setIsMenuOpen(screen?.isMobile ? false : true)
    }, [screen?.isMobile])

    return (
        <HeaderStyled>
            <div className="header-wrapper container">
                <Link href="/" passHref>
                    <a className="logo">Cijene Stanova</a>
                </Link>
                <nav className="header-nav" style={(isMenuOpen) ? {display: "flex"} : {display: "none"}}>
                    <a href="#gradovi">Gradovi</a>
                    <a href="#usporedbe">Usporedbe</a>
                    <a href="#kalkulator">Kreditni kalkulator</a>
                    <a href="#faq">FAQ</a>
                </nav>
            </div>
            <div className={["menu-btn", isMenuOpen ? "open" : ""].join(" ")} onClick={handleClick}>
                <span />
                <span />
                <span />
            </div>
        </HeaderStyled>
    )
}

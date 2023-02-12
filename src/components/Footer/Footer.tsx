import { FooterStyled } from "./Footer.style"
import Link from "next/link"

export default function Footer() {
    return (
        <FooterStyled>
            <footer className="container">
                <p>© Cijene Stanova {new Date().getFullYear() + " - "} 
                    <a href="mailto:cijenestanova@gmail.com">Kontakt</a>
                    <Link href="/uvjeti-koristenja">Uvjeti korištenja</Link>
                </p>
            </footer>
        </FooterStyled>
    )
}

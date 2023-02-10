import { FooterStyled } from "./Footer.style"

export default function Footer() {
    return (
        <FooterStyled>
            <footer className="container">
                <p>© Cijene Stanova {new Date().getFullYear() + " - "} 
                    <a href="mailto:cijenestanova@gmail.com">Kontakt</a></p>
            </footer>
        </FooterStyled>
    )
}

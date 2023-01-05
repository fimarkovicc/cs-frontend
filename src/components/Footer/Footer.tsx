import { FooterStyled } from "./Footer.style"

export default function Footer() {
    return (
        <FooterStyled>
            <footer className="container">
              © Cijene Stanova {new Date().getFullYear()}
            </footer>
        </FooterStyled>
    )
}

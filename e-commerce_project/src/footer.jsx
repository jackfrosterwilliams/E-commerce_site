import React from "react";
import Logo from "./assets/logo.png";

function Footer() {
    return (
        <footer className="footer_page">
            <div className="footer_content">
                <div className="footer_brand">
                    <div className="brand_mark"><img src={Logo} alt="Elegant Vogue Logo" /></div>
                    <div>
                        <p className="brand_name">ELEGANT VOGUE</p>
                        <p className="brand_tag">Modern essentials</p>
                    </div>
                </div>

                <nav className="footer_links" aria-label="Footer Navigation">
                    <a href="#">New In</a>
                    <a href="#">Collections</a>
                    <a href="#">Journal</a>
                    <a href="#">Contact</a>
                </nav>

                <div className="footer_contact">
                    <p>hello@elegantvogue.com</p>
                    <p>+1 (123) 456-7890</p>
                </div>
            </div>

            <div className="footer_bottom">
                <span>© 2026 Elegant Vogue</span>
                <span>Instagram · Pinterest · Facebook</span>
            </div>
        </footer>
    )
}

export default Footer;
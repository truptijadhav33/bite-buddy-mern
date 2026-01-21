import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-[#161718] text-muted-foreground">
            <div className="container px-4 py-8 mx-auto max-w-screen-xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Orderly</h3>
                        <p className="text-sm">
                            Authentic flavors, premium ingredients, and a dining experience like no other.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
                            <li><Link to="/booking" className="hover:text-primary transition-colors">Reservations</Link></li>
                            <li><Link to="/orders" className="hover:text-primary transition-colors">My Orders</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li>123 Culinary Avenue</li>
                            <li>Food City, FC 90210</li>
                            <li>+1 (555) 123-4567</li>
                            <li>hello@restaurant.com</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary transition-colors text-xl"><FaInstagram /></a>
                            <a href="#" className="hover:text-primary transition-colors text-xl"><FaFacebook /></a>
                            <a href="#" className="hover:text-primary transition-colors text-xl"><FaTwitter /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 text-center text-xs">
                    © {new Date().getFullYear()} BytesBuddy. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

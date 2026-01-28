import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#0a0a0a] text-muted-foreground mt-auto">
            <div className="container px-6 py-12 mx-auto max-w-screen-xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-serif italic font-black text-white tracking-tighter">
                            Bite<span className="text-primary">Buddy</span>
                        </h3>
                        <p className="text-xs leading-relaxed tracking-wide uppercase font-medium opacity-70">
                            Crafting culinary stories with authentic flavors and premium ingredients since 1998.
                        </p>
                        <div className="flex space-x-5">
                            <SocialIcon icon={<FaInstagram />} href="#" />
                            <SocialIcon icon={<FaFacebook />} href="#" />
                            <SocialIcon icon={<FaTwitter />} href="#" />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Explore</h4>
                        <ul className="space-y-3 text-xs font-bold uppercase tracking-widest">
                            <li><FooterLink to="/">Home</FooterLink></li>
                            <li><FooterLink to="/menu">Our Menu</FooterLink></li>
                            <li><FooterLink to="/booking">Reservations</FooterLink></li>
                            <li><FooterLink to="/gallery">Gallery</FooterLink></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Visit Us</h4>
                        <ul className="space-y-4 text-xs">
                            <li className="flex items-start gap-3">
                                <FaLocationDot className="text-primary mt-0.5" />
                                <span>123 Culinary Avenue, <br /> Food City, FC 90210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-primary" />
                                <span>hello@bitebuddy.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter/Hours */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Service Hours</h4>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>Mon - Thu</span>
                                <span className="text-white">11am - 10pm</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>Fri - Sat</span>
                                <span className="text-primary font-bold">11am - 12pm</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sunday</span>
                                <span className="text-white">12pm - 9pm</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-50">
                    <p>© {new Date().getFullYear()} BiteBuddy. Crafted for Excellence.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Helper Components for Cleaner Code
function FooterLink({ to, children }) {
    return (
        <Link to={to} className="hover:text-primary transition-all duration-300 flex items-center group">
            <span className="w-0 group-hover:w-2 h-[1px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>
            {children}
        </Link>
    );
}

function SocialIcon({ icon, href }) {
    return (
        <a href={href} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-lg hover:bg-primary hover:text-black hover:border-primary transition-all duration-500">
            {icon}
        </a>
    );
}
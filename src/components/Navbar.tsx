import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        <Link to="/" className="font-satoshi font-bold text-3xl sm:text-4xl tracking-tight text-primary">
          RAUS
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/cabins" className="font-satoshi font-medium text-sm tracking-wider text-foreground/80 hover:text-foreground transition-colors duration-200">
            Cabins
          </Link>
          <Link to="/lokasi" className="font-satoshi font-medium text-sm tracking-wider text-foreground/80 hover:text-foreground transition-colors duration-200">
            Lokasi
          </Link>
          <Link to="/pengalaman" className="font-satoshi font-medium text-sm tracking-wider text-foreground/80 hover:text-foreground transition-colors duration-200">
            Pengalaman
          </Link>
          <Link to="/journal" className="font-satoshi font-medium text-sm tracking-wider text-foreground/80 hover:text-foreground transition-colors duration-200">
            Journal
          </Link>
          <Link
            to="/cari"
            className="font-satoshi font-medium text-sm tracking-wider bg-primary text-primary-foreground h-10 px-5 rounded-full inline-flex items-center hover:brightness-95 active:scale-[0.98] transition-all duration-200"
          >
            Pesan Sekarang
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background px-4 pb-6 pt-2 space-y-4">
          <Link to="/cabins" className="block font-satoshi font-medium text-foreground/80" onClick={() => setMobileOpen(false)}>Cabins</Link>
          <Link to="/lokasi" className="block font-satoshi font-medium text-foreground/80" onClick={() => setMobileOpen(false)}>Lokasi</Link>
          <Link to="/pengalaman" className="block font-satoshi font-medium text-foreground/80" onClick={() => setMobileOpen(false)}>Pengalaman</Link>
          <Link to="/journal" className="block font-satoshi font-medium text-foreground/80" onClick={() => setMobileOpen(false)}>Journal</Link>
          <Link
            to="/cari"
            className="block font-satoshi font-medium bg-primary text-primary-foreground h-11 px-6 rounded-full inline-flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            Pesan Sekarang
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

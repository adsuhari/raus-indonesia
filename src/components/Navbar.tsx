import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        <Link to="/" className="font-satoshi font-bold text-3xl sm:text-4xl tracking-tight text-primary">
          RAUS
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/cabins" className={`font-satoshi font-medium text-sm tracking-wider transition-colors duration-200 ${isActive('/cabins') ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'}`}>
            Cabins
          </Link>
          <Link to="/locations" className={`font-satoshi font-medium text-sm tracking-wider transition-colors duration-200 ${isActive('/locations') ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'}`}>
            Locations
          </Link>
          <Link to="/experiences" className={`font-satoshi font-medium text-sm tracking-wider transition-colors duration-200 ${isActive('/experiences') ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'}`}>
            Experiences
          </Link>
          <Link to="/journal" className={`font-satoshi font-medium text-sm tracking-wider transition-colors duration-200 ${isActive('/journal') ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'}`}>
            Journal
          </Link>
          <Link
            to="/cabins"
            className="font-satoshi font-medium text-sm tracking-wider bg-primary text-primary-foreground h-10 px-5 rounded-full inline-flex items-center hover:brightness-95 active:scale-[0.98] transition-all duration-200"
          >
            Book Now
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
          <Link to="/locations" className="block font-satoshi font-medium text-foreground/80" onClick={() => setMobileOpen(false)}>Locations</Link>
          <Link to="/experiences" className="block font-satoshi font-medium text-foreground/80" onClick={() => setMobileOpen(false)}>Experiences</Link>
          <Link to="/journal" className="block font-satoshi font-medium text-foreground/80" onClick={() => setMobileOpen(false)}>Journal</Link>
          <Link
            to="/cabins"
            className="block font-satoshi font-medium bg-primary text-primary-foreground h-11 px-6 rounded-full inline-flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

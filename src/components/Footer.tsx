import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="font-satoshi font-bold text-2xl text-primary">
              RAUS
            </Link>
            <p className="font-satoshi text-sm text-muted-foreground mt-3 max-w-[200px]">
              Design cabins in Indonesia's nature.
            </p>
          </div>

          <div>
            <h4 className="font-satoshi font-bold text-sm text-foreground">Explore</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/cabins" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Cabins</Link></li>
              <li><Link to="/locations" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Locations</Link></li>
              <li><Link to="/experiences" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Experiences</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-satoshi font-bold text-sm text-foreground">About</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/about" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/journal" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Journal</Link></li>
              <li><Link to="/help" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Help</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-satoshi font-bold text-sm text-foreground">Join Us</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/partner" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Become a Partner</Link></li>
              <li><Link to="/careers" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8">
          <p className="font-satoshi text-xs text-muted-foreground">
            © 2026 Raus Indonesia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

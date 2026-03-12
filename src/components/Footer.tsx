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
              Cabin-cabin desain di alam Indonesia.
            </p>
          </div>

          <div>
            <h4 className="font-satoshi font-bold text-sm text-foreground">Jelajahi</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/cabins" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Cabins</Link></li>
              <li><Link to="/lokasi" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Lokasi</Link></li>
              <li><Link to="/pengalaman" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Pengalaman</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-satoshi font-bold text-sm text-foreground">Tentang</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/tentang" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Tentang Kami</Link></li>
              <li><Link to="/journal" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Journal</Link></li>
              <li><Link to="/bantuan" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Bantuan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-satoshi font-bold text-sm text-foreground">Bergabung</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/mitra" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Jadi Mitra</Link></li>
              <li><Link to="/karir" className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors">Karir</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8">
          <p className="font-satoshi text-xs text-muted-foreground">
            © 2026 Raus Indonesia. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";

const SearchBar = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-card rounded-2xl card-shadow p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Region */}
            <div className="flex items-center gap-3 bg-secondary rounded-lg h-11 px-4">
              <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
              <select className="font-satoshi text-sm text-foreground bg-transparent w-full outline-none cursor-pointer">
                <option>Semua Lokasi</option>
                <option>Bali</option>
                <option>Lombok</option>
                <option>Bandung</option>
                <option>Yogyakarta</option>
              </select>
            </div>

            {/* Check-in */}
            <div className="flex items-center gap-3 bg-secondary rounded-lg h-11 px-4">
              <Calendar size={16} className="text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Check-in & Check-out"
                className="font-satoshi text-sm text-foreground bg-transparent w-full outline-none placeholder:text-muted-foreground"
                onFocus={(e) => (e.target.type = "date")}
              />
            </div>

            {/* Guests */}
            <div className="flex items-center gap-3 bg-secondary rounded-lg h-11 px-4">
              <Users size={16} className="text-muted-foreground flex-shrink-0" />
              <select className="font-satoshi text-sm text-foreground bg-transparent w-full outline-none cursor-pointer">
                <option>2 Tamu</option>
                <option>1 Tamu</option>
                <option>3 Tamu</option>
                <option>4 Tamu</option>
                <option>5+ Tamu</option>
              </select>
            </div>

            {/* Search button */}
            <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground h-11 rounded-full font-satoshi font-medium text-sm tracking-wider hover:brightness-95 active:scale-[0.98] transition-all duration-200">
              <Search size={16} />
              Cari
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchBar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { regions } from "@/data/cabins";

const FloatingSearch = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("All Locations");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (region !== "All Locations") params.set("region", region);
    if (checkIn) params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    if (checkOut) params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    params.set("guests", guests.toString());
    navigate(`/cabins?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
      className="w-full max-w-3xl"
    >
      <div className="bg-accent rounded-full px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-1 shadow-lg w-full">
        {/* Region */}
        <div className="flex flex-col px-3 flex-1 min-w-0 border-b sm:border-b-0 sm:border-r border-accent-foreground/15 pb-2 sm:pb-0">
          <span className="font-satoshi text-[10px] font-bold uppercase tracking-widest text-accent-foreground/60">Region</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="font-satoshi text-sm font-medium text-accent-foreground bg-transparent w-full outline-none cursor-pointer -ml-1 pl-1"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="flex flex-col px-3 flex-1 min-w-0 border-b sm:border-b-0 sm:border-r border-accent-foreground/15 pb-2 sm:pb-0">
          <span className="font-satoshi text-[10px] font-bold uppercase tracking-widest text-accent-foreground/60">Check-in & Check-out</span>
          <div className="flex items-center gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <button className="font-satoshi text-sm font-medium text-accent-foreground bg-transparent outline-none cursor-pointer text-left hover:underline decoration-accent-foreground/30 underline-offset-2">
                  {checkIn ? format(checkIn, "d MMM yyyy") : "Select"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarUI
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <span className="text-accent-foreground/50 text-sm">→</span>
            <Popover>
              <PopoverTrigger asChild>
                <button className="font-satoshi text-sm font-medium text-accent-foreground bg-transparent outline-none cursor-pointer text-left hover:underline decoration-accent-foreground/30 underline-offset-2">
                  {checkOut ? format(checkOut, "d MMM yyyy") : "Select"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarUI
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < (checkIn || new Date())}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Guests */}
        <div className="flex flex-col px-3 flex-1 min-w-0 pb-2 sm:pb-0">
          <span className="font-satoshi text-[10px] font-bold uppercase tracking-widest text-accent-foreground/60">Guests</span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="font-satoshi text-sm font-medium text-accent-foreground bg-transparent w-full outline-none cursor-pointer -ml-1 pl-1"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground h-10 px-6 rounded-full font-satoshi font-medium text-sm tracking-wider hover:brightness-95 active:scale-[0.98] transition-all duration-200 flex-shrink-0"
        >
          Search
        </button>
      </div>
    </motion.div>
  );
};

export default FloatingSearch;

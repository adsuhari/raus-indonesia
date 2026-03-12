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
    <div className="sticky top-16 sm:top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
        >
          {/* Region */}
          <div className="flex items-center gap-2 bg-secondary rounded-lg h-10 px-3 flex-1 min-w-0">
            <MapPin size={15} className="text-muted-foreground flex-shrink-0" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="font-satoshi text-sm text-foreground bg-transparent w-full outline-none cursor-pointer"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Check-in */}
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(
                "flex items-center gap-2 bg-secondary rounded-lg h-10 px-3 flex-1 min-w-0 text-left",
                !checkIn && "text-muted-foreground"
              )}>
                <Calendar size={15} className="text-muted-foreground flex-shrink-0" />
                <span className="font-satoshi text-sm truncate">
                  {checkIn ? format(checkIn, "MMM d, yyyy") : "Check-in"}
                </span>
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

          {/* Check-out */}
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(
                "flex items-center gap-2 bg-secondary rounded-lg h-10 px-3 flex-1 min-w-0 text-left",
                !checkOut && "text-muted-foreground"
              )}>
                <Calendar size={15} className="text-muted-foreground flex-shrink-0" />
                <span className="font-satoshi text-sm truncate">
                  {checkOut ? format(checkOut, "MMM d, yyyy") : "Check-out"}
                </span>
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

          {/* Guests */}
          <div className="flex items-center gap-2 bg-secondary rounded-lg h-10 px-3 flex-1 min-w-0">
            <Users size={15} className="text-muted-foreground flex-shrink-0" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="font-satoshi text-sm text-foreground bg-transparent w-full outline-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
              ))}
            </select>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground h-10 px-5 rounded-full font-satoshi font-medium text-sm tracking-wider hover:brightness-95 active:scale-[0.98] transition-all duration-200 flex-shrink-0"
          >
            <Search size={15} />
            Search
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingSearch;

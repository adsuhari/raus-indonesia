import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Users, Check, ArrowLeft } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cabins } from "@/data/cabins";
import { toast } from "sonner";

const CabinDetail = () => {
  const { id } = useParams();
  const cabin = cabins.find((c) => c.id === id);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);

  const nights = useMemo(() => {
    if (checkIn && checkOut) return differenceInDays(checkOut, checkIn);
    return 0;
  }, [checkIn, checkOut]);

  const total = cabin ? nights * cabin.price : 0;

  if (!cabin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-28 text-center">
          <h1 className="font-satoshi font-bold text-2xl text-foreground">Cabin not found</h1>
          <Link to="/cabins" className="font-satoshi text-primary mt-4 inline-block">← Back to cabins</Link>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }
    toast.success(`Booking confirmed! ${cabin.name} for ${nights} night${nights > 1 ? 's' : ''}, ${guests} guest${guests > 1 ? 's' : ''}. Total: $${total}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/cabins" className="inline-flex items-center gap-1 font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={14} /> Back to cabins
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                  <img src={cabin.images[0]} alt={cabin.name} className="w-full h-full object-cover image-outline" />
                </div>

                <h1 className="font-satoshi font-bold text-3xl sm:text-4xl text-foreground mt-8">
                  {cabin.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin size={14} /> {cabin.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    <Star size={14} className="fill-accent text-accent" />
                    {cabin.rating} ({cabin.reviews} reviews)
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users size={14} /> up to {cabin.capacity} guests
                  </div>
                </div>

                <p className="font-satoshi text-base text-muted-foreground mt-6 leading-relaxed max-w-[65ch]">
                  {cabin.description}
                </p>

                <h3 className="font-satoshi font-bold text-lg text-foreground mt-8">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {cabin.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-foreground">
                      <Check size={14} className="text-primary" /> {a}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Booking sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl card-shadow p-6 sticky top-24">
                <p className="font-satoshi font-bold text-2xl text-foreground">
                  ${cabin.price}<span className="font-normal text-muted-foreground text-sm"> / night</span>
                </p>

                <div className="mt-6 space-y-3">
                  {/* Check-in */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn(
                        "w-full flex items-center gap-2 bg-secondary rounded-lg h-11 px-4 text-left",
                        !checkIn && "text-muted-foreground"
                      )}>
                        <span className="font-satoshi text-sm">
                          {checkIn ? `Check-in: ${format(checkIn, "MMM d, yyyy")}` : "Select check-in"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
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
                        "w-full flex items-center gap-2 bg-secondary rounded-lg h-11 px-4 text-left",
                        !checkOut && "text-muted-foreground"
                      )}>
                        <span className="font-satoshi text-sm">
                          {checkOut ? `Check-out: ${format(checkOut, "MMM d, yyyy")}` : "Select check-out"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
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
                  <div className="flex items-center gap-2 bg-secondary rounded-lg h-11 px-4">
                    <Users size={15} className="text-muted-foreground" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="font-satoshi text-sm text-foreground bg-transparent w-full outline-none cursor-pointer"
                    >
                      {Array.from({ length: cabin.capacity }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {nights > 0 && (
                  <div className="mt-5 space-y-2 text-sm font-satoshi">
                    <div className="flex justify-between text-muted-foreground">
                      <span>${cabin.price} × {nights} night{nights > 1 ? 's' : ''}</span>
                      <span>${total}</span>
                    </div>
                    <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBook}
                  className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground h-12 rounded-full font-satoshi font-medium text-sm tracking-wider hover:brightness-95 active:scale-[0.98] transition-all duration-200"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CabinDetail;

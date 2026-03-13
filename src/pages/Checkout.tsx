import { useState, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Users, Check, Mail, Phone, User, MessageSquare } from "lucide-react";
import { format, differenceInDays, parseISO } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cabins } from "@/data/cabins";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const steps = [
  { number: 1, label: "Summary" },
  { number: 2, label: "Your Details" },
  { number: 3, label: "Confirmation" },
];

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const cabinId = searchParams.get("cabin") || "";
  const checkInStr = searchParams.get("checkIn") || "";
  const checkOutStr = searchParams.get("checkOut") || "";
  const guestsParam = Number(searchParams.get("guests")) || 2;

  const cabin = cabins.find((c) => c.id === cabinId);
  const checkIn = checkInStr ? parseISO(checkInStr) : undefined;
  const checkOut = checkOutStr ? parseISO(checkOutStr) : undefined;
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const total = cabin ? nights * cabin.price : 0;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.phone.trim().length > 0
    );
  }, [form]);

  if (!cabin || !checkIn || !checkOut || nights <= 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 pt-28 text-center">
          <h1 className="font-satoshi font-bold text-2xl text-foreground">Booking details missing</h1>
          <p className="font-satoshi text-muted-foreground mt-2">
            Please select a cabin, dates, and guests to proceed with booking.
          </p>
          <Link
            to="/cabins"
            className="inline-flex items-center gap-2 mt-6 bg-primary text-primary-foreground h-11 px-6 rounded-full font-satoshi font-medium text-sm hover:brightness-95 transition-all"
          >
            Browse Cabins
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      // Save booking to database
      const { error: dbError } = await supabase.from("bookings").insert({
        cabin_id: cabin!.id,
        cabin_name: cabin!.name,
        check_in: checkInStr,
        check_out: checkOutStr,
        guests: guestsParam,
        nights,
        total_price: total,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim() || null,
      });

      if (dbError) throw dbError;

      // Send notification via edge function
      const { error: fnError } = await supabase.functions.invoke("send-booking-notification", {
        body: {
          cabinId: cabin!.id,
          cabinName: cabin!.name,
          checkIn: checkInStr,
          checkOut: checkOutStr,
          guests: guestsParam,
          nights,
          totalPrice: total,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim() || undefined,
        },
      });

      if (fnError) console.error("Notification error:", fnError);

      setStep(3);
      toast.success("Booking request sent! We'll get back to you soon.");
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            to={`/cabins/${cabin.id}`}
            className="inline-flex items-center gap-1 font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Back to {cabin.name}
          </Link>

          {/* Step indicator */}
          <div className="flex items-center justify-end gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.number} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-satoshi font-bold transition-colors ${
                    step >= s.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > s.number ? <Check size={14} /> : s.number}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px ${step > s.number ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Booking summary bar */}
          <div className="bg-card rounded-xl card-shadow px-5 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-satoshi mb-8">
            <span className="font-bold text-foreground">{cabin.name}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar size={13} />
              {format(checkIn, "MMM d")} – {format(checkOut, "MMM d, yyyy")}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Users size={13} />
              {guestsParam} {guestsParam === 1 ? "Guest" : "Guests"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Summary */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Cabin card */}
                <div className="bg-card rounded-2xl card-shadow overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto bg-muted">
                      <img
                        src={cabin.images[0]}
                        alt={cabin.name}
                        className="w-full h-full object-cover image-outline"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <h2 className="font-satoshi font-bold text-xl text-foreground">{cabin.name}</h2>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin size={13} /> {cabin.location}
                      </p>
                      <p className="font-satoshi text-sm text-muted-foreground mt-3 leading-relaxed">
                        {cabin.shortDescription}
                      </p>
                      <p className="font-satoshi font-bold text-2xl text-foreground mt-4">
                        ${total}
                        <span className="font-normal text-sm text-muted-foreground ml-1">total</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rate info */}
                <div className="mt-8">
                  <h3 className="font-satoshi font-bold text-lg text-foreground">Booking Rate</h3>
                  <div className="mt-4 bg-card rounded-xl card-shadow p-5 border-2 border-primary">
                    <div className="flex items-center justify-between">
                      <h4 className="font-satoshi font-bold text-foreground">Flexible Rate</h4>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">per stay</p>
                        <p className="font-satoshi font-bold text-lg text-foreground">${total}</p>
                      </div>
                    </div>
                    <p className="font-satoshi text-sm text-muted-foreground mt-2">
                      Prefer to stay flexible?
                    </p>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        Free cancellation up to 14 days before check-in
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        Cancel 14–7 days before: 50% refund
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        From 7 days out, your booking is confirmed
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="mt-8 space-y-3 text-sm font-satoshi">
                  <div className="flex justify-between text-muted-foreground">
                    <span>${cabin.price} × {nights} night{nights > 1 ? "s" : ""}</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between font-bold text-foreground pt-3 border-t border-border text-base">
                    <span>Total (incl. tax)</span>
                    <span>${total}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 bg-accent/10 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-satoshi font-medium">Total</p>
                    <p className="font-satoshi font-bold text-2xl text-foreground">${total}</p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground h-12 px-8 rounded-full font-satoshi font-medium text-sm tracking-wider hover:brightness-95 active:scale-[0.98] transition-all duration-200"
                  >
                    Continue to Details <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h2 className="font-satoshi font-bold text-xl text-foreground">Your Details</h2>
                <p className="font-satoshi text-sm text-muted-foreground mt-1">
                  Please provide your contact information so we can confirm your booking.
                </p>

                <div className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-satoshi text-sm text-foreground flex items-center gap-1.5">
                        <User size={14} className="text-muted-foreground" /> First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        placeholder="John"
                        className="bg-secondary border-none h-11 font-satoshi"
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-satoshi text-sm text-foreground flex items-center gap-1.5">
                        <User size={14} className="text-muted-foreground" /> Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        placeholder="Doe"
                        className="bg-secondary border-none h-11 font-satoshi"
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-satoshi text-sm text-foreground flex items-center gap-1.5">
                      <Mail size={14} className="text-muted-foreground" /> Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="bg-secondary border-none h-11 font-satoshi"
                      maxLength={255}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-satoshi text-sm text-foreground flex items-center gap-1.5">
                      <Phone size={14} className="text-muted-foreground" /> Phone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+62 812 3456 7890"
                      className="bg-secondary border-none h-11 font-satoshi"
                      maxLength={30}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-satoshi text-sm text-foreground flex items-center gap-1.5">
                      <MessageSquare size={14} className="text-muted-foreground" /> Special Requests
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Any dietary needs, arrival time, or special requests..."
                      className="bg-secondary border-none font-satoshi min-h-[100px]"
                      maxLength={1000}
                    />
                  </div>
                </div>

                {/* Price + actions */}
                <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft size={14} /> Back to Summary
                  </button>

                  <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground font-satoshi">Total</p>
                      <p className="font-satoshi font-bold text-xl text-foreground">${total}</p>
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid || submitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground h-12 px-8 rounded-full font-satoshi font-medium text-sm tracking-wider hover:brightness-95 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {submitting ? "Sending..." : "Submit Booking Request"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Confirmation */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Check size={28} className="text-primary" />
                </div>
                <h2 className="font-satoshi font-bold text-2xl text-foreground">Booking Request Received!</h2>
                <p className="font-satoshi text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
                  Thank you, {form.firstName}! We've received your booking request for{" "}
                  <strong>{cabin.name}</strong> ({format(checkIn, "MMM d")} – {format(checkOut, "MMM d, yyyy")}).
                  We'll review your request and send payment details to{" "}
                  <strong>{form.email}</strong> shortly.
                </p>

                <div className="bg-card rounded-xl card-shadow p-5 mt-8 max-w-sm mx-auto text-left text-sm font-satoshi space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cabin</span>
                    <span className="text-foreground font-medium">{cabin.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dates</span>
                    <span className="text-foreground">{format(checkIn, "MMM d")} – {format(checkOut, "MMM d")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guests</span>
                    <span className="text-foreground">{guestsParam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nights</span>
                    <span className="text-foreground">{nights}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${total}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground h-11 px-6 rounded-full font-satoshi font-medium text-sm hover:brightness-95 transition-all"
                  >
                    Back to Home
                  </Link>
                  <Link
                    to="/cabins"
                    className="inline-flex items-center justify-center gap-2 bg-secondary text-foreground h-11 px-6 rounded-full font-satoshi font-medium text-sm hover:brightness-95 transition-all"
                  >
                    Browse More Cabins
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;

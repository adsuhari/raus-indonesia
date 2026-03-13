import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface BookingPayload {
  cabinId: string;
  cabinName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalPrice: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingPayload = await req.json();

    // Validate required fields
    if (!booking.firstName || !booking.lastName || !booking.email || !booking.phone || !booking.cabinId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log the booking for now — owner notification
    console.log("=== NEW BOOKING REQUEST ===");
    console.log(`Cabin: ${booking.cabinName} (${booking.cabinId})`);
    console.log(`Dates: ${booking.checkIn} to ${booking.checkOut} (${booking.nights} nights)`);
    console.log(`Guests: ${booking.guests}`);
    console.log(`Total: $${booking.totalPrice}`);
    console.log(`Guest: ${booking.firstName} ${booking.lastName}`);
    console.log(`Email: ${booking.email}`);
    console.log(`Phone: ${booking.phone}`);
    if (booking.message) console.log(`Message: ${booking.message}`);
    console.log("==========================");

    return new Response(
      JSON.stringify({ success: true, message: "Booking request received" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error processing booking:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

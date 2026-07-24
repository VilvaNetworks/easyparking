import { redirect } from "next/navigation";

// Consolidated into /standard-operating-procedure. Kept as a redirect so
// bookmarked or indexed links to /booking-process continue to resolve.
export default function BookingProcessPage() {
  redirect("/standard-operating-procedure");
}

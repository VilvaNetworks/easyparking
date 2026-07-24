import { redirect } from "next/navigation";

// Consolidated into /terms-and-conditions. Kept as a redirect so
// bookmarked or indexed links to /booking-terms-and-conditions continue
// to resolve.
export default function BookingTermsAndConditionsPage() {
  redirect("/terms-and-conditions");
}

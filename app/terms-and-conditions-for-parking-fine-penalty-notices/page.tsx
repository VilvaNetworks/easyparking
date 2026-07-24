import { redirect } from "next/navigation";

// Consolidated into /terms-and-conditions. Kept as a redirect so
// bookmarked or indexed links to
// /terms-and-conditions-for-parking-fine-penalty-notices continue to
// resolve.
export default function ParkingFinePenaltyPage() {
  redirect("/terms-and-conditions");
}

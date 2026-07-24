import { redirect } from "next/navigation";

// Consolidated into /terms-and-conditions. Kept as a redirect so
// bookmarked or indexed links to /terms-and-conditions-for-complaints-claims
// continue to resolve.
export default function ComplaintsClaimsPage() {
  redirect("/terms-and-conditions");
}

import { redirect } from "next/navigation";

// This page has been consolidated into /standard-operating-procedure
// (departure/arrival sections) and /terms-and-conditions (cancellations
// & refund policy section). Kept as a redirect so bookmarked or indexed
// links to /general-information continue to resolve.
export default function GeneralInformationPage() {
  redirect("/standard-operating-procedure");
}

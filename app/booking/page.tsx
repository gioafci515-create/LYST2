import type { Metadata } from "next";
import BookingWizard from "./BookingWizard";

export const metadata: Metadata = {
  title: "კონსულტაციის დაჯავშნა — LYST",
  description: "დაჯავშნე კონსულტაცია LYST-ის გუნდთან შენი ღონისძიების დასაგეგმად.",
};

export default function BookingPage() {
  return <BookingWizard />;
}

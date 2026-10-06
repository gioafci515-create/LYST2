import type { Metadata } from "next";
import CreateWizard from "./CreateWizard";

export const metadata: Metadata = {
  title: "ახალი მოსაწვევი — LYST",
  description: "შექმენი ციფრული მოსაწვევი 5 მარტივ ნაბიჯში.",
};

export default function CreatePage() {
  return <CreateWizard />;
}

import BottomNavigation from "@/components/BottomNavigation";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow bg-background p-4 pb-20">{children}</main>{" "}
      {/* Add padding-bottom for nav */}
      <BottomNavigation />
      <Toaster />
    </div>
  );
}

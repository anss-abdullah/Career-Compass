import { Compass } from "lucide-react";
import type React from "react";

const AppLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-xl font-semibold text-primary">
      <Compass className="h-6 w-6" />
      <span>CareerCompass</span>
    </div>
  );
};

export default AppLogo;

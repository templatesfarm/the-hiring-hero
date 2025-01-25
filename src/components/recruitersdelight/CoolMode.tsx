import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/ui/cool-mode";

export function CoolModeDemo() {
  return (
    <div className="relative justify-center">
      <CoolMode>
        <Button>Click Me!</Button>
      </CoolMode>
    </div>
  );
}

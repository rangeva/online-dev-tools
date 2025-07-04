
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";

const EmptyState = () => {
  return (
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <div className="text-center text-muted-foreground">
          <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Enter a city name, US state, or select from popular locations to get timezone information.</p>
          <p className="text-sm mt-1">Now supports all 50 US states, major cities worldwide, and international locations.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;

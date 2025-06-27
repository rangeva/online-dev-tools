
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LayerPanelProps {
  // This would be expanded in a full implementation
}

export const LayerPanel = ({}: LayerPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Layers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded border">
          Layer 1 (Active)
        </div>
        <Button variant="outline" size="sm" className="w-full">
          + Add Layer
        </Button>
      </CardContent>
    </Card>
  );
};

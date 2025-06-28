
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PaintingToolHeader } from "./PaintingToolHeader";

interface PaintingToolLayoutProps {
  toolbar: ReactNode;
  panels: ReactNode;
  canvas: ReactNode;
  dialogs?: ReactNode;
}

export const PaintingToolLayout = ({ toolbar, panels, canvas, dialogs }: PaintingToolLayoutProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card>
        <PaintingToolHeader />
        <CardContent className="space-y-6">
          {/* Toolbar */}
          {toolbar}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tool Panels */}
            <div className="lg:col-span-1 space-y-4">
              {panels}
            </div>

            {/* Canvas Area */}
            <div className="lg:col-span-3">
              {canvas}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {dialogs}
    </div>
  );
};

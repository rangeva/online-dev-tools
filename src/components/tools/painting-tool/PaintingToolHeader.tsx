
import { CardHeader, CardTitle } from "@/components/ui/card";

export const PaintingToolHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        Painting & Drawing Tool
      </CardTitle>
    </CardHeader>
  );
};

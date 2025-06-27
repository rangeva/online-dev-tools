
import { useState } from "react";
import { Position } from "./usePaintingTool";

export const useShapeHandling = () => {
  const [shapeStartPosition, setShapeStartPosition] = useState<Position | null>(null);

  return {
    shapeStartPosition,
    setShapeStartPosition
  };
};

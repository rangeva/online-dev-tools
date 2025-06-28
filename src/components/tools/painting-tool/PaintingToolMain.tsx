
import { usePaintingToolState } from "./PaintingToolState";
import { usePaintingToolHandlers } from "./PaintingToolHandlers";
import { PaintingToolLayout } from "./PaintingToolLayout";

export const PaintingToolMain = () => {
  const state = usePaintingToolState();
  const handlers = usePaintingToolHandlers(state);

  return <PaintingToolLayout state={state} handlers={handlers} />;
};

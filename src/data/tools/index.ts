
import { textTools } from "./textTools";
import { htmlTools } from "./htmlTools";
import { encodingTools } from "./encodingTools";
import { convertorTools } from "./convertorTools";
import { dateTools } from "./dateTools";
import { dataTools } from "./dataTools";
import { securityTools } from "./securityTools";
import { generatorTools } from "./generatorTools";
import { graphicsTools } from "./graphicsTools";

export const allTools = [
  ...textTools,
  ...htmlTools,
  ...encodingTools,
  ...convertorTools,
  ...dateTools,
  ...dataTools,
  ...securityTools,
  ...generatorTools,
  ...graphicsTools
];

export {
  textTools,
  htmlTools,
  encodingTools,
  convertorTools,
  dateTools,
  dataTools,
  securityTools,
  generatorTools,
  graphicsTools
};

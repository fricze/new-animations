import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import motion_layout from "./scenes/motion_layout?scene";
import rects from "./scenes/rects?scene";

import { Code, LezerHighlighter } from "@motion-canvas/2d";
import { parser } from "@lezer/javascript";

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [motion_layout],
});

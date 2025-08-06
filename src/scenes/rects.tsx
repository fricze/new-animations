import { makeScene2D, Code, Rect, Layout, Node, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";
import { PlopSpring, SmoothSpring, spring } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const rect = createRef<Rect>();
  const txt = createRef<Txt>();

  view.add(
    <Rect
      fill={"#242424"}
      ref={rect}
      width={800}
      height={100}
      y={-300}
      radius={4}
      x={0}
      stroke={"#ffffff"}
      lineWidth={2}
      offsetY={-1}
    />,
  );

  view.add(
    <Txt
      fontSize={20}
      fill={"#242424"}
      ref={txt}
      x={-200}
      y={-200}
      offsetY={-1}
      offsetX={-1}
    >
      Hello guys
    </Txt>,
  );

  yield* spring(SmoothSpring, 0, 400, 1, (value) => {
    rect().height(value);
  });

  yield* rect().fill("#848484", 0.6);

  yield* spring(PlopSpring, 20, 60, 1, (value) => {
    txt().fontSize(value);
  });
});

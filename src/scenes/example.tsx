import { makeScene2D, Code, Rect, Layout, Node, Txt } from "@motion-canvas/2d";
import { all, createRef, waitFor } from "@motion-canvas/core";

const cssCodeContent = `\
#box {
  height: 0;

  .opened & {
    height: auto;
  }
}`;

const cssStep1 = `\
.box {
  height: 0;

  .opened & {
    height: auto;
  }
}`;

const cssStep2 = `\
.container {
  display: flex;
  align-items: start;
}`;

const cssStep3 = `\
.container {
  display: flex;
  align-items: start;

  &.active {
    align-items: normal;
  }
}`;

const cssStep4 = `\
.active {
  .box:first-child {
    order: 2;
  }
  .box:nth-child(2) {
    order: 1;
  }
}`;

export default makeScene2D(function* (view) {
  const jsCode = createRef<Code>();
  const cssCode = createRef<Code>();

  view.add(
    <Txt
      fill="#fff"
      fontWeight={600}
      fontSize={28}
      offsetX={-1}
      x={-400}
      y={-670}
    >
      JS
    </Txt>,
  );

  view.add(
    <Txt
      fill="#fff"
      fontWeight={600}
      fontSize={28}
      offsetX={-1}
      x={-400}
      y={-290}
    >
      CSS
    </Txt>,
  );

  view.add(
    <Code
      offsetX={-1}
      x={-400}
      y={-110}
      ref={cssCode}
      minHeight={300}
      fontSize={28}
      code={cssCodeContent}
    />,
  );

  view.add(
    <Code
      ref={jsCode}
      fontSize={28}
      offsetX={-1}
      minHeight={400}
      stroke={"#ffffff"}
      lineWidth={2}
      x={-400}
      y={-440}
      code={`\
const element = document.querySelector("#box");`}
    />,
  );

  const rect = createRef<Rect>();

  view.add(
    <Rect
      fill={"#242424"}
      ref={rect}
      width={800}
      height={0}
      y={60}
      radius={4}
      x={0}
      stroke={"#ffffff"}
      lineWidth={2}
    />,
  );

  const step1 = `\
const element = document.querySelector("#box");
const state = Flip.getState(element);`;

  const step2 = `\
const element = document.querySelector("#box");
const state = Flip.getState(element);

group.classList.toggle("opened");`;

  const step3 = `\
const element = document.querySelector("#box");
const state = Flip.getState(element);

group.classList.toggle("opened");

Flip.from(state, {
  duration: 0.6,
});`;

  yield* all(jsCode().code(step1, 0.6));
  yield* all(jsCode().code(step2, 0.6));
  yield* all(jsCode().code(step3, 0.6));

  yield* all(rect().height(300, 0.6), rect().y(60 + 150, 0.6));
  yield* waitFor(0.6);

  const step4 = `\
const element = document.querySelector(".box");
const state = Flip.getState(element);`;

  const rect2 = createRef<Rect>();
  view.add(
    <Rect
      fill={"#242424"}
      ref={rect2}
      width={800}
      height={0}
      y={600}
      radius={4}
      x={0}
      stroke={"#ffffff"}
      lineWidth={2}
    />,
  );

  const rect3 = createRef<Rect>();
  view.add(
    <Rect
      fill={"#242424"}
      ref={rect3}
      width={800}
      height={0}
      y={600}
      radius={4}
      x={0}
      stroke={"#ffffff"}
      lineWidth={2}
    />,
  );

  yield* all(
    jsCode().code(step4, 0.6),
    cssCode().code(cssStep1, 0.6),
    rect().height(0, 0.6),
    rect().y(60, 0.6),
    rect2().y(120, 0.6),
    rect3().y(180, 0.6),
  );

  const step5 = `\
const element = document.querySelector(".box");
const state = Flip.getState(element);

group.classList.toggle("opened");

Flip.from(state, {
  duration: 0.6,
});`;

  yield* all(jsCode().code(step5, 0.6));

  yield* all(
    rect().height(30, 0.6),
    rect().y(90, 0.6),
    rect2().height(80, 0.6),
    rect2().y(200, 0.6),
    rect3().height(50, 0.6),
    rect3().y(320, 0.6),
  );

  yield* waitFor(1.2);

  const step6 = `\
const element = document.querySelector(".box");`;

  const step7 = `\
const element = document.querySelector(".box");
const container = document.querySelector(".container");
const state = Flip.getState(element);

container.classList.toggle("active");`;

  const step8 = `\
const element = document.querySelector(".box");
const container = document.querySelector(".container");
const state = Flip.getState(element);

container.classList.toggle("active");

Flip.from(state, {
  duration: 0.6,
});`;

  yield* all(
    jsCode().code(step6, 0.6),
    cssCode().code(cssStep2, 0.6),
    rect().width(100, 0.6),
    rect().height(140, 0.6),
    rect().x(-350, 0.6),
    rect().y(140, 0.6),
    rect2().height(80, 0.6),
    rect2().width(600, 0.6),
    rect2().x(100, 0.6),
    rect2().y(110, 0.6),
    rect3().height(170, 0.6),
    rect3().y(350, 0.6),
  );

  yield* all(cssCode().code(cssStep3, 0.6));

  yield* all(jsCode().code(step7, 0.6));
  yield* all(jsCode().code(step8, 0.6));

  yield* all(
    rect().y(180, 0.6),
    rect().height(220, 0.6),
    rect2().y(180, 0.6),
    rect2().height(220, 0.6),
    rect3().height(220, 0.6),
    rect3().y(380, 0.6),
  );

  yield* rect().fill("#999", 0.6);

  yield* all(cssCode().code(cssStep4, 0.6));

  yield* all(rect().x(350, 0.6), rect2().x(-100, 0.6));

  yield* waitFor(1.2);

  yield* all(
    rect().height(0, 0.6),
    rect2().height(0, 0.6),
    rect3().height(0, 0.6),
  );

  yield* waitFor(1.2);
});

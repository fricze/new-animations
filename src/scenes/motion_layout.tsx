import {
  LezerHighlighter,
  makeScene2D,
  Code,
  Rect,
  Layout,
  Node,
  Txt,
} from "@motion-canvas/2d";
import { all, chain, createRef, Vector2, waitFor } from "@motion-canvas/core";

import { parser } from "@lezer/javascript";

const JsxHighlighter = new LezerHighlighter(parser);

const cssCodeArr = [
  `\
:root {
  /* adjust size to your liking */
  --toggle-width: 200px;
  --toggle-height: calc(var(--toggle-width) * 0.5);
  --handle-size: calc(var(--toggle-width) * 0.3);
}`,
  `\
:root {
  /* adjust size to your liking */
  --toggle-width: 200px;
  --toggle-height: calc(var(--toggle-width) * 0.5);
  --handle-size: calc(var(--toggle-width) * 0.3);
}

.toggle-container {
  display: flex;
  border: 1px solid blueviolet;
}`,
  `\
:root {
  /* adjust size to your liking */
  --toggle-width: 200px;
  --toggle-height: calc(var(--toggle-width) * 0.5);
  --handle-size: calc(var(--toggle-width) * 0.3);
}

.toggle-container {
  display: flex;
  border: 1px solid blueviolet;
  width: var(--toggle-width);
  height: var(--toggle-height);
}`,
  `\
:root {
  /* adjust size to your liking */
  --toggle-width: 200px;
  --toggle-height: calc(var(--toggle-width) * 0.5);
  --handle-size: calc(var(--toggle-width) * 0.3);
}

.toggle-container {
  display: flex;
  border: 1px solid blueviolet;
  width: var(--toggle-width);
  height: var(--toggle-height);
  border-radius: 50px;
  padding: 20px;
  background: #8a2be229;
}`,
  `\
:root {
  /* adjust size to your liking */
  --toggle-width: 200px;
  --toggle-height: calc(var(--toggle-width) * 0.5);
  --handle-size: calc(var(--toggle-width) * 0.3);
}

.toggle-container {
  display: flex;
  border: 1px solid blueviolet;
  width: var(--toggle-width);
  height: var(--toggle-height);
  border-radius: 50px;
  padding: 20px;
  background: #8a2be229;

  &:focus {
    outline: none;
  }
}`,

  `\
:root {
  /* adjust size to your liking */
  --toggle-width: 200px;
  --toggle-height: calc(var(--toggle-width) * 0.5);
  --handle-size: calc(var(--toggle-width) * 0.3);
}

.toggle-container {
  display: flex;
  border: 1px solid blueviolet;
  width: var(--toggle-width);
  height: var(--toggle-height);
  border-radius: 50px;
  padding: 20px;
  background: #8a2be229;

  &:focus {
    outline: none;
  }
}

.toggle-handle {
  width: var(--handle-size);
  height: var(--handle-size);
}`,

  `\
:root {
  /* adjust size to your liking */
  --toggle-width: 200px;
  --toggle-height: calc(var(--toggle-width) * 0.5);
  --handle-size: calc(var(--toggle-width) * 0.3);
}

.toggle-container {
  display: flex;
  border: 1px solid blueviolet;
  width: var(--toggle-width);
  height: var(--toggle-height);
  border-radius: 50px;
  padding: 20px;
  background: #8a2be229;

  &:focus {
    outline: none;
  }
}

.toggle-handle {
  width: var(--handle-size);
  height: var(--handle-size);
  background-color: #9911ff;
  border-radius: 50%;
}`,
];

export default makeScene2D(function* (view) {
  const jsxCode = createRef<Code>();
  const title = createRef<Txt>();
  const cssCode = createRef<Code>();

  view.add(
    <Txt
      fill="#fff"
      fontWeight={600}
      ref={title}
      fontSize={28}
      offsetX={-1}
      x={-400}
      y={-670}
    >
      JSX
    </Txt>,
  );

  // view.add(
  //   <Txt
  //     fill="#fff"
  //     fontWeight={600}
  //     fontSize={28}
  //     offsetX={-1}
  //     x={-400}
  //     y={-290}
  //   >
  //     CSS
  //   </Txt>,
  // );

  // view.add(
  //   <Code
  //     offsetX={-1}
  //     x={-400}
  //     y={-110}
  //     ref={cssCode}
  //     minHeight={300}
  //     fontSize={28}
  //     code={cssCodeContent}
  //   />,
  // );

  view.add(
    <Code
      ref={jsxCode}
      fontSize={28}
      offsetX={-1}
      offsetY={-1}
      height={800}
      stroke={"#ffffff"}
      alignContent={"start"}
      highlighter={JsxHighlighter}
      lineWidth={2}
      x={-400}
      y={-600}
      code={`\
import { useState } from "react";
import * as motion from "motion/react-client";

export default function LayoutAnimation() {
  const [isOn, setIsOn] = useState(false);

  return ();
}
`}
    />,
  );

  const step1 = `\
import { useState } from "react";
import * as motion from "motion/react-client";

export default function LayoutAnimation() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      className="toggle-container"
      onClick={() => setIsOn(!isOn)}
    ></button>
  );
}`;

  const step2 = `\
import { useState } from "react";
import * as motion from "motion/react-client";

export default function LayoutAnimation() {
  const [isOn, setIsOn] = useState(false);
  const justifyContent =
    "flex-" + (isOn ? "start" : "end");

  return (
    <button
      className="toggle-container"
      style={{ justifyContent }}
      onClick={() => setIsOn(!isOn)}
    >
    </button>
  );
}`;

  const step3 = `\
import { useState } from "react";
import * as motion from "motion/react-client";

export default function LayoutAnimation() {
  const [isOn, setIsOn] = useState(false);
  const justifyContent =
    "flex-" + (isOn ? "start" : "end");

  return (
    <button
      className="toggle-container"
      style={{ justifyContent }}
      onClick={() => setIsOn(!isOn)}
    >
      <motion.div
        className="toggle-handle"
      />
    </button>
  );
}`;

  const step4 = `\
import { useState } from "react";
import * as motion from "motion/react-client";

export default function LayoutAnimation() {
  const [isOn, setIsOn] = useState(false);
  const justifyContent =
    "flex-" + (isOn ? "start" : "end");

  return (
    <button
      className="toggle-container"
      style={{ justifyContent }}
      onClick={() => setIsOn(!isOn)}
    >
      <motion.div
        className="toggle-handle"
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  );
}`;

  const step5 = `\
import { useState } from "react";
import * as motion from "motion/react-client";

export default function LayoutAnimation() {
  const [isOn, setIsOn] = useState(false);
  const justifyContent =
    "flex-" + (isOn ? "start" : "end");

  return (
    <button
      className="toggle-container"
      style={{ justifyContent }}
      onClick={() => setIsOn(!isOn)}
    >
      <motion.div
        className="toggle-handle"
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  );
}`;

  yield* all(jsxCode().code(step1, 0.6));
  yield* waitFor(1);
  yield* all(jsxCode().code(step2, 0.6));
  yield* waitFor(1);
  yield* all(jsxCode().code(step3, 0.6));
  yield* waitFor(1);
  yield* all(jsxCode().code(step4, 0.6));
  yield* waitFor(1);
  yield* all(jsxCode().code(step5, 0.6));

  yield* waitFor(1.2);

  yield* title().remove();

  view.add(
    <Txt
      fill="#fff"
      fontWeight={600}
      fontSize={28}
      offsetX={-1}
      x={-400}
      y={-670}
    >
      CSS
    </Txt>,
  );

  for (const step in cssCode) {
    yield* all(jsxCode().code(step, 0.6));
    yield* waitFor(1);
  }

  const generators = [];
  for (const step of cssCodeArr) {
    // No yield here, just store the generators.
    generators.push(jsxCode().code(step, 0.6));
    generators.push(waitFor(1));
  }

  // Run all of the generators.
  yield* chain(...generators);

  yield* waitFor(1.2);
  // yield* all(jsxCode().code(step5, 0.6));
});

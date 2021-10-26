import { createSignal, mergeProps } from "solid-js";

function Circle(props) {
  props = mergeProps({ diameter: 100, thickness: 10 }, props);

  const radius = () => props.diameter / 2;
  const innerRadius = () => {
    const r = radius();
    let ir = r - props.thickness;
    ir = ir > 0 ? ir : 0;
    props.setInertia?.(Math.PI * (Math.pow(r, 4) - Math.pow(ir, 4)) / 4);
    return r > 0 ? 50 * ir / r : 0;
  }

  return (
    <svg width="100" height="100">
      <mask id="hole">
        <rect
          width="100%"
          height="100%"
          fill="white"
        />
        <circle
          cx="50%"
          cy="50%"
          r={innerRadius().toString() + "%"}
          fill="black"
        />
      </mask>
      <circle
        cx="50%"
        cy="50%"
        r="50%"
        fill="black"
        mask={innerRadius() > 0 ? "url(#hole)" : ""}
        mask="url(#hole)"
      />
    </svg>
  );
}

export default Circle;

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
    ;
  }

  return (
    <svg width="100" height="100">
      <circle
        cx="50%"
        cy="50%"
        r="50%"
        fill="red"
      //mask={thickness() > 0 ? "url(#hole)" : ""}
      //       mask="url(#hole)"
      />
      <circle
        cx="50%"
        cy="50%"
        r={innerRadius().toString() + "%"}
        fill="white"
      />
    </svg>
  );
}

function Slider(props) {
  props = mergeProps({ max: 100, min: 0 }, props);

  const [maxVal, setMaxVal] = createSignal(props.max);
  const [minVal, setMinVal] = createSignal(props.min);

  function setVal(v) {
    const val = parseFloat(v);
    if (isNaN(val)) return;
    if (val > maxVal()) setMaxVal(val);
    if (val < minVal()) setMinVal(val);
    props.setValue(val);
  }
  return (
    <>
      <span class="inline-block">
        <span class="font-bold text-right inline-block w-20 m-2">{props.name}:</span>
        <input
          class="text-left font-semibold w-10 hover:bg-gray-300"
          type="text"
          value={props.value}
          onInput={(e) => setVal(e.currentTarget.value)}
        />
      </span>
      <span class="inline-block">
        <span class="font-normal m-2">{minVal()}</span>
        <input
          class=""
          type="range"
          min={minVal()}
          max={maxVal()}
          value={props.value}
          oninput={(e) => setVal(e.currentTarget.value)}
        />
        <span>{maxVal()}</span>
      </span>
    </>
  );
}

function DynamicCircle(props) {
  const [diameter, setDiameter] = createSignal(50);
  const [thickness, setThickness] = createSignal(5);
  const [inertia, setInertia] = createSignal(0);
  return (<>
    <Circle diameter={diameter()} thickness={thickness()} setInertia={setInertia} />
    <Slider name="diameter" value={diameter()} setValue={setDiameter} />
    <br />
    <Slider name="thickness" value={thickness()} setValue={setThickness} />
    <br />
    <span class="inline-block">
      <span class="font-bold text-right inline-block w-20 m-2">inertia:</span>
      <span>{Math.round(inertia() * 100) / 100}</span>
    </span>
  </>);
}

function App() {
  return (
    <>
      <div class="flex h-screen">
        <div class="m-auto">
          <DynamicCircle />
        </div>
      </div>
    </>);
}

export default App;

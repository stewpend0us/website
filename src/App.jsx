import { createMemo, createSignal, mergeProps } from "solid-js";
import Circle from "./Shapes";

function Slider(props, counts = 1) {
  props = mergeProps({ max: 100, min: 0, counts: 10 }, props);

  function setVal(v, counts = 1) {
    const val = parseFloat(v) / counts;
    if (isNaN(val)) {
      console.log("got nan");
      return;
    }
    if (val > props.max) props.setMax?.(val);
    if (val < props.min) props.setMin?.(val);
    props.setValue(val);
  }

  return (
    <>
      <span class="align-middle text-right pr-2 font-bold">{props.name}:</span>
      <input
        class="align-middle text-center font-semibold hover:bg-gray-300"
        type="text"
        value={Math.round(props.value*props.counts)/props.counts}
        onInput={(e) => setVal(e.currentTarget.value)}
      />
      <span class="align-middle text-right pr-2 font-normal">{props.min}</span>
      <input
        type="range"
        min={props.min * props.counts}
        max={props.max * props.counts}
        value={props.value * props.counts}
        oninput={e => setVal(e.currentTarget.value, props.counts)}
      />
      <span class="align-middle text-left pl-2 font-normal">{props.max}</span>
    </>
  );
}

function DynamicCircle(props) {
  const [diameter, setDiameter] = createSignal(6);
  const [maxDiameter, setMaxDiameter] = createSignal(12);
  const [thickness, setThickness] = createSignal(1);
  const [inertia, setInertia] = createSignal(0);

  const radius = () => diameter() / 2;
  const innerRadius = () => radius() - thickness();
  const innerDiameter = () => innerRadius()*2;

  const checkThickness = (e) => {
    if (thickness() > radius())
      setThickness(radius());
  };

  return (<>
    <Circle diameter={diameter()} thickness={thickness()} setInertia={setInertia} />
    <br />
    <div class="grid grid-cols-5">
      <Slider name="outer diameter" value={diameter()} setValue={setDiameter} max={maxDiameter()} setMax={setMaxDiameter} counts={10} />
      <Slider name="outer radius" value={radius()} setValue={v => setDiameter(v * 2)} max={maxDiameter() / 2} counts={100} />
      <Slider name="inner diameter" value={innerDiameter()} setValue={v => setThickness(radius()-v/2)} max={maxDiameter()/2} counts={10} />
      <Slider name="inner radius" value={innerRadius()} setValue={v => setThickness(radius()-v)} max={maxDiameter()/4} counts={100} />
      <Slider name="thickness" value={thickness()} setValue={setThickness} max={radius()} counts={100} />
    </div>
    <span class="font-bold text-right inline-block w-20 m-2">inertia:</span>
    <span>{Math.round(inertia() * 100) / 100}</span>
  </>);
}

function CanteleverBeam(props) {

  return (
    <>
    </>
  );
}

function BeamStress(props) {

  return (
    <>
    </>
  );
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

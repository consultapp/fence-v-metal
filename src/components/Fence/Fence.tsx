import Stage1 from "@/components/Stages/Stage1/Stage1";
import Stage2 from "../Stages/Stage2/Stage2";
import Stage3 from "../Stages/Stage3/Stage3";
import Stage4 from "../Stages/Stage4/Stage4";
import Stage5 from "../Stages/Stage5/Stage5";
import Stage6 from "../Stages/Stage6/Stage6";
import Stage7 from "../Stages/Stage7/Stage7";

export default function Fence() {
  return (
    <div id="fence">
      <h1>Fence Calculator</h1>
      <Stage1 />
      <Stage2 />
      <Stage3 />
      <Stage4 />
      <Stage5 />
      <Stage6 />
      <Stage7 />
    </div>
  );
}

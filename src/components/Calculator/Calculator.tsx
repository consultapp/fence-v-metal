import { FenceProflist, FenceShtaketnik } from "@/fence";
import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import { selectProductById } from "@/store/entities/products/selectors";
import { useAppSelector } from "@/store/hooks";
import {
  selectFenceForCalculations,
  selectFenceType,
} from "@/store/ui/fence/selectors";

export default function Calculator() {
  const type = useAppSelector(selectFenceType);
  const [length, height, pillarId, joistId] = useAppSelector(
    selectFenceForCalculations
  );

  const pillar = useAppSelector((state) =>
    selectProductById(state, pillarId ?? 0)
  );
  const joist = useAppSelector((state) =>
    selectProductById(state, joistId ?? 0)
  );

  if (!pillarId || !joistId) return;

  const fence =
    type === FENCE_TYPES.shtaketnik
      ? new FenceShtaketnik({ length, height, pillar, joist })
      : new FenceProflist({ length, height, pillar, joist });

  const p = fence.getPillarCalculation();
  const j = fence.getJoistCalculation();

  return (
    <div>
      <div>
        <h4></h4>
      </div>
      <div>
        <h4></h4>
      </div>
      <div>
        <h4>Pillar ({pillar.name})</h4>
        <div>{pillar?.description} </div>
        <div>{p?.count} items</div>
        <div>{p?.meters} m.</div>
        <div>{p?.totalPrice} Br</div>
      </div>
      <div>
        <h4>Joist ({joist.name})</h4>
        <div>{joist?.description} </div>
        <div>{j?.meters} m.</div>
        <div>{j?.totalPrice} Br</div>
      </div>
      <div>
        <h4></h4>
      </div>
    </div>
  );
}

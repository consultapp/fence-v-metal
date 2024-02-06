import { TProduct } from "./types";

type Nullable<T> = T | null;

interface IFence {}

type TProps = Pick<
  Fence,
  "length" | "height" | "pillar" | "joist" | "screw" | "stub"
>;

class Fence implements IFence {
  length: Nullable<number>;
  height: Nullable<number>;
  pillar: Nullable<TProduct>;
  joist: Nullable<TProduct>;
  screw: Nullable<TProduct>;
  stub: Nullable<TProduct>;
  needStages: number[] = [];

  fenceHeight: number = 0;

  constructor({ length, height, pillar, joist, screw, stub }: TProps) {
    this.length = length;
    this.height = height;
    this.pillar = pillar;
    this.joist = joist;
    this.screw = screw;
    this.stub = stub;

    this.calcFenceHeight();
  }

  calcFenceHeight() {
    if (this.height) {
      if (this.height <= 1.4) {
        this.fenceHeight = 2;
      } else if (this.height <= 1.7) {
        this.fenceHeight = 2.4;
      } else if (this.height <= 2.2) {
        this.fenceHeight = 3;
      }
    }
  }

  getPillarCalculation() {
    if (this.length && this.pillar) {
      const pillarCount = Math.ceil(this.length / 2.5) + 1;
      const pillarMeters = Math.round(pillarCount * this.fenceHeight * 10) / 10;
      return {
        meters: pillarMeters,
        count: pillarCount,
        totalPrice:
          Math.ceil(pillarMeters * (this.pillar.price ?? 0) * 100) / 100,
      };
    }
    return;
  }

  getJoistCalculation() {
    if (this.length && this.joist) {
      return {
        meters: this.length * 2,
        totalPrice:
          Math.ceil(this.length * 2 * (this.joist.price ?? 0) * 100) / 100,
      };
    }
    return;
  }

  getStubCalculations() {
    if (this.length && this.pillar && this.stub) {
      const p = this.getPillarCalculation();
      return {
        count: p?.count,
        totalPrice:
          Math.ceil((p?.count ?? 0) * (this.stub.price ?? 0) * 100) / 100,
      };
    }
    return;
  }
}

export class FenceShtaketnik extends Fence {
  constructor({ length, height, pillar, joist, screw, stub }: TProps) {
    super({ length, height, pillar, joist, screw, stub });
  }
}
export class FenceProflist extends Fence implements IFence {
  constructor({ length, height, pillar, joist, screw, stub }: TProps) {
    super({ length, height, pillar, joist, screw, stub });
  }
}

import { TProduct } from "./types";

type Nullable<T> = T | null;

interface IFence {}

type TProps = Pick<Fence, "length" | "height" | "pillar" | "joist">;

class Fence implements IFence {
  length: Nullable<number>;
  height: Nullable<number>;
  pillar: Nullable<TProduct>;
  joist: Nullable<TProduct>;
  needStages: number[] = [];

  fenceHeight: number = 0;

  constructor({ length, height, pillar, joist }: TProps) {
    this.length = length;
    this.height = height;
    this.pillar = pillar;
    this.joist = joist;

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
          Math.ceil(pillarCount * (this.pillar.price ?? 0) * 100) / 100,
      };
    }
    return;
  }

  getJoistCalculation() {
    if (this.length && this.joist) {
      return {
        meters: this.length * 2,
        totalPrice: this.length * 2 * (this.joist.price ?? 0),
      };
    }
    return;
  }
}

export class FenceShtaketnik extends Fence {
  constructor({ length, height, pillar, joist }: TProps) {
    super({ length, height, pillar, joist });
  }
}
export class FenceProflist extends Fence implements IFence {
  constructor({ length, height, pillar, joist }: TProps) {
    super({ length, height, pillar, joist });
  }
}

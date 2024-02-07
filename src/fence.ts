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
        description: `${pillarCount} столб по ${this.fenceHeight}`,
        totalPrice: Ceil(pillarMeters * (this.pillar.price ?? 0)),
      };
    }
    return;
  }

  getJoistCalculation() {
    if (this.length && this.joist) {
      return {
        meters: this.length * 2,
        totalPrice: Ceil(this.length * 2 * (this.joist.price ?? 0)),
      };
    }
    return;
  }

  getStubCalculations() {
    if (this.length && this.pillar && this.stub) {
      const p = this.getPillarCalculation();
      return {
        count: p?.count,
        totalPrice: Ceil((p?.count ?? 0) * (this.stub.price ?? 0)),
      };
    }
    return;
  }
}

type TPropsExt = TProps & { material: Nullable<TProduct> };

export class FenceShtaketnik extends Fence {
  material: Nullable<TProduct>;
  constructor({
    length,
    height,
    pillar,
    joist,
    screw,
    stub,
    material,
  }: TPropsExt) {
    super({ length, height, pillar, joist, screw, stub });
    this.material = material;
  }

  getMaterialCalculations() {}
}

export class FenceProflist extends Fence {
  material: Nullable<TProduct>;

  constructor({
    length,
    height,
    pillar,
    joist,
    screw,
    stub,
    material,
  }: TPropsExt) {
    super({ length, height, pillar, joist, screw, stub });
    this.material = material;
  }
  getMaterialCalculations() {
    if (this.length && this.material && this.height) {
      const count = Math.ceil(
        this.length / ((this.material.width ?? 20) - 0.05)
      );

      const squareMeter = Ceil(
        count * (this.material.width ?? 20) * this.height
      );

      return {
        count,
        description: `${count} лист по ${this.height} м`,
        squareMeter,
        countInfo: "m2",
        totalPrice: Ceil(squareMeter * (this.material.price ?? 0)),
      };
    }
  }
}

function Ceil(num: number) {
  return Math.ceil(num * 100) / 100;
}

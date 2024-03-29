import SHTAKETNIK_TYPES from "./fixtures/SHTAKETNIK_TYPES";
import {
  Ceil,
  getPipePriceWithDiscount,
  getPriceIfPromotion,
} from "./functions";
import { IFilter, TProduct } from "./types";

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

  fenceHeight: number = 0;

  constructor({ length, height, pillar, joist, screw, stub }: TProps) {
    this.length = parseFloat((length?.toString() ?? "").replace(",", "."));
    this.height = parseFloat((height?.toString() ?? "").replace(",", "."));
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
      } else if (this.height <= 2.5) {
        this.fenceHeight = 3.5;
      }
    }
  }

  getPillarCalculation() {
    if (this.length && this.pillar) {
      const pillarCount = Math.ceil(this.length / 2.5) + 1;
      const pillarMeters = Math.round(pillarCount * this.fenceHeight * 10) / 10;

      const price = getPipePriceWithDiscount(this.pillar, pillarMeters);

      return {
        product: this.pillar,
        meters: pillarMeters,
        count: pillarCount,
        description: `${pillarCount} столб по ${this.fenceHeight} м`,
        totalPrice: Ceil(pillarMeters * (price ?? 0)),
        oldPrice: Ceil(pillarMeters * (this.pillar.price ?? 0)),
      };
    }
    return;
  }

  getJoistCalculation() {
    if (this.length && this.joist && this.fenceHeight) {
      const meters = Ceil(this.length * (this.fenceHeight === 3.5 ? 3 : 2));
      const price = getPipePriceWithDiscount(this.joist, meters);
      return {
        product: this.joist,
        meters: meters,
        totalPrice: Ceil(meters * (price ?? 0)),
        oldPrice: Ceil(meters * (this.joist.price ?? 0)),
      };
    }
    return;
  }

  getStubCalculations() {
    if (this.length && this.pillar && this.stub) {
      const p = this.getPillarCalculation();
      return {
        product: this.stub,
        count: p?.count,
        totalPrice: Ceil((p?.count ?? 0) * (this.stub.price ?? 0)),
        oldPrice: Ceil((p?.count ?? 0) * (this.stub.price ?? 0)),
      };
    }
    return;
  }
}

type TPropsExt = TProps & {
  material: Nullable<TProduct>;
  shtaketnikType?: keyof typeof SHTAKETNIK_TYPES;
  filter?: Nullable<IFilter>;
};

export class FenceShtaketnik extends Fence {
  material: Nullable<TProduct>;
  shtaketnikType: keyof typeof SHTAKETNIK_TYPES;
  filter;
  constructor({
    length,
    height,
    pillar,
    joist,
    screw,
    stub,
    material,
    shtaketnikType,
    filter,
  }: TPropsExt) {
    super({ length, height, pillar, joist, screw, stub });
    this.material = material;
    this.shtaketnikType = shtaketnikType ?? SHTAKETNIK_TYPES.chess;
    this.filter = filter;
  }

  getMaterialCalculations() {
    if (
      this.length &&
      this.material &&
      this.height &&
      this.shtaketnikType &&
      this.filter
    ) {
      const { perMeter } = this.filter;
      if (perMeter) {
        const density = perMeter[this.shtaketnikType];
        const count = Math.ceil(this.length * density);
        const squareMeter = Ceil(count * this.height, 3);

        return {
          product: this.material,
          count,
          description: `${count} планок по ${this.height} м`,
          squareMeter,
          countInfo: "м",
          totalPrice: Ceil(squareMeter * getPriceIfPromotion(this.material)),
          oldPrice: Ceil(squareMeter * (this.material.price ?? 0)),
        };
      }
    }
  }

  getScrewCalculations() {
    const m = this.getMaterialCalculations();
    if (m && this.screw) {
      const count = Math.ceil(m.count * 4);
      return {
        product: this.screw,
        count,
        totalPrice: Ceil(count * (this.screw.price ?? 0)),
        oldPrice: Ceil(count * (this.screw.price ?? 0)),
      };
    }
  }
  getCalculation() {
    const cMaterial = this.getMaterialCalculations();
    const cPillar = this.getPillarCalculation();
    const cJoist = this.getJoistCalculation();
    const cScrew = this.getScrewCalculations();
    const cStub = this.getStubCalculations();

    return { cMaterial, cPillar, cJoist, cScrew, cStub };
  }
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
        count * (this.material.width ?? 20) * this.height,
        3
      );

      return {
        product: this.material,
        count,
        description: `${count} лист по ${this.height} м`,
        squareMeter,
        countInfo: "m2",
        totalPrice: Ceil(squareMeter * getPriceIfPromotion(this.material)),
        oldPrice: Ceil(squareMeter * (this.material.price ?? 0)),
      };
    }
  }

  getScrewCalculations() {
    const m = this.getMaterialCalculations();
    if (m && this.screw) {
      const count = Math.ceil(m.count * 10);
      return {
        product: this.screw,
        count,
        totalPrice: Ceil(count * (this.screw.price ?? 0)),
      };
    }
  }

  getCalculation() {
    const cMaterial = this.getMaterialCalculations();
    const cPillar = this.getPillarCalculation();
    const cJoist = this.getJoistCalculation();
    const cScrew = this.getScrewCalculations();
    const cStub = this.getStubCalculations();

    return { cMaterial, cPillar, cJoist, cScrew, cStub };
  }
}

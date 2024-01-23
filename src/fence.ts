// import { TJoist, TPillar } from "./types";

// type Nullable<T> = T | null;

// interface IFence {
//   isStageNeeded: (stage: number) => boolean;
// }

// class Fence implements IFence {
//   length: Nullable<number>;
//   height: Nullable<number>;
//   pillar: Nullable<TPillar>;
//   joist: Nullable<TJoist>;
//   needStages: number[] = [];

//   constructor({ l, h, p, j }) {
//     this.length = l;
//     this.height = h;
//     this.pillar = p; //40х40х1.5	40х40х2	50х50х2	50х50х3	60х40х2	60х40х3
//     this.joist = j; //30х20х1.5	40х20х1.5	40х20х2
//   }

//   isStageNeeded(stage: number) {
//     return this.needStages.includes(stage);
//   }
// }

// export class FenceShtaketnik extends Fence {
//   needStages = [1, 2, 3, 4, 5, 6];

//   constructor({ l = 100, h = 100, p = "", j = "" }) {
//     super({ l, h, p, j });
//   }
// }
// export class FenceProflist extends Fence implements IFence {
//   needStages = [1, 3, 4, 5, 6];

//   constructor({ l = 100, h = 100, p = "", j = "" }) {
//     super({ l, h, p, j });
//   }
// }

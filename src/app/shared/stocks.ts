export interface Stock {
  index: number;
  value: number;
}

export const STOCKS: Stock[] = [
  {index: getRandom(0, 400), value: getRandom(200, 400)},
  {index: getRandom(0, 400), value: getRandom(200, 400)},
  {index: getRandom(0, 400), value: getRandom(200, 400)},
  {index: getRandom(0, 400), value: getRandom(200, 400)},
  {index: getRandom(0, 400), value: getRandom(200, 400)},
  {index: getRandom(0, 400), value: getRandom(200, 400)},
  {index: getRandom(0, 400), value: getRandom(200, 400)},
  {index: getRandom(0, 400), value: getRandom(200, 400)},
  {index: getRandom(0, 400), value: getRandom(200, 400)},
  {index: getRandom(0, 400), value: getRandom(200, 400)},
];
function getRandom(floor: number, ceiling: number) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

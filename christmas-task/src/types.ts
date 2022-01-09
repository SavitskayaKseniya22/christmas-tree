export type Toy = {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
};

interface Filter {
  [key: string]: {
    value: boolean;
    name: string;
  };
}
interface Limit {
  min: number;
  max: number;
}
export interface Filters {
  color: Filter;
  shape: Filter;
  size: Filter;
  favorite: boolean;
  count: Limit;
  year: Limit;
}
export interface GameTypes {
  isMusicPlaying: boolean;
  isSnowing: boolean;
  tree: string;
  bg: string;
  isGarlandEnabled: boolean;
  garlandType: string;
}

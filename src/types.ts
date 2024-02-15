export enum ToySizeType {
  BIG = 'big',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export enum ToyColorType {
  WHITE = 'white',
  YELLOW = 'yellow',
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
}

export enum ToyShapeType {
  BALL = 'ball',
  BELL = 'bell',
  CONE = 'cone',
  SNOWFLAKE = 'snowflake',
  TOY = 'toy',
}

export enum OrderType {
  titleUp = 'titleUp',
  titleDown = 'titleDown',
  yearUp = 'yearUp',
  yearDown = 'yearDown',
  QUANTITYUP = 'quantityUp',
  QUANTITYDOWN = 'quantityDown',
}

export enum ArrayOfFeaturesType {
  COLOR = 'color',
  SHAPE = 'shape',
  SIZE = 'size',
}

export enum BooleanFeaturesType {
  FAVORITE = 'favorite',
  SELECTED = 'selected',
}
export enum SliderType {
  YEAR = 'year',
  QUANTITY = 'quantity',
}
export interface FiltersType {
  [ArrayOfFeaturesType.COLOR]: ToyColorType[];
  [ArrayOfFeaturesType.SHAPE]: ToyShapeType[];
  [ArrayOfFeaturesType.SIZE]: ToySizeType[];
  order: OrderType;
  [BooleanFeaturesType.FAVORITE]: boolean;
  [BooleanFeaturesType.SELECTED]: boolean;
  [SliderType.QUANTITY]: [number, number] | null;
  [SliderType.YEAR]: [number, number] | null;
  search: string;
}
export interface GameSettingsType {
  isMusicPlaying: boolean;
  isSnowing: boolean;
  tree: string;
  bg: string;
  isGarlandEnabled: boolean;
  garlandType: string;
}

export enum ToyViewType {
  full = 'full',
  preview = 'preview',
}

export interface ToyType {
  num: number;
  title: string;
  [SliderType.QUANTITY]: number;
  [SliderType.YEAR]: number;
  [ArrayOfFeaturesType.SHAPE]: string;
  [ArrayOfFeaturesType.COLOR]: ToyColorType;
  [ArrayOfFeaturesType.SIZE]: string;
  [BooleanFeaturesType.FAVORITE]: boolean;
}

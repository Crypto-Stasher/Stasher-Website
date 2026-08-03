export type ProductSpec = {
  name: string;
  value: string;
};

export type ProductSpecGroup = {
  group: string;
  specs: ProductSpec[];
};

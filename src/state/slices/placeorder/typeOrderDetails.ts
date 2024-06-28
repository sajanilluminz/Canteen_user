export type recentOrder = {
  items: item;
};

export type item = {
  itemId: string;
  price: string;
  quantity: 1;
}[];

export interface IplaceOrderInitialState {
  currentOrderDetails: IplaceOrderProps | null;
  loading: boolean;
  error: undefined | string;
  status: 'loading' | 'success' | 'failed';
}
export type IplaceOrderProps = {
  createdAt: string;
  orderId: string;
  payStatus: string;
  price: number;
  quantity: number;
};

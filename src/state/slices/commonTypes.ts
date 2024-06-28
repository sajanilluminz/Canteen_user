export interface IproductObj {
  itemId: string | null | undefined;
  isActive: boolean | null | undefined;
  isDeleted: boolean | null | undefined;
  category: string | null | undefined;
  image: string | undefined;
  name: string | null | undefined;
  quantity: number | null | undefined;
  price: number | null | undefined;
}

export interface IRecentObj extends IproductObj {
  message?: string | null | undefined;
  orderId?: string | null | undefined;
  payStatus?: string | null | undefined;
  createdAt?: undefined | string | null;
}
export interface IPlaceOrderObj extends IproductObj {
  quantity: number;
}

import {IRecentObj} from '../commonTypes';

export interface IrecentInitialState {
  recentData: IRecentObj[];
  status: 'loading' | 'success' | 'failed';
  loading: boolean;
  hardLoading: boolean;
  error: string | undefined | number | null;
}

export type recentData = {
  name: string;
  price: number;
  itemId: string;
  category: string;
  orderId: string;
  isDeleted: boolean;
  createdTime?: undefined | string;
  isActive: boolean;
  image: string | undefined;
};

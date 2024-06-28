import {IRecentObj} from '../commonTypes';

export interface IorderDetialsInitalState {
  oderDetails: any;
  loading: boolean;
  error: string | undefined | number | null;
  refreshData: number;
  status?: 'loading' | 'success' | 'failed';
}

export interface IOrderHistoryIntialState {
  history: IHistoryData[];
  status: 'loading' | 'success' | 'failed';
  loading: boolean;
  loadMore: boolean;
  hardLoading: boolean;
  error: string | undefined | number | null;
}

export type IHistoryData = {
  title: string | undefined | null;
  data: IRecentObj[];
};

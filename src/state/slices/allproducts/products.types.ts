import {IproductObj} from '../commonTypes';

export interface IproductsInitialState {
  products: null | IproductObj[];
  status: 'loading' | 'success' | 'failed';
  loading: boolean;
  error: string | undefined;
}

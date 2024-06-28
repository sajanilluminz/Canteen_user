export interface IfetchCategoreisInitialState {
  categories: null | string[];
  status: 'loading' | 'success' | 'failed';
  loading: boolean;
  error: null | object;
}

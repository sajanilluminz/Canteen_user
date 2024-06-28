import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {baseUrl, getCategories} from '~constants/baseurl';
import {RootState} from '~state/store';
import {getApiCall} from '../apiManager';
import {IfetchCategoreisInitialState} from './categroyTypes';
import {categories} from './categoresData';

const initialState: IfetchCategoreisInitialState = {
  categories: null,
  status: 'loading',
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'fetch categroies',
  async (authToken: string) => {
    let headers = {Authorization: `Bearer ${authToken}`};
    return getApiCall({url: getCategories, headers})
      .then(() => {
        return {categories, error: null};
      })
      .catch(error => {
        return {error, categories: []};
      });
  },
);

export const subcategoriesSlice = createSlice({
  name: 'getCategroiesSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.categories = action?.payload?.categories;
          state.error = action?.payload?.error;
          state.loading = false;
          state.status = 'success';
        },
      )
      .addCase(fetchCategories.rejected, state => {
        state.status = 'failed';
        state.loading = false;
      });
  },
});
export const getCategoriesData = (state: RootState) =>
  state.categories.categories;
export const getLoadingState = (state: RootState) => state.categories.loading;
export default subcategoriesSlice.reducer;

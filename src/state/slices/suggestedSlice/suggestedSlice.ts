/* eslint-disable @typescript-eslint/no-unused-vars */
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {AppState} from 'react-native';
import {getSuggested} from '~constants/baseurl';
import {IInitialSuggestedProducts, IsuggestedDataProps} from './suggestedTypes';
import {RootState} from '~state/store';
import {decodeDate} from '~screens/homeScreen/views/getTime';
import moment from 'moment';
import {getApiCall} from '../apiManager';
const initialState: IInitialSuggestedProducts = {
  suggested: null,
  status: 'loading',
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

var categroyObj: IsuggestedDataProps = {
  name: '',
  price: 0,
  status: 0,
  date: '',
  reason: '',
  showHeader: true,
};

const sortDate = (
  a: {createdAt: string | null | undefined},
  b: {createdAt: string | null | undefined},
) => {
  var dateA = moment(a.createdAt).toDate();
  var dateB = moment(b.createdAt).toDate();
  return dateA < dateB ? 1 : -1;
};

export const fetchSuggestedProducts = createAsyncThunk(
  'fetch suggested',
  async ({token, page = 1}: {token: any; page?: number}) => {
    let headers = {Authorization: `Bearer ${token}`};
    var totalPages: number = 1;
    let config = {
      headers: headers,
      params: {
        page: page,
        limit: 10,
      },
    };
    return getApiCall({url: getSuggested, config})
      .then(response => {
        var suggestedArr: IsuggestedDataProps[] = [];
        totalPages = response.data.data.totalPages;
        var lastObject: any = null;
        let arrayNew = (response.data.data.allItems ?? [])?.sort(sortDate);
        arrayNew.forEach(
          (elem: {
            name: any;
            price: any;
            reason: string;
            productStatus: any;
            createdAt: string | null | undefined;
          }) => {
            let date = decodeDate(elem.createdAt);
            let dateOld = lastObject?.date;

            categroyObj = {
              name: elem.name,
              price: elem.price,
              reason: elem.reason,
              status: elem.productStatus,
              date: date,
              showHeader: dateOld ? date !== dateOld : true,
            };
            suggestedArr.push(categroyObj);
            lastObject = categroyObj;
          },
        );
        return {
          suggestedArr,
          currentPage: page,
          totalPages: totalPages,
          error: null,
        };
      })
      .catch(error => {
        console.log(error);
        return {
          suggestedArr: [],
          totalPages: totalPages,
          currentPage: page,
          error: error,
        };
      });
  },
);

export const SuggestedProductsSlice = createSlice({
  name: 'suggested',
  initialState,
  reducers: {
    updateSuggestions: (state, action: PayloadAction<IsuggestedDataProps>) => {
      if (state.suggested !== null) {
        if (action.payload.date === state.suggested[0].date) {
          state.suggested[0].showHeader = false;
        }
      }
      state.suggested?.unshift(action.payload);
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage += action.payload;
    },
    resetPageCount: state => {
      state.currentPage = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSuggestedProducts.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(
        fetchSuggestedProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          let listOld =
            action.payload.currentPage === 1 ? [] : state.suggested ?? [];

          if (listOld.length && action.payload.suggestedArr.length) {
            let objLast = listOld[listOld.length - 1];
            let objFirst = action.payload.suggestedArr[0];

            if (objLast.date === objFirst.date) {
              objFirst.showHeader = false;
            }
          }
          state.suggested = listOld.concat(action.payload.suggestedArr);
          state.totalPages = action.payload?.totalPages;
          state.error = action.payload?.error;
          state.status = 'success';
        },
      )
      .addCase(fetchSuggestedProducts.rejected, state => {
        state.status = 'failed';
        state.loading = false;
      });
  },
});

export default SuggestedProductsSlice.reducer;
export const {updateSuggestions, updateCurrentPage, resetPageCount} =
  SuggestedProductsSlice.actions;
export const getSuggestedProducts = (state: RootState) =>
  state.suggested.suggested;

export const suggestedLoadingState = (state: RootState) =>
  state.suggested.loading;
export const totalPages = (state: RootState) => state.suggested.totalPages;
export const currentPage = (state: RootState) => state.suggested.currentPage;

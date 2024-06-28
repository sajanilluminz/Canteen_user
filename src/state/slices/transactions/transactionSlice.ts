import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTransactionHistoryUrl} from '~constants/baseurl';
import {RootState} from '~state/store';
import {getApiCall} from '../apiManager';

type ItransactionsProps = {
  transactions: null | Itransactions;
  loading: boolean;
  error: undefined | string;
};
type Itransactions = {
  data: ItranactionDataProps;
  walletAmount: number;
};
type ItranactionDataProps = {
  amount: number;
  time: string;
}[];
type IdataArr = {
  walletamount: number;
  data: {
    amount: number;
    time: string;
  }[];
};
const initialState: ItransactionsProps = {
  transactions: null,
  loading: false,
  error: undefined,
};
export const getTransactionHistory = createAsyncThunk(
  'transactions',
  async (authToken: string) => {
    let headers = {Authorization: `Bearer ${authToken}`};
    return getApiCall({url: getTransactionHistoryUrl, headers})
      .then(res => {
        var outerArr: IdataArr;
        var arr: {amount: number; time: string}[] = [];
        res.data.data.PaidHistory.paymentHistory.forEach(
          (item: {Paid: boolean; amount: number; createdAt: string}) => {
            arr.push({
              amount: item.amount,
              time: item.createdAt,
            });
          },
        );
        outerArr = {
          data: arr,
          walletamount: res.data.data.Amount,
        };

        return {outerArr, error: null};
      })
      .catch(error => {
        console.log(error);
        return {arr: [], error};
      });
  },
);

export const transactionsSlice = createSlice({
  name: 'transcations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTransactionHistory.pending, state => {
        state.loading = true;
      })
      .addCase(
        getTransactionHistory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.transactions = action.payload.outerArr;
          state.error = action.payload.error;
        },
      )
      .addCase(getTransactionHistory.rejected, state => {
        state.loading = false;
        state.error = 'rejected';
      });
  },
});

export default transactionsSlice.reducer;

export const walletAmount = (state: RootState) =>
  state.transactions?.transactions?.walletamount;

export const transactionHistoryLoadingState = (state: RootState) =>
  state.transactions?.loading;

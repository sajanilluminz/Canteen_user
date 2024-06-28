import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {historyByMonthUrl} from '~constants/baseurl';
import {RootState} from '~state/store';
import {getApiCall} from '../apiManager';

interface IOrderHistoryMonthlyAmount {
  loading: boolean;
  monthlyData: IMonthlyData[] | null;
  error: null | undefined | string;
}

type IMonthlyData = {
  orderMothId: string;
  isOpen: boolean;
  monthlyAmount: number;
  year: string;
};

type ICardHandlerProps = {
  cardID: string;
  cardStatus: boolean;
};

const initialState: IOrderHistoryMonthlyAmount = {
  loading: false,
  monthlyData: null,
  error: null,
};

export const getHistoryByMonths = createAsyncThunk(
  'getHistoryByMonths',
  async (authToken: string) => {
    let headers = {Authorization: `Bearer ${authToken}`};
    let monthlyDataArray: any = [];
    return getApiCall({url: historyByMonthUrl, headers})
      .then(res => {
        var response = res.data.data.orderDetail;

        response.forEach(
          (elem: {monthId: string; totalAmount: number; year: string}) => {
            let dataObj = {
              orderMothId: elem.monthId,
              monthlyAmount: elem.totalAmount,
              year: elem.year,
              isOpen: false,
            };
            monthlyDataArray?.push(dataObj);
          },
        );
        var sortedArr = monthlyDataArray.sort(function (
          a: {orderMothId: string},
          b: {orderMothId: string},
        ) {
          return parseFloat(b.orderMothId) - parseFloat(a.orderMothId);
        });
        return {sortedArr, error: null};
      })
      .catch(error => {
        console.log(error);
        return {sortedArr: null, error: error};
      });
  },
);

const getHistoryByMonthSlice = createSlice({
  name: 'monthlyHistory',
  initialState,
  reducers: {
    handleCardState: (state, action: PayloadAction<ICardHandlerProps>) => {
      state.monthlyData?.forEach(elem => {
        if (action.payload.cardStatus === false) {
          if (elem.orderMothId === action.payload.cardID) {
            elem.isOpen = !action.payload.cardStatus;
          } else {
            elem.isOpen = action.payload.cardStatus;
          }
        } else {
          if (elem.orderMothId === action.payload.cardID) {
            elem.isOpen = !action.payload.cardStatus;
          }
        }
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getHistoryByMonths.pending, state => {
        state.loading = true;
      })
      .addCase(
        getHistoryByMonths.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.monthlyData = action?.payload?.sortedArr;
          state.error = action?.payload?.error;
          state.loading = false;
        },
      )
      .addCase(getHistoryByMonths.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default getHistoryByMonthSlice.reducer;
export const {handleCardState} = getHistoryByMonthSlice.actions;
export const monthlyHistoryData = (state: RootState) =>
  state?.monthlyData?.monthlyData;
export const monthlyHistoryAmountLoadingState = (state: RootState) =>
  state?.monthlyData?.loading;
export const monthlyHistoryAmountError = (state: RootState) =>
  state?.monthlyData?.error;

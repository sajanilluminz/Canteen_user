/* eslint-disable react-hooks/rules-of-hooks */
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {placeOrderUrl} from '~constants/baseurl';
import {postApiCall} from '../apiManager';
import {IplaceOrderInitialState} from './typeOrderDetails';
export const placeOrder = createAsyncThunk(
  'placeOrder',
  async (orderDetails: any) => {
    var data = {
      items: [
        {
          itemId: orderDetails?.itemId,
          price: orderDetails?.price,
          quantity: 1,
        },
      ],
    };
    let headers = {Authorization: `Bearer ${orderDetails?.token}`};
    return postApiCall({url: placeOrderUrl, data: data, headers})
      .then((response: {data: any}) => {})
      .catch((error: any) => {
        if (error?.response) {
          toast.show(`${error?.response?.data?.message}`, {type: 'error'});
        } else {
          toast.show(`${error.message}`, {type: 'error'});
        }
        toast.hideAll();
        console.log(error);
      });
  },
);

const initialState: IplaceOrderInitialState = {
  currentOrderDetails: null,
  status: 'loading',
  loading: false,
  error: undefined,
};

const placeHolderSlice = createSlice({
  name: 'placeOrder',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(placeOrder.pending, state => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.currentOrderDetails = action.payload;
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      }),
});

export default placeHolderSlice.reducer;

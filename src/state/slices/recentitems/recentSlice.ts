/* eslint-disable react-hooks/rules-of-hooks */
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {baseUrl, recentOrder} from '~constants/baseurl';
import {getApiCall} from '../apiManager';
import {IrecentInitialState as RecentInitialState} from './types';
import {IRecentObj} from '../commonTypes';

const initialState: RecentInitialState = {
  recentData: [],
  status: 'loading',
  loading: false,
  hardLoading: false,
  error: undefined,
};

let demoObj: IRecentObj = {
  name: '',
  price: 0,
  image: '',
  category: '',
  itemId: '',
  orderId: null,
  payStatus: null,
  createdAt: null,
  isActive: null,
  isDeleted: null,
  quantity: null,
};

export const getRecentOrders = createAsyncThunk(
  'recentOrders',
  async (authToken: string) => {
    let headers = {Authorization: `Bearer ${authToken}`};
    return getApiCall({url: recentOrder, headers})
      .then(response => {
        const extractedData = [];
        const recent = response.data.data.recentOrder;
        for (const order of recent) {
          for (const item of order.items) {
            if (item.isRevert === 0) {
              demoObj = {
                name: item.itemId.name,
                price: item.price,
                orderId: order._id,
                image: item.itemId.image.image_url
                  ? `${baseUrl}${item.itemId.image.image_url}`
                  : null,
                category: item.itemId.categoryId.name,
                itemId: item.itemId._id,
                payStatus: order.payStatus,
                quantity: item.quantity,
                createdAt: order.createdAt,
                isActive: item.itemId.isActive,
                isDeleted: item.itemId.isDeleted,
              };
              extractedData.push(demoObj);
            }
          }
        }
        return {extractedData, error: null};
      })
      .catch(error => {
        console.log(error);
        return {error, new_Array: []};
      });
  },
);

export const RecentItemsSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    updateRecentOrdersData: (state, action: PayloadAction<IRecentObj[]>) => {
      if (action.payload && action.payload.length) {
        let prevData = state.recentData;
        state.recentData = action.payload.concat(prevData);
      }
    },
    deleteRevertedElemfromRecentOrders: (state, action) => {
      state.recentData?.splice(action.payload, 1);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getRecentOrders.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(
        getRecentOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.recentData = action?.payload?.extractedData;
          state.error = action?.payload?.error;
          state.loading = false;
          state.status = 'success';
        },
      )
      .addCase(getRecentOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
export const {updateRecentOrdersData, deleteRevertedElemfromRecentOrders} =
  RecentItemsSlice.actions;
export default RecentItemsSlice.reducer;

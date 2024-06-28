import {IOrderHistoryIntialState} from './types';
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApiCall} from '../apiManager';
import {baseUrl, getOrderDetails} from '~constants/baseurl';
import {IRecentObj} from '../commonTypes';
import {RootState} from '~state/store';

const initialState: IOrderHistoryIntialState = {
  history: [],
  status: 'loading',
  loading: false,
  hardLoading: false,
  error: null,
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

export const getOrderHistory = createAsyncThunk(
  'orderHistory',
  async ({authToken, limit}: {authToken: string; limit: number}) => {
    let headers = {Authorization: `Bearer ${authToken}`};
    return getApiCall({url: getOrderDetails(limit, 1), headers})
      .then(response => {
        const extractedData: {title: any; data: IRecentObj[]}[] = [];
        const history = response.data.data.recentOrder;
        console.log(
          'response.data.data.loadMoreFlag : ',
          response.data.data.loadMoreFlag,
        );

        const loadMore = response.data.data.loadMoreFlag ?? false;
        history.forEach((order: any) => {
          const createdAtDate: any = new Date(order.createdAt);
          createdAtDate.setHours(0, 0, 0, 0); // Set time to midnight
          createdAtDate.setDate(1);
          const createdAtKey = createdAtDate.toISOString();
          if (!extractedData[createdAtKey]) {
            extractedData[createdAtKey] = {
              title: createdAtKey,
              data: [],
            };
          }
          order.items.forEach(
            (item: {
              itemId: {
                name: any;
                price: any;
                image: {image_url: any};
                categoryId: {name: any};
                _id: any;
                isActive: any;
                isDeleted: any;
              };
              quantity: any;
            }) => {
              demoObj = {
                name: item.itemId.name,
                price: item.itemId.price,
                image: `${baseUrl}${item.itemId.image.image_url}`,
                category: item.itemId.categoryId.name,
                itemId: item.itemId._id,
                orderId: order._id,
                payStatus: order.payStatus,
                createdAt: order.createdAt,
                quantity: item.quantity,
                isActive: item.itemId.isActive,
                isDeleted: item.itemId.isDeleted,
              };
              extractedData[createdAtKey].data.push(demoObj);
            },
          );
        });
        const convertedData = Object.values(extractedData);
        console.log(convertedData, 'Data');
        return {history: convertedData, error: null, loadMore: loadMore};
      })
      .catch(error => {
        console.log(error);
        return {error, history: [], loadMore: false};
      });
  },
);

const orderHistorySlice = createSlice({
  name: 'orderHistorySlice',
  initialState,
  reducers: {
    updateOrderHistory: (state, action: PayloadAction<IRecentObj>) => {
      let dateObj = state.history.find(
        item =>
          new Date(item.title ?? '').setHours(0, 0, 0, 0) ===
          new Date(action.payload.createdAt ?? '').setHours(0, 0, 0, 0),
      );
      if (dateObj) {
        dateObj.data.unshift(action.payload);
      } else {
        state.history.unshift({
          title: action.payload.createdAt,
          data: [action.payload],
        });
      }
    },
    updateOrderHistoryFromCart: (
      state,
      action: PayloadAction<IRecentObj[]>,
    ) => {
      let dateObj = state.history.find(
        item =>
          new Date(item.title ?? '').setHours(0, 0, 0, 0) ===
          new Date(action.payload[0].createdAt ?? '').setHours(0, 0, 0, 0),
      );
      if (dateObj) {
        let prvData = dateObj.data;
        dateObj.data = action.payload.concat(prvData);
      } else {
        state.history.unshift({
          title: action.payload[0].createdAt,
          data: [action.payload],
        });
      }
    },
    removeItemFromOrderHistory: (
      state,
      action: PayloadAction<{
        createdAt: string;
        itemId: string;
      }>,
    ) => {
      let orderToRemove = state.history.find(
        item =>
          new Date(item.title ?? '').setHours(0, 0, 0, 0) ===
          new Date(action.payload.createdAt ?? '').setHours(0, 0, 0, 0),
      );
      if (orderToRemove?.data.length === 1) {
        let index = state.history.findIndex(
          item =>
            new Date(item.title ?? '').setHours(0, 0, 0, 0) ===
            new Date(action.payload.createdAt ?? '').setHours(0, 0, 0, 0),
        );
        state.history.splice(index, 1);
      } else {
        if (orderToRemove) {
          let index = orderToRemove.data.findIndex(
            item => item.itemId === action.payload.itemId,
          );
          orderToRemove.data.splice(index, 1);
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getOrderHistory.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(
        getOrderHistory.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('action?.payload : ', action?.payload);

          state.history = action?.payload?.history;
          state.error = action?.payload?.error;
          state.loading = false;
          state.loadMore = action?.payload?.loadMore ?? false;
          state.status = 'success';
        },
      )
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default orderHistorySlice.reducer;
export const {
  updateOrderHistory,
  removeItemFromOrderHistory,
  updateOrderHistoryFromCart,
} = orderHistorySlice.actions;
export const getOrderHistoryFromState = (state: RootState) =>
  state.orderHistory.history;
export const getOrderHistoryLoadMoreFromState = (state: RootState) =>
  state.orderHistory.loadMore;
export const getOrderHistoryLoadingStateFromState = (state: RootState) =>
  state.orderHistory.loading;
export const getOrderHistoryErrorFromState = (state: RootState) => {
  state.orderHistory.error;
};

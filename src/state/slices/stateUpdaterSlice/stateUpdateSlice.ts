import {createSlice} from '@reduxjs/toolkit';

interface IinitalStateUpdater {
  recentOrder: number[];
  orderHistory: number[];
  userDetails: number[];
  avialabeProducts: number[];
}
const initialState: IinitalStateUpdater = {
  recentOrder: [],
  orderHistory: [],
  userDetails: [],
  avialabeProducts: [],
};
export const stateUpdater = createSlice({
  name: 'stateUpdater',
  initialState,
  reducers: {
    updateRecentOrder: state => {
      state.recentOrder.push(1);
    },
    updateOrderHistory: state => {
      state.orderHistory.push(1);
    },
  },
});

export const {updateRecentOrder} = stateUpdater.actions;
export const updateState = (state: any) => state.stateUpdater.recentOrder;
export default stateUpdater.reducer;

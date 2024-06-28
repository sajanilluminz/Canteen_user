import {combineReducers} from '@reduxjs/toolkit';
import signupSlice from './slices/signup/signupSlice';
import recentSlice from './slices/recentitems/recentSlice';
import getProductsReducer from './slices/allproducts/allProductsSlice';
import getCurrentPlacedReducer from './slices/placeorder/placeOrderSlice';
import getCategoriesReducter from './slices/getCategroies/categroiesSlice';
import orderHistoryReducer from '../state/slices/orderHistory/orderHistorySlice';
import StateUpdaterReducer from './slices/stateUpdaterSlice/stateUpdateSlice';
import monthlyDataReducer from './slices/orderHistoryMonthlyAmount/index';
import suggestedReducer from './slices/suggestedSlice/suggestedSlice';
import transactionReducer from './slices/transactions/transactionSlice';
import cartSlice from './slices/cart/cartSlice';

const combineReducer = combineReducers({
  user: signupSlice,
  recentOrder: recentSlice,
  products: getProductsReducer,
  currentPlacedOrder: getCurrentPlacedReducer,
  orderHistory: orderHistoryReducer,
  stateUpdater: StateUpdaterReducer,
  categories: getCategoriesReducter,
  suggested: suggestedReducer,
  transactions: transactionReducer,
  monthlyData: monthlyDataReducer,
  cart: cartSlice,
});
const rootReducer = (state: undefined, action: {type: string}) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return combineReducer(state, action);
};
export default rootReducer;

import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {baseUrl, getAllProducts} from '~constants/baseurl';
import exportObj, {RootState} from '~state/store';
import {getApiCall} from '../apiManager';
import {IPlaceOrderObj, IproductObj} from '../commonTypes';
import {IproductsInitialState} from './products.types';

const initialState: IproductsInitialState = {
  products: null,
  status: 'loading',
  loading: false,
  error: undefined,
};

let demoObj: IPlaceOrderObj | null = null;

export const getProducts = createAsyncThunk(
  'getProducts',
  async (authToken: string) => {
    let headers = {Authorization: `Bearer ${authToken}`};
    return getApiCall({url: getAllProducts, headers})
      .then(async response => {
        let data_Array: IproductObj[] = [];
        await response.data.data.allItems.forEach((item: any) => {
          demoObj = {
            name: item.name,
            price: item.price,
            category: item.categoryId.name,
            itemId: item._id,
            isDeleted: item?.isDeleted,
            quantity: 0,
            isActive: item?.isActive,
            image: `${baseUrl}${item.image?.image_url}`,
          };
          data_Array.push(demoObj);
        });
        let cartData = exportObj.store.getState().cart.cartItems;
        if (cartData.length > 0) {
          data_Array.forEach((item: IproductObj) => {
            cartData.forEach((cartItem: IproductObj) => {
              if (cartItem.itemId === item.itemId) {
                item.quantity = cartItem.quantity;
              }
            });
          });
        }
        return {data_Array, error: null};
      })
      .catch(error => {
        console.log(error);
        return {data_Array: [], error};
      });
  },
);

const getProductsSlice = createSlice({
  name: 'allproducts',
  initialState,
  reducers: {
    updateProductQuantityOnCartUpdate: (
      state,
      action: PayloadAction<IPlaceOrderObj>,
    ) => {
      let existingProduct = state.products?.find(
        item => item.itemId === action.payload.itemId,
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    decreaseProductQuantityOnCardUpdate: (
      state,
      action: PayloadAction<IPlaceOrderObj>,
    ) => {
      let existingProduct = state.products?.find(
        item => item.itemId === action.payload.itemId,
      );
      if (existingProduct && existingProduct.quantity > 0) {
        existingProduct.quantity -= 1;
      }
    },
    resetProducts: state => {
      state.products?.forEach(product => {
        product.quantity = 0;
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.products = action.payload.data_Array;
        state.loading = false;
        state.error = action.payload.error;
        state.status = 'success';
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default getProductsSlice.reducer;
export const {
  decreaseProductQuantityOnCardUpdate,
  updateProductQuantityOnCartUpdate,
  resetProducts,
} = getProductsSlice.actions;
export const getProductsLoadingState = (state: RootState) =>
  state.products.loading;
export const getPrdouctsError = (state: RootState) => state.products.error;

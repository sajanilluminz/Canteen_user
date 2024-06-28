import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {signUpUrl} from '~constants/baseurl';
import {ISignupInitalStateProps} from './signup.types';
import {iuserSignUpDataType} from '~constants/user/userSignupKeys';
import {userObj} from '~screens/login/userObjects';
import {RootState} from '~state/store';
import {postApiCall} from '../apiManager';
const initialState: ISignupInitalStateProps = {
  userDetails: {},
  status: 'idle',
  secondaryImage: '',
  error: null,
};
export const signUpUser = createAsyncThunk(
  'userSignUp',
  async (user: iuserSignUpDataType) => {
    // console.log('qwerty : ', signUpUrl);

    return postApiCall({url: signUpUrl, data: user})
      .then(response => {
        userObj.email = response.data.data.data.user.email;
        userObj.name = response.data.data.data.user.name;
        userObj.firstTimer = response.data.data.data.user.firstTimer;
        userObj.token = response.data.data.token;
        userObj.photo = response.data.data.data?.profilePic;
        userObj.id = response.data.data.data.user.social_login_id;
        userObj.walletAmount = response.data.data.data.user.walletAmount;
        userObj.Amount = response.data.data.data.user.Amount;
        return {userObj, error: null};
      })
      .catch(error => {
        console.log(error);
        return {error, userObj: {}};
      });
  },
);

const sinUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    userbalanceAddition: (state, action: PayloadAction<number | undefined>) => {
      state.userDetails.Amount += action.payload;
    },
    userbalanceSubtraction: (state, action: PayloadAction<number>) => {
      if (state.userDetails?.Amount > 0) {
        state.userDetails.Amount -= action.payload;
      } else {
        state.userDetails.Amount -= 0;
      }
    },
    updateUserSecondaryImage: (state, action: PayloadAction<string>) => {
      state.secondaryImage = action.payload;
    },
    updateUserBalance: (state, action: PayloadAction<number>) => {
      state.userDetails.Amount = action.payload;
    },
    logOutUser: state => {
      state.userDetails = {};
      state.status = 'idle';
      state.error = null;
    },
    setErrorState: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        Object.assign(state.userDetails, action.payload.userObj);
        state.error = action.payload.error;
        state.status = 'succeeded';
      })
      .addCase(signUpUser.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {
  userbalanceSubtraction,
  userbalanceAddition,
  logOutUser,
  updateUserBalance,
  updateUserSecondaryImage,
  setErrorState,
} = sinUpSlice.actions;
export default sinUpSlice.reducer;
export const getUserDetails = (state: RootState) => state.user.userDetails;
export const getUserDetialsStatus = (state: RootState) => state.user.status;
export const getUserDetialsError = (state: RootState) => state.user.error;
export const getUserSecondaryImage = (state: RootState) =>
  state.user.secondaryImage;

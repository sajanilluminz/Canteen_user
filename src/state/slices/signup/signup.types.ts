export interface ISignupInitalStateProps {
  userDetails: {};
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  secondaryImage: string;
  error: null | string | object;
}

export const InitialStateuserObj: IuserDetails = {
  name: null,
  email: null,
  firstTimer: null,
  id: null,
  token: null,
  walletAmount: null,
  Amount: null,
  photo: null,
};

export interface IuserDetails {
  name: string | null;
  email: string | null;
  firstTimer: boolean | null;
  id: string | null;
  token: string | null;
  walletAmount: number | null;
  Amount: number | null;
  photo?: string | null;
}

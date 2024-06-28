export const userObj: IuserOvj = {
  name: null,
  email: null,
  firstTimer: null,
  id: null,
  token: null,
  walletAmount: null,
  Amount: null,
  fullName: null,
  photo: null,
};

export type IuserOvj = {
  name: string | null;
  email: string | null;
  firstTimer: boolean | null;
  id: string | null;
  token: string | null;
  walletAmount: number | null;
  Amount: number | null;
  photo?: string | null;
  fullName?: string | null;
};

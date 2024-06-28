export type iuserSignUpDataType = {
  name: string | null;
  social_login_id: string | null;
  registerToken: string | null;
  email: string | null;
  profileUrl: string | null;
  socialType: 'google' | 'apple';
};

// export const userSignUp: iuserSignUpDataType = {
//   name: null,
//   social_login_id: null,
//   registerToken: null,
//   email: null,
//   socialType: 'googleId',
// };

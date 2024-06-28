import {GoogleSignin} from '@react-native-google-signin/google-signin';

type IGoogleSignInReturnType = {
  platform: 'google' | 'apple';
  token: string;
  name: string;
  email: string | null;
  socialId: string;
  image: string | null;
};

export const googleSignInHandler =
  async (): Promise<IGoogleSignInReturnType> => {
    try {
      let userDetails = await GoogleSignin.signIn();
      let token = await GoogleSignin.getTokens();
      return {
        platform: 'google',
        token: token.accessToken ?? '',
        name: userDetails.user.name ?? '',
        image: userDetails.user.photo ?? null,
        email: userDetails.user.email ?? '',
        socialId: userDetails.user.id ?? '',
      };
    } catch (error) {
      console.log(error, 'GOOGLE SIGNIN ERROR');
      throw error;
    }
  };

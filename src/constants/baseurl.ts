export const baseUrlLive: string = 'http://54.176.169.179:3084';
export const baseUrlDev: string = 'http://54.176.169.179:3084';

export const isDev: boolean = true;

export const baseUrl: string = isDev ? baseUrlDev : baseUrlDev;

export const signUpUrl: string = `${baseUrl}/api/v1/users/auth/signUp`;

export const recentOrder: string = `${baseUrl}/api/v1/order/recentOrder?limit=10`;

export const getAllProducts: string = `${baseUrl}/api/v1/items/getItem`;

export const placeOrderUrl: string = `${baseUrl}/api/v1/order/place`;

export const revertOrderUrl: string = `${baseUrl}/api/v1/order/revertItem`;

export const getOrderDetails = (limit: number, page: number) =>
  `${baseUrl}/api/v1/order/recentOrder?limit=${limit}`;

export const repeatOrderUrl: string = `${baseUrl}/api/v1/order/repeatOrder`;

export const logOutUrl: string = `${baseUrl}/api/v1/users/auth/logout`;

export const getCategories: string = `${baseUrl}/api/v1/category/getCategories`;

export const getSuggested: string = `${baseUrl}/api/v1/suggested-product/getSuggestedProduct`;

export const createSuggested: string = `${baseUrl}/api/v1/suggested-product/create`;

export const getTransactionHistoryUrl: string = `${baseUrl}/api/v1/order/gettransactionHistory`;

export const historyByMonthUrl: string = `${baseUrl}/api/v1/order/getMonthlyOrderAmount`;

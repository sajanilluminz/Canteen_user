import {navigationRef} from 'App';
import axios from 'axios';
import {RoutesName} from '~constants/routes';
import exportObj from '~state/store';

export const getApiCall = async (params: any) => {
  let url = params.url;
  const {store} = exportObj;
  let config = params.config;
  let headers = params.headers;

  console.log('Request Start =================================');
  console.log('url : ', url);
  console.log('headers : ', headers);
  console.log('params : ', params);
  console.log('Request End =================================');

  try {
    const response = await axios.get(url, config ? config : {headers});
    console.log('Result Start =================================');
    console.log('Data : ', JSON.stringify(response.data));
    console.log('Result End =================================');
    return Promise.resolve(response);
  } catch (error: any) {
    if (error?.response?.data?.status === 401) {
      store.dispatch({type: 'signUp/logOutUser'});
      navigationRef.navigate(RoutesName.GET_STARTED);
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
};

export const postApiCall = async (params: any) => {
  let url = params.url;
  const {store} = exportObj;
  let headers = params.headers ?? {};
  let config = {headers};
  let data = params.data;

  console.log('Request Start =================================');
  console.log('url : ', url);
  console.log('headers : ', headers);
  console.log('params : ', data);
  console.log('Request End =================================');

  try {
    const response = await axios.post(url, data, config);
    console.log('Result Start =================================');
    console.log('Data : ', JSON.stringify(response.data));
    console.log('Result End =================================');
    return Promise.resolve(response);
  } catch (error: any) {
    if (error?.response?.data?.status === 401) {
      store.dispatch({type: 'signUp/logOutUser'});
      navigationRef.navigate(RoutesName.GET_STARTED);
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
};

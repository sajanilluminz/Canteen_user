import moment from 'moment';
import {placeOrderUrl} from '~constants/baseurl';
import {RoutesName} from '~constants/routes';
import {postApiCall} from '~state/slices/apiManager';
import {IproductObj} from '~state/slices/commonTypes';
import {updateOrderHistory} from '~state/slices/orderHistory/orderHistorySlice';
import {updateRecentOrdersData} from '~state/slices/recentitems/recentSlice';
import {userbalanceAddition} from '~state/slices/signup/signupSlice';

export type IPlaceOrderArguments = {
  data: IproductObj;
  token: string;
};

export type IPlaceOrderApiProps = {
  itemId: string;
  price: number;
  quantity: number;
};

export const placeOrder = async ({
  data,
  token,
  navigation,
  dispatch,
  nextRoute,
  setLoadingState,
  toast,
}: {
  data: IproductObj;
  token: string;
  nextRoute?: string;
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
  toast: any;
  dispatch: any;
}) => {
  setLoadingState(true);
  let amount =
    (data.price && data.quantity && data.price * data?.quantity) ?? 0;
  var apiArgs = {
    items: [
      {
        itemId: data.itemId,
        price:
          (data.price && data.quantity && data.price * data?.quantity) ?? 0,
        quantity: data.quantity,
      },
    ],
  };

  let headers = {Authorization: `Bearer ${token}`};

  return await postApiCall({url: placeOrderUrl, data: apiArgs, headers})
    .then(response => {
      var res = response.data?.data;
      var utcdate = moment.utc().format().toString();
      console.log(response.data.data, 'Data');
      // var price = res?.items[0]?.price;
      dispatch(
        updateRecentOrdersData([
          {
            itemId: data.itemId,
            price: data.price,
            quantity: data.quantity,
            createdAt: utcdate,
            orderId: res?._id,
            payStatus: 'pending',
            image: data.image,
            name: data.name,
            isActive: data.isActive,
            isDeleted: data.isDeleted,
            category: data.category,
          },
        ]),
      );
      dispatch(
        updateOrderHistory({
          itemId: data.itemId,
          price: data.price,
          quantity: data.quantity,
          createdAt: utcdate,
          orderId: res?._id,
          payStatus: 'pending',
          image: data.image,
          name: data.name,
          isActive: data.isActive,
          isDeleted: data.isDeleted,
          category: data.category,
        }),
      );
      dispatch(userbalanceAddition(amount));
      setLoadingState(false);
      navigation.push(RoutesName.CONFIRMATION, {
        nextRouteName: nextRoute,
      });
    })
    .catch(error => {
      setLoadingState(false);
      if (error?.response) {
        toast.show(`${error?.response?.data?.message}`, {type: 'error'});
      } else {
        toast.show(`${error.message}`, {type: 'error'});
      }
      toast.hideAll();
      console.log(error);
    });
};

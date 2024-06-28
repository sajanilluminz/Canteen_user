import {revertOrderUrl} from '~constants/baseurl';
import {RoutesName} from '~constants/routes';
import {postApiCall} from '~state/slices/apiManager';
import {removeItemFromOrderHistory} from '~state/slices/orderHistory/orderHistorySlice';
import {deleteRevertedElemfromRecentOrders} from '~state/slices/recentitems/recentSlice';
import {userbalanceSubtraction} from '~state/slices/signup/signupSlice';

export interface IRevertOrderData {
  itemId: string;
  price: number;
  orderId: string | undefined;
  quantity: number;
}

export const revertOrder = async ({
  data,
  token,
  setLoadingState,
  dispatch,
  navigation,
  nextRoute,
  index,
  toast,
}: {
  data: IRevertOrderData;
  token: string;
  setLoadingState: (value: React.SetStateAction<boolean>) => void;
  dispatch: any;
  index: number;
  navigation: any;
  nextRoute: string;
  toast: any;
}) => {
  setLoadingState(true);
  let amount = data.price * data.quantity;
  var apiArgs = {
    items: [
      {
        itemId: data.itemId,
        price: amount,
        quantity: data.quantity,
      },
    ],
    orderId: data.orderId,
  };
  let headers = {Authorization: `Bearer ${token}`};
  return postApiCall({url: revertOrderUrl, data: apiArgs, headers})
    .then(res => {
      var createdAt = res.data.data.createdAt;

      console.log(createdAt, 'createAt');
      setLoadingState(false);
      navigation.push(RoutesName.REVERT_ORDER, {
        nextRoute,
      });
      dispatch(deleteRevertedElemfromRecentOrders(index));
      dispatch(
        removeItemFromOrderHistory({
          createdAt: createdAt,
          itemId: data.itemId,
        }),
      );
      dispatch(userbalanceSubtraction(amount));
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

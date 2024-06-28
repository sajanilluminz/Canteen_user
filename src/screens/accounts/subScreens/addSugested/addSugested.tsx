import React, {useState} from 'react';
import SafeArea from '~components/SafeArea/safeArea';
import HeaderWithBack from '~components/headerWithBack/headerWithBack';
import {useNavigation} from '@react-navigation/native';
import TextInputField from '~components/textInput/textInput';
import Greenbutton from '~components/greenbutton/greenbutton';
import {View} from 'react-native';
import {scaledValue, colors} from '~utils/styles.common';
import axios from 'axios';
import {createSuggested} from '~constants/baseurl';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import {useAppSelector} from '~state/store';
import {useDispatch} from 'react-redux';
import {updateSuggestions} from '~state/slices/suggestedSlice/suggestedSlice';
import {IsuggestedDataProps} from '~state/slices/suggestedSlice/suggestedTypes';
import {useToast} from 'react-native-toast-notifications';
import {decodeDate} from '~screens/homeScreen/views/getTime';
import AnimatedLoader from '~components/animatedLoader';
const AddSugested = () => {
  const navigation = useNavigation<any>();
  const toast = useToast();
  const details = useAppSelector(getUserDetails);
  const [suggestedName, setSuggestedName] = useState<any>('');
  const [loadingState, setLoadingState] = useState(false);
  const [suggestedPrice, setSuggestedPrice] = useState<any>('');
  const [clickable, setClickable] = useState(true);
  const dispatch = useDispatch<any>();
  var suggestionObj: IsuggestedDataProps;
  const AddSugession = async () => {
    if (clickable === true) {
      if (suggestedName.trim() !== '' && suggestedPrice.trim() !== '') {
        if (suggestedPrice > 0 && suggestedPrice.match(/^[0-9]+$/) !== null) {
          try {
            setLoadingState(true);
            const response = await axios.post(
              createSuggested,
              {
                name: suggestedName,
                price: suggestedPrice,
                categoryId: '638f1f16d08ce4f96030320f',
                image: '62983f3bd953867435876fd4',
              },
              {
                headers: {
                  Authorization: `Bearer ${details.token}`,
                },
              },
            );
            if (response.data !== null) {
              setLoadingState(false);
              var res = response.data.data;
              let date = decodeDate(res.createdAt);
              suggestionObj = {
                name: res.name,
                price: res.price,
                status: res.productStatus,
                reason: '',
                date: date,
                showHeader: true,
              };
              dispatch(updateSuggestions(suggestionObj));
              navigation.goBack();
            }
          } catch (error: any) {
            setLoadingState(false);
            console.log(error);
            if (error?.response) {
              toast.show(`${error?.response?.data?.message}`, {type: 'error'});
            } else {
              toast.show(`${error.message}`, {type: 'error'});
            }
            toast.hideAll();
          }
        } else {
          toast.show(`${'please enter a correct amount'}`, {
            type: 'error',
          });
          toast.hideAll();
        }
      } else {
        toast.show(`${'All fields are Mandatory'}`, {
          type: 'error',
        });
        toast.hideAll();
      }
    }
  };
  return (
    <SafeArea background={colors.white}>
      <HeaderWithBack
        buttonPress={() => navigation.goBack()}
        title={'Add Suggestion'}
      />
      <TextInputField
        inputHeading={'Product Name'}
        placeholder={'Enter product name'}
        maxLength={20}
        textChangeExecutor={(e: any) => setSuggestedName(e)}
        value={suggestedName}
      />
      <TextInputField
        inputHeading={'Price (₹)'}
        placeholder={'Enter product price'}
        type={'numeric'}
        maxLength={3}
        textChangeExecutor={(e: any) => setSuggestedPrice(e)}
        value={suggestedPrice}
      />
      <View
        style={{
          marginTop: scaledValue(40),
          width: '100%',
          alignSelf: 'center',
        }}>
        <Greenbutton
          buttonPress={() => {
            if (clickable === true) {
              setClickable(false);
              AddSugession();
            }
            setTimeout(() => {
              setClickable(true);
            }, 3000);
          }}
          buttonTitle={'Submit'}
        />
        {loadingState && <AnimatedLoader />}
      </View>
    </SafeArea>
  );
};

export default AddSugested;

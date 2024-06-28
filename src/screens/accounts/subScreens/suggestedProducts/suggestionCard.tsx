import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {BUTTON, DUMY_IMG} from '~assets';
import Tooltip from 'react-native-walkthrough-tooltip';
import Price from '~components/price/price';

const SuggestionCard = (item: {
  showHeader: any;
  date:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  name:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  status: number;
  reason:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  price: string | number | undefined;
}) => {
  const [displayTooltip, setDisplayTooltip] = useState(false);
  return (
    <View>
      {item.showHeader && <Text style={styles.date}>{item.date}</Text>}
      <View style={styles.newItemCardView}>
        <View style={styles.newItemCardLeftView}>
          <View style={styles.imageView}>
            <Image style={styles.mainImage} source={DUMY_IMG} />
          </View>
          <View style={styles.quantityDeatailsView}>
            {/* <Text style={styles.categroyText}>Snacks</Text> */}
            <Text style={styles.productHeading}>{item.name}</Text>

            {item.status === 0 && (
              <View style={styles.pendingContainer}>
                <Text style={styles.pending}>Pending</Text>
              </View>
            )}
            {item.status === 1 && (
              <View style={styles.approvedContainer}>
                <Text style={styles.approved}>Approved</Text>
              </View>
            )}
            {item.status === 2 && (
              <View style={{flexDirection: 'row'}}>
                <View style={styles.RejectedContainer}>
                  <Text style={styles.rejected}>Rejected</Text>
                </View>
                <Tooltip
                  isVisible={displayTooltip}
                  arrowSize={{
                    width: 16,
                    height: 16,
                  }}
                  topAdjustment={Platform.OS === 'android' ? -25 : 10}
                  content={<Text style={{color: 'black'}}>{item.reason}</Text>}
                  placement="center"
                  showChildInTooltip={false}
                  onClose={() => setDisplayTooltip(false)}>
                  <TouchableOpacity
                    onPress={() => {
                      setDisplayTooltip(true);
                    }}>
                    <Image source={BUTTON} style={styles.button} />
                  </TouchableOpacity>
                </Tooltip>
              </View>
            )}
          </View>
        </View>
        <View style={styles.newItemRightView}>
          <View style={styles.priceAndTimeContainer}>
            <Price fontSize={20} amount={item.price} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SuggestionCard;

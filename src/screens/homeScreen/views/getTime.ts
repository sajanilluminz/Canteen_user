import moment from 'moment';

export const getOrderTime = (utcTimeOrder: string) => {
  var date = moment.utc(utcTimeOrder).format('YYYY-MM-DD HH:mm:ss');
  var stillUtc = moment.utc(date).toDate();
  var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
  return local;
};

export const decodeDate = (orderDate: string | null | undefined) => {
  if (orderDate) {
    var date = moment.utc(orderDate).format('DD MMM, YYYY');
    return date;
  }
  return '';
};

export const dayWithoutYear = (utcTimeOrder: string) => {
  var date = moment.utc(utcTimeOrder).format('YYYY-MM-DD HH:mm:ss');
  var stillUtc = moment.utc(date).toDate();
  var local = moment(stillUtc).local().format('DD MMM');
  return local;
};

export const transactionDateFormat = (utcTimeOrder: string) => {
  var date = moment.utc(utcTimeOrder).format('YYYY-MM-DD HH:mm:ss');
  var stillUtc = moment.utc(date).toDate();
  var local = moment(stillUtc).local().format('MMM DD,YYYY "at" H:mm');
  return local;
};

import moment from 'moment';

export const getTimeInsec = (elem: any, minutes: number) => {
  let currentDate = new Date();
  const orderDate = new Date(elem);
  let futureOrderDate = orderDate.setMinutes(orderDate.getMinutes() + minutes);
  let ts = (futureOrderDate - currentDate.getTime()) / 1000;
  return ts;
};

export const getDate = (date: string) => {
  var formattedDate = moment(date).format('DD MMM, YYYY');
  return formattedDate;
};

export const getMonth = (date: string) => {
  var formattedDate = moment(date).format('MMMM, YYYY');
  return formattedDate;
};

export const getDateTime = (date: string) => {
  var formattedDate = moment(date).format('MMMM DD, hh:mm a'); //'October 25, 8:14 PM'
  return formattedDate;
};

export function getMonthNumberFromName(monthName: string) {
  return new Date(`${monthName} 1, 2022`).getMonth() + 1;
}

export const getStartDate = ({
  monthId,
  year,
}: {
  monthId: string;
  year: number;
}) => {
  let date = `${monthId}/10/${year}`;

  let start = moment(date).startOf('M').format('YYYY-MM-DD');
  let end = moment(date).endOf('M').format('YYYY-MM-DD');
  return {start, end};
};

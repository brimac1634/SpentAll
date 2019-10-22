import moment from 'moment';

export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const formatDate = date => {
  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export const checkDateRange = (dateToCompare, startDate, endDate) => {
  const date = moment(dateToCompare).second(1);
  const startEnd = moment(startDate).hour(23).minute(59).second(59);
  const endEnd = moment(endDate).hour(23).minute(59).second(59);
  const startBegin = moment(startDate).hour(0).minute(0).second(0);
  const endBegin = moment(endDate).hour(0).minute(0).second(0);
  return (date >= startBegin && date <= endEnd) || (date <= startEnd && date >= endBegin)
}
import moment from 'moment';

export const numberWithCommas = (x, decimal, alwaysDecimal) => {
  if (!x) return 0;
  const number = decimal && (x % 1 !== 0 || alwaysDecimal) ?  Number(x).toFixed(2) : Number(x).toFixed(0);
  const numString = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numString
}

export const monthNames = [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'Jun', 'Jul',
  'Aug', 'Sep', 'Oct',
  'Nov', 'Dec'
];

export const correctTimezone = date => {
  if (!date) return '';
  const timezoneOffsetMinutes = date.getTimezoneOffset();
  const setMinutes = date.getMinutes() - timezoneOffsetMinutes;
  date.setMinutes(setMinutes);
  return date
}

export const getShortMonth = date => {
  if (!date) return '';
  const monthIndex = date.getMonth();
  return monthNames[monthIndex];
}

export const formatDate = (dateParam, short) => {
  if (!dateParam) return '';
  const date = new Date(dateParam)
  const month = getShortMonth(date);
  const day = date.getDate();
  
  if (short) return day + ' ' + month

  const year = date.getFullYear();
  return day + ' ' + month + ' ' + year;
}

export const dateAndTime = date => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short' 
  });
}

export const checkDateRange = (dateToCompare, startDate, endDate) => {
  const date = moment(dateToCompare).second(1);
  const startEnd = moment(startDate).hour(23).minute(59).second(59);
  const endEnd = moment(endDate).hour(23).minute(59).second(59);
  const startBegin = moment(startDate).hour(0).minute(0).second(0);
  const endBegin = moment(endDate).hour(0).minute(0).second(0);
  return (date >= startBegin && date <= endEnd) || (date <= startEnd && date >= endBegin)
}

export const sortProperties = obj => {
  let sortable=[];
  for(var key in obj)
    if(obj.hasOwnProperty(key))
      sortable.push([key, obj[key]]);

  sortable.sort((a, b) => b[1]-a[1]);
  return sortable;
}

export const validatePassword = password => {
  return password.length >= 8;
}

export const validateEmail = email => {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
}

export const lightenDarkenColor = (col, amt) => {
    var usePound = false;
    if (col[0] === '#') {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  
}
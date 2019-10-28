import moment from 'moment';

export const numberWithCommas = (x, decimal) => {
  const number = decimal && x % 1 !== 0 ?  Number(x).toFixed(2) : x;
  const numString = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numString
}

export const formatDate = (date, short) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct',
    'Nov', 'Dec'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  if (short) return day + ' ' + monthNames[monthIndex]

  const year = date.getFullYear();
  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export const dateAndTime = date => {
  const dateToFormat = new Date(date)
  const timezoneOffsetMinutes = dateToFormat.getTimezoneOffset();
  const setMinutes = dateToFormat.getMinutes() - timezoneOffsetMinutes;
  dateToFormat.setMinutes(setMinutes);
  return dateToFormat.toLocaleDateString('en-US', { 
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
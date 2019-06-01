import moment from 'moment';
const isTheSameDay = (firstDate: Date, secondDate: Date) => firstDate.getDate() === secondDate.getDate();
const isTheSameMonth = (firstDate: Date, secondDate: Date) => firstDate.getMonth() === secondDate.getMonth();
const isTheSameYear = (firstDate: Date, secondDate: Date) => firstDate.getFullYear() === secondDate.getFullYear();

export const areTheyTheSameDate = (firstDate: Date, secondDate: Date) =>
  isTheSameDay(firstDate, secondDate) && isTheSameMonth(firstDate, secondDate) && isTheSameYear(firstDate, secondDate);

export const formatDate = (date?: Date, absolute?: boolean, format?: string) => {
  if (typeof date === 'undefined') {
    date = new Date();
  }

  if (typeof format === 'undefined') {
    format = 'MMM Do YY';
  }

  return absolute ? moment(date).format(format) : moment(date).fromNow();
};

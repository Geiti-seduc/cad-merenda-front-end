/* eslint-disable no-magic-numbers */
const THIRTY_DAYS = (30 * 24 * 60 * 60 * 1000);
const FIFTEEN_DAYS = (15 * 24 * 60 * 60 * 1000);

export const decideState = (date) => {
  const [day, month, year] = date.split('/');
  const reformattedDate = `${month}/${day}/${year}`;

  const currentDate = new Date();
  const expirationDate = new Date(reformattedDate);
  if (expirationDate - currentDate <= THIRTY_DAYS
    && expirationDate - currentDate >= FIFTEEN_DAYS) {
    return 'warn';
  }
  if (expirationDate - currentDate > THIRTY_DAYS) {
    return 'ok';
  }
  if (expirationDate < currentDate) {
    return 'expired';
  }

  return 'danger';
};

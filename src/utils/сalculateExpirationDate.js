const tokenExpiryDuration = 3600 * 12;


export default function calculateExpirationDate() {
  const expirationDate = new Date().getTime() + tokenExpiryDuration * 1000;
  return expirationDate;
}
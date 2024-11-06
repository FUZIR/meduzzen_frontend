const tokenExpiryDuration = 3600;


export default function CalculateExpirationDate() {
  return new Date().getTime() + tokenExpiryDuration * 1000;
}
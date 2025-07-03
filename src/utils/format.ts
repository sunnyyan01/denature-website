export function timeFormat(timestamp: number) {
  let dateObj = new Date(timestamp * 1000);
  return dateObj.toISOString().replace("T", " ").replace(/:[0-9]{2}\.[0-9]{3}Z/,"");
}
export function currencyFormat(cents: number) {
  return "$" + (cents / 100).toFixed(2);
}
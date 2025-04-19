export function formatDate(startDate, endDate) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formatted = `${startDate.toLocaleDateString(
    "en-US",
    options
  )} – ${endDate.toLocaleDateString("en-US", options)}`;
  return formatted;
}
export function daysLeft(startDate, endDate) {
  const ms = endDate - startDate;
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

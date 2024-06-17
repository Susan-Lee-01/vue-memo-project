export const getFormattedDate = () => {
  const date = new Date();
  const options = { month: "long", day: "numeric" };
  return date.toLocaleDateString("ko-KR", options);
};

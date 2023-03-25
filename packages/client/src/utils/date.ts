export const epochToDate = (epoch: number) => {
  return new Date(epoch * 1000);
};

export const dateToShort = (date: Date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const h = date.getHours();

  return `${days[date.getDay()]} ${h < 10 ? "0" + h : h}:00`;
};

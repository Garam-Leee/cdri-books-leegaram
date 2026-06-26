export const formatPrice = (price: number) => {
  if (price <= 0) return "-";

  return `${price.toLocaleString()}원`;
};

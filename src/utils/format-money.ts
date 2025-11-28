export function formatCurrency(amount: number): string {
  const format = amount
    .toString()
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + " ") + prev;
    });

    return `${format} đ`
}

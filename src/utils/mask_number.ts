function maskNumber(input: number): string {
  if(!input) return '';
  const strNumber = input.toString();

  if (strNumber.length <= 6) {
    return strNumber;
  }

  const start = strNumber.slice(0, 3);
  const end = strNumber.slice(-3);
  const maskedPart = "*".repeat(strNumber.length - 6);

  return `${start}${maskedPart}${end}`;
}

export default maskNumber;

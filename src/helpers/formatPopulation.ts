export default function numFormatter(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + " billion";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + " million";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + " thousands";
  } else if (num < 1000) {
    return num.toFixed(1) + " hundred";
  } else {
    return num;
  }
}

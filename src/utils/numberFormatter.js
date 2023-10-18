export function formatNumberWithUnit(value) {
  const absValue = Math.abs(value);
  if (absValue >= 1e13) {
    return Math.round(absValue / 1e12).toLocaleString("ko-KR") + "조";
  } else if (absValue >= 1e12) {
    return (
      (absValue / 1e12).toLocaleString("ko-KR", { maximumFractionDigits: 1 }) +
      "조"
    );
  } else if (absValue >= 1e9) {
    return Math.round(absValue / 1e8).toLocaleString("ko-KR") + "억";
  } else if (absValue >= 1e8) {
    return (
      (absValue / 1e8).toLocaleString("ko-KR", { maximumFractionDigits: 1 }) +
      "억"
    );
  } else if (absValue >= 1e5) {
    return Math.round(absValue / 1e4).toLocaleString("ko-KR") + "만";
  } else if (absValue >= 1e4) {
    return (
      (absValue / 1e4).toLocaleString("ko-KR", { maximumFractionDigits: 1 }) +
      "만"
    );
  } else if (absValue >= 1e3) {
    return (
      (absValue / 1e3).toLocaleString("ko-KR", { maximumFractionDigits: 1 }) +
      "천"
    );
  } else {
    return value.toString();
  }
}

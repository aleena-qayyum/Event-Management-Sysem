const parse = (localDate) => {
  const [y, m, d] = localDate.split("-").map(Number);
  return new Date(y, m - 1, d); // local date, so no timezone shift
};

export const formatDate = (localDate) => {
  if (!localDate) return "Date TBA";
  return parse(localDate).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const dateParts = (localDate) => {
  if (!localDate) return null;
  const dt = parse(localDate);
  return {
    day: dt.getDate(),
    month: dt.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
  };
};

export const formatTime = (time) => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};
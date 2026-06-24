export const formatDate = (d) => {
  if (!d) return "—";
  try { return new Date(d).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" }); }
  catch { return "—"; }
};
export const formatMoney = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(Number(n || 0));
export const formatKg = (n) => `${Number(n || 0).toFixed(2)} kg`;

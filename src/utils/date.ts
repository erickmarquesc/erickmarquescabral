const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function parse(value: string) {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

export function formatMonth(value: string) {
  const { year, month } = parse(value);
  return `${MONTHS[month - 1]} ${year}`;
}

/** Duração no mesmo critério do LinkedIn: conta o mês de início e o de fim. */
export function formatDuration(start: string, end?: string) {
  const from = parse(start);
  const now = new Date();
  const to = end ? parse(end) : { year: now.getFullYear(), month: now.getMonth() + 1 };
  const total = (to.year - from.year) * 12 + (to.month - from.month) + 1;

  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
  if (months) parts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
  return parts.join(" e ");
}

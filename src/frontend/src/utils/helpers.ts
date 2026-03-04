export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function currentYear(): number {
  return new Date().getFullYear();
}

export function getYears(from = 2015): number[] {
  const yr = currentYear();
  const years: number[] = [];
  for (let y = yr; y >= from; y--) years.push(y);
  return years;
}

export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function ageFromBigInt(age: bigint): string {
  return age?.toString() ?? "0";
}

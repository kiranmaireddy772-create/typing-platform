export function getLocalDateKey(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getPast7DateKeys(todayStr: string = getLocalDateKey()): string[] {
  const dates: string[] = [];
  const parts = todayStr.split("-");
  const baseDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));

  for (let i = 6; i >= 0; i--) {
    const target = new Date(baseDate);
    target.setDate(baseDate.getDate() - i);
    dates.push(getLocalDateKey(target));
  }
  return dates;
}

export function isConsecutiveDay(lastDateStr: string, currentDateStr: string): boolean {
  if (!lastDateStr || !currentDateStr) return false;
  const p1 = lastDateStr.split("-");
  const p2 = currentDateStr.split("-");

  const d1 = new Date(Number(p1[0]), Number(p1[1]) - 1, Number(p1[2]));
  const d2 = new Date(Number(p2[0]), Number(p2[1]) - 1, Number(p2[2]));

  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  return diffDays === 1;
}

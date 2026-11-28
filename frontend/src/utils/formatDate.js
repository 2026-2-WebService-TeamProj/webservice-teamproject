// "2026-11-27T22:00:55" → "2026년 11월 27일"
export function formatDate(isoString) {
  const date = new Date(isoString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

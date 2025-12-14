export function getRelativeDueDate(input: string | Date): string {
  const now = new Date();
  const date = new Date(input);

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfTarget = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffMs = startOfTarget.getTime() - startOfToday.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;

  if (diffDays < -1 && diffDays > -7) return `${Math.abs(diffDays)} days ago`;

  const diffWeeks = Math.round(diffDays / 7);

  if (diffWeeks === 1) return "In a week";
  if (diffWeeks === -1) return "A week ago";

  if (diffWeeks > 1 && diffWeeks < 5) return `In ${diffWeeks} weeks`;

  if (diffWeeks < -1 && diffWeeks > -5)
    return `${Math.abs(diffWeeks)} weeks ago`;

  const diffMonths =
    date.getMonth() -
    now.getMonth() +
    12 * (date.getFullYear() - now.getFullYear());

  if (diffMonths === 1) return "In a month";
  if (diffMonths === -1) return "A month ago";

  if (diffMonths > 1) return `In ${diffMonths} months`;
  if (diffMonths < -1) return `${Math.abs(diffMonths)} months ago`;

  return date.toDateString();
}

/**
 * Format a YYYY-MM-DD string as e.g. "Jun 21, 2026" for display.
 *
 * Parses the parts directly instead of `new Date(str)` so there is NO timezone
 * shift (new Date('2026-06-21') is UTC midnight and can render as the previous
 * day in negative-offset zones) and the output is build-deterministic.
 */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(d: string): string {
    const [y, mo, day] = d.split('-');
    return `${MONTHS[Number(mo) - 1]} ${Number(day)}, ${y}`;
}

import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

export function formatDateToTimeAgo(dateStr) {
  const date = new Date(dateStr);
  return format(date, 'ko');
}

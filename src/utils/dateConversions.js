import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import ko from 'date-fns/locale/ko';

export function formatDateToTimeAgo(dateStr) {
  const date = new Date(dateStr);
  return formatDistanceToNowStrict(date, { addSuffix: true, locale: ko});
}

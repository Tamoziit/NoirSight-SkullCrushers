import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const timeAgo = (createdAt: string) => {
  return dayjs(createdAt).fromNow(); // e.g., "3 hours ago"
};

export default timeAgo;

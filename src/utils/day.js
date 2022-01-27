import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(relativeTime);
/**
 * 格式化为utc展示时间
 *
 * @param {number|string} time 时间戳
 * @param {string} format 格式化方式
 * @return {string} utc时间展示
 */
export const formatUTCTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => `${dayjs.utc(time).format(format)}`;

/**
 *
 * 格式化为本地展示时间
 *
 * @param {number|string} time 时间戳
 * @param {string} format 格式化方式
 * @return {string} 本地时间展示
 */
export const formatLocalTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => `${dayjs.utc(time).local().format(format)}`;

export const fromNow = (date) => dayjs(date).fromNow();

export default dayjs;

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
export function formatUTCTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
    return `${dayjs.utc(Number(time)).format(format)}`;
}

/**
 *
 * 格式化为本地展示时间
 *
 * @param {number|string} time 时间戳
 * @param {string} format 格式化方式
 * @return {string} 本地时间展示
 */
export function formatLocalTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
    return `${dayjs.utc(Number(time)).local().format(format)}`;
}

export default dayjs;

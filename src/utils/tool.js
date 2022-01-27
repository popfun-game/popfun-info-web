/**
 * 获取精度
 *
 * @param {string|number} val 需要计算精度的数字
 *
 * @returns {udefined|number} 如果不合法返回undefined
 */
export const getPrecision = (val) => {
    const strVal = String(val);
    const findDotIndex = strVal.indexOf('.');

    if (strVal >= 1) {
        return 2;
    } if (findDotIndex !== -1) {
        const len = strVal.slice(findDotIndex + 1).length;

        return Math.min(8, len);
    }

    return undefined;
};

/**
 * 延时执行
 *
 * @param {number} time 延时 时长
 * @returns {Promise}
 */
export const sleep = (time = 1000) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, time);
});

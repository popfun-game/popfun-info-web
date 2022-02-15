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
 * 获取项目活跃等级 🔥个数
 * @param {String|number} val 数值
 * @returns {number} 火苗个数
 */
export const getActiveLevel = (val) => {
    if (!val) return 0;

    if (!val) {
        return 0;
    }

    if (val > 500000) {
        return 5;
    }

    if (val > 100000) {
        return 4;
    }

    if (val > 10000) {
        return 3;
    }

    if (val > 1000) {
        return 2;
    }

    return 1;
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

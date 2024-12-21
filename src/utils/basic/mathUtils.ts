/**
 * 基础数学运算函数集合
 */

export class MathUtils {
    /**
     * 计算两个数的和
     */
    static add(a: number, b: number): number {
        return a + b;
    }

    /**
     * 计算数组的总和
     */
    static sum(numbers: number[]): number {
        if (!numbers || numbers.length === 0) {
            return 0;
        }
        return numbers.reduce((acc, curr) => acc + curr, 0);
    }

    /**
     * 计算数组的平均值
     */
    static average(numbers: number[]): number {
        if (!numbers || numbers.length === 0) {
            return 0;
        }
        return this.sum(numbers) / numbers.length;
    }

    /**
     * 找出数组中的最大值
     */
    static findMax(numbers: number[]): number | null {
        if (!numbers || numbers.length === 0) {
            return null;
        }
        return Math.max(...numbers);
    }

    /**
     * 找出数组中的最小值
     */
    static findMin(numbers: number[]): number | null {
        if (!numbers || numbers.length === 0) {
            return null;
        }
        return Math.min(...numbers);
    }

    /**
     * Calculate array coverage (percentage of non-empty/non-null elements)
     * @param arr Input array
     * @returns Coverage percentage (0-100)
     */
    static getArrayCoverage<T>(arr: T[]): number {
        if (!arr || arr.length === 0) return 0;
        
        const validElements = arr.filter(item => item !== null && item !== undefined).length;
        return validElements;
    }

    /**
     * 计算数组中非空元素的百分比
     */
    static getArrayCoveragePercentage(arr: any[]): number {
        const validElements = this.getArrayCoverage(arr);
        return (validElements / arr.length) * 100;
    }
} 
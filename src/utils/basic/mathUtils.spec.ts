import { describe, it, expect } from 'vitest';
import { MathUtils } from './mathUtils';

describe('MathUtils', () => {
    describe('add', () => {
        it('should return the sum of two numbers', () => {
            expect(MathUtils.add(1, 2)).toBe(3);
            expect(MathUtils.add(-1, 1)).toBe(0);
            expect(MathUtils.add(0, 0)).toBe(0);
        });
    });

    describe('sum', () => {
        it('should return the sum of an array of numbers', () => {
            expect(MathUtils.sum([1, 2, 3, 4])).toBe(10);
            expect(MathUtils.sum([-1, -2, -3, -4])).toBe(-10);
            expect(MathUtils.sum([])).toBe(0);
        });
    });

    describe('average', () => {
        it('should return the average of an array of numbers', () => {
            expect(MathUtils.average([1, 2, 3, 4])).toBe(2.5);
            expect(MathUtils.average([-1, -2, -3, -4])).toBe(-2.5);
            expect(MathUtils.average([])).toBe(0);
        });
    });

    describe('findMax', () => {
        it('should return the maximum value in an array of numbers', () => {
            expect(MathUtils.findMax([1, 2, 3, 4])).toBe(4);
            expect(MathUtils.findMax([-1, -2, -3, -4])).toBe(-1);
            expect(MathUtils.findMax([])).toBeNull();
        });
    });

    describe('findMin', () => {
        it('should return the minimum value in an array of numbers', () => {
            expect(MathUtils.findMin([1, 2, 3, 4])).toBe(1);
            expect(MathUtils.findMin([-1, -2, -3, -4])).toBe(-4);
            expect(MathUtils.findMin([])).toBeNull();
        });
    });

    describe('getArrayCoverage', () => {
        it('should return the count of non-null/non-undefined elements in an array', () => {
            expect(MathUtils.getArrayCoverage([1, 2, null, 4, undefined])).toBe(3);
            expect(MathUtils.getArrayCoverage([null, null, null])).toBe(0);
            expect(MathUtils.getArrayCoverage([])).toBe(0);
        });
    });

    describe('getArrayCoveragePercentage', () => {
        it('should return the percentage of non-null/non-undefined elements in an array', () => {
            expect(MathUtils.getArrayCoveragePercentage([1, 2, null, 4, undefined])).toBe(60);
            expect(MathUtils.getArrayCoveragePercentage([null, null, null])).toBe(0);
            expect(MathUtils.getArrayCoveragePercentage([])).toBeNaN(); // Handle empty array case
        });
    });
});

import { describe, it, expect } from 'vitest';
import { ArrayUtils } from './arrayUtils';

describe('ArrayUtils', () => {

  describe('sort', () => {
    it('should return an empty array when input is empty', () => {
      expect(ArrayUtils.sort([])).toEqual([]);
    });

    it('should sort numbers in ascending order by default', () => {
      expect(ArrayUtils.sort([3, 1, 2])).toEqual([1, 2, 3]);
    });

    it('should sort strings in ascending order by default', () => {
      expect(ArrayUtils.sort(['b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should use custom compare function if provided', () => {
      const compareFunc = (a: number, b: number) => b - a;
      expect(ArrayUtils.sort([1, 3, 2], compareFunc)).toEqual([3, 2, 1]);
    });
  });

  describe('unique', () => {
    it('should return an empty array when input is empty', () => {
      expect(ArrayUtils.unique([])).toEqual([]);
    });

    it('should remove duplicate numbers', () => {
      expect(ArrayUtils.unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    });

    it('should remove duplicate strings', () => {
      expect(ArrayUtils.unique(['a', 'b', 'b', 'a'])).toEqual(['a', 'b']);
    });
  });

  describe('filter', () => {
    it('should return an empty array when input is empty', () => {
      expect(ArrayUtils.filter([], () => true)).toEqual([]);
    });

    it('should filter numbers based on predicate', () => {
      const predicate = (value: number) => value > 1;
      expect(ArrayUtils.filter([1, 2, 3], predicate)).toEqual([2, 3]);
    });

    it('should filter strings based on predicate', () => {
      const predicate = (value: string) => value !== 'a';
      expect(ArrayUtils.filter(['a', 'b', 'c'], predicate)).toEqual(['b', 'c']);
    });
  });

  describe('chunk', () => {
    it('should return an empty array when input is empty', () => {
      expect(ArrayUtils.chunk([], 2)).toEqual([]);
    });

    it('should return an empty array if chunk size is less than 1', () => {
      expect(ArrayUtils.chunk([1, 2, 3], 0)).toEqual([]);
    });

    it('should chunk array into smaller arrays of given size', () => {
      expect(ArrayUtils.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should handle chunk size larger than array length', () => {
      expect(ArrayUtils.chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
    });
  });

});

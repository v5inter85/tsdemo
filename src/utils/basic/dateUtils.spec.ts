import { describe, it, expect, vi } from 'vitest';
import { DateUtils } from './dateUtils';

describe('DateUtils', () => {
  describe('getCurrentDateTime', () => {
    it('should return the current date and time in ISO format', () => {
      const mockDate = new Date('2024-12-31T23:59:59Z');
      vi.setSystemTime(mockDate);
      const result = DateUtils.getCurrentDateTime();
      expect(result).toBe('2024-12-31T23:59:59.000Z');
    });
  });

  describe('getCurrentDate', () => {
    it('should return the current date in yyyy-MM-dd format', () => {
      const mockDate = new Date('2024-12-31T23:59:59Z');
      vi.setSystemTime(mockDate);
      const result = DateUtils.getCurrentDate();
      expect(result).toBe('2024-12-31');
    });
  });

  describe('getCurrentTime', () => {
    it('should return the current time in HH:mm:ss format', () => {
      const mockDate = new Date('2024-12-31T23:59:59Z');
      vi.setSystemTime(mockDate);
      const result = DateUtils.getCurrentTime();
      expect(result).toBe('23:59:59');
    });
  });

  describe('compareDates', () => {
    it('should return 1 if date1 is greater than date2', () => {
      const date1 = new Date('2024-12-31');
      const date2 = new Date('2024-12-30');
      const result = DateUtils.compareDates(date1, date2);
      expect(result).toBe(1);
    });

    it('should return -1 if date1 is less than date2', () => {
      const date1 = new Date('2024-12-30');
      const date2 = new Date('2024-12-31');
      const result = DateUtils.compareDates(date1, date2);
      expect(result).toBe(-1);
    });

    it('should return 0 if date1 is equal to date2', () => {
      const date1 = new Date('2024-12-31');
      const date2 = new Date('2024-12-31');
      const result = DateUtils.compareDates(date1, date2);
      expect(result).toBe(0);
    });
  });

  describe('isLeapYear', () => {
    it('should return true for a leap year divisible by 4 but not by 100', () => {
      expect(DateUtils.isLeapYear(2024)).toBe(true);
    });

    it('should return false for a year not divisible by 4', () => {
      expect(DateUtils.isLeapYear(2023)).toBe(false);
    });

    it('should return false for a year divisible by 100 but not by 400', () => {
      expect(DateUtils.isLeapYear(1900)).toBe(false);
    });

    it('should return true for a year divisible by 400', () => {
      expect(DateUtils.isLeapYear(2000)).toBe(true);
    });
  });

  describe('formatDate', () => {
    it('should format the date to yyyy-MM-dd', () => {
      const date = new Date('2024-12-31');
      const result = DateUtils.formatDate(date);
      expect(result).toBe('2024-12-31');
    });
  });
});

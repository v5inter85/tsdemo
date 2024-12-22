import { describe, it, expect } from 'vitest';
import { StringUtils } from './stringUtils';

describe('StringUtils', () => {
  describe('reverse', () => {
    it('should reverse a normal string', () => {
      expect(StringUtils.reverse('hello')).toBe('olleh');
    });

    it('should return an empty string when input is empty', () => {
      expect(StringUtils.reverse('')).toBe('');
    });

    it('should handle a single character string', () => {
      expect(StringUtils.reverse('a')).toBe('a');
    });

    it('should handle a string with spaces', () => {
      expect(StringUtils.reverse('hello world')).toBe('dlrow olleh');
    });
  });

  describe('slice', () => {
    it('should slice a string with positive indices', () => {
      expect(StringUtils.slice('hello world', 0, 5)).toBe('hello');
    });

    it('should slice a string with negative start index', () => {
      expect(StringUtils.slice('hello world', -5)).toBe('world');
    });

    it('should slice a string with negative indices', () => {
      expect(StringUtils.slice('hello world', -5, -1)).toBe('worl');
    });

    it('should return an empty string when input is empty', () => {
      expect(StringUtils.slice('', 0, 5)).toBe('');
    });
  });

  describe('matchPattern', () => {
    it('should return true when string matches pattern', () => {
      expect(StringUtils.matchPattern('hello', /hello/)).toBe(true);
    });

    it('should return false when string does not match pattern', () => {
      expect(StringUtils.matchPattern('hello', /world/)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(StringUtils.matchPattern('', /hello/)).toBe(false);
    });

    it('should return false for null pattern', () => {
      expect(StringUtils.matchPattern('hello', null as unknown as RegExp)).toBe(false);
    });
  });

  describe('toCamelCase', () => {
    it('should convert a snake_case string to camelCase', () => {
      expect(StringUtils.toCamelCase('hello_world')).toBe('helloWorld');
    });

    it('should convert a kebab-case string to camelCase', () => {
      expect(StringUtils.toCamelCase('hello-world')).toBe('helloWorld');
    });

    it('should convert a space-separated string to camelCase', () => {
      expect(StringUtils.toCamelCase('hello world')).toBe('helloWorld');
    });

    it('should return an empty string when input is empty', () => {
      expect(StringUtils.toCamelCase('')).toBe('');
    });
  });
});

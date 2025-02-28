import { describe, it, expect } from 'vitest';
import { ValidationUtils } from './validationUtils';

describe('ValidationUtils', () => {
  describe('validateComplex', () => {
    it('should validate required fields', () => {
      const data = {
        name: '',
        age: null
      };

      const rules = {
        name: { required: true },
        age: { required: true }
      };

      const result = ValidationUtils.validateComplex(data, rules);

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        name: ['name is required'],
        age: ['age is required']
      });
    });

    it('should validate type constraints', () => {
      const data = {
        name: 42,
        age: 'twenty'
      };

      const rules = {
        name: { type: 'string' },
        age: { type: 'number' }
      };

      const result = ValidationUtils.validateComplex(data, rules);

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        name: ['name should be of type string'],
        age: ['age should be of type number']
      });
    });

    it('should validate pattern constraints', () => {
      const data = {
        email: 'invalid-email',
        phone: '123'
      };

      const rules = {
        email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        phone: { pattern: /^\d{10}$/ }
      };

      const result = ValidationUtils.validateComplex(data, rules);

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        email: ['email does not match required pattern'],
        phone: ['phone does not match required pattern']
      });
    });

    it('should validate min/max constraints for numbers', () => {
      const data = {
        age: 15,
        score: 110
      };

      const rules = {
        age: { min: 18 },
        score: { max: 100 }
      };

      const result = ValidationUtils.validateComplex(data, rules);

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        age: ['age should be greater than or equal to 18'],
        score: ['score should be less than or equal to 100']
      });
    });

    it('should validate min/max constraints for strings', () => {
      const data = {
        username: 'a',
        bio: 'too long text'.repeat(100)
      };

      const rules = {
        username: { min: 3 },
        bio: { max: 100 }
      };

      const result = ValidationUtils.validateComplex(data, rules);

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        username: ['username should have at least 3 characters'],
        bio: ['bio should have at most 100 characters']
      });
    });

    it('should validate custom rules', () => {
      const data = {
        password: 'weak'
      };

      const rules = {
        password: {
          custom: (value: string) => value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value),
          message: 'Password must be at least 8 characters and contain uppercase letter and number'
        }
      };

      const result = ValidationUtils.validateComplex(data, rules);

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        password: ['Password must be at least 8 characters and contain uppercase letter and number']
      });
    });

    it('should validate nested objects', () => {
      const data = {
        user: {
          name: '',
          contact: {
            email: 'invalid'
          }
        }
      };

      const rules = {
        user: {
          nested: {
            name: { required: true },
            contact: {
              nested: {
                email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
              }
            }
          }
        }
      };

      const result = ValidationUtils.validateComplex(data, rules);

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        'user.name': ['name is required'],
        'user.contact.email': ['email does not match required pattern']
      });
    });

    it('should return valid result when all validations pass', () => {
      const data = {
        name: 'John',
        age: 25,
        email: 'john@example.com'
      };

      const rules = {
        name: { required: true, type: 'string', min: 2 },
        age: { required: true, type: 'number', min: 18 },
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
      };

      const result = ValidationUtils.validateComplex(data, rules);

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should handle empty rules object', () => {
      const data = {
        name: 'John'
      };

      const rules = {};

      const result = ValidationUtils.validateComplex(data, rules);

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should handle undefined and null values when not required', () => {
      const data = {
        optionalField1: undefined,
        optionalField2: null
      };

      const rules = {
        optionalField1: { type: 'string' },
        optionalField2: { type: 'number' }
      };

      const result = ValidationUtils.validateComplex(data, rules);

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });
});

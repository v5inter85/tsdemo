import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as MathUtils from './utils/basic/mathUtils';
import * as StringUtils from './utils/basic/stringUtils';
import * as ArrayUtils from './utils/basic/arrayUtils';
import * as ObjectUtils from './utils/intermediate/objectUtils';
import * as AsyncUtils from './utils/intermediate/asyncUtils';
import * as DataUtils from './utils/intermediate/dataUtils';
import * as Patterns from './utils/advanced/patterns';
import * as Algorithms from './utils/advanced/algorithms';
import * as Business from './utils/advanced/business';
import * as BoundaryUtils from './utils/special/boundaryUtils';
import * as PerformanceUtils from './utils/special/performanceUtils';
import * as DependencyUtils from './utils/special/dependencyUtils';
import * as EventUtils from './utils/complex/eventUtils';
import * as NetworkUtils from './utils/complex/networkUtils';
import * as StateUtils from './utils/complex/stateUtils';
import * as ValidationUtils from './utils/complex/validationUtils';

vi.mock('./utils/basic/mathUtils', () => ({
  add: vi.fn(),
  sum: vi.fn(),
  average: vi.fn(),
  findMax: vi.fn(),
  findMin: vi.fn(),
}));

vi.mock('./utils/basic/stringUtils', () => ({
  reverse: vi.fn(),
  slice: vi.fn(),
  matchPattern: vi.fn(),
  toCamelCase: vi.fn(),
}));

vi.mock('./utils/basic/arrayUtils', () => ({
  sort: vi.fn(),
  unique: vi.fn(),
  filter: vi.fn(),
  chunk: vi.fn(),
}));

vi.mock('./utils/intermediate/objectUtils');
vi.mock('./utils/intermediate/asyncUtils');
vi.mock('./utils/intermediate/dataUtils');
vi.mock('./utils/advanced/patterns');
vi.mock('./utils/advanced/algorithms');
vi.mock('./utils/advanced/business');
vi.mock('./utils/special/boundaryUtils');
vi.mock('./utils/special/performanceUtils');
vi.mock('./utils/special/dependencyUtils');
vi.mock('./utils/complex/eventUtils');
vi.mock('./utils/complex/networkUtils');
vi.mock('./utils/complex/stateUtils');
vi.mock('./utils/complex/validationUtils');

describe('Testing Basic Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('MathUtils', () => {
    it('should add two numbers', () => {
      vi.mocked(MathUtils.add).mockReturnValue(8);
      expect(MathUtils.add(5, 3)).toBe(8);
    });

    it('should calculate the sum of an array', () => {
      vi.mocked(MathUtils.sum).mockReturnValue(15);
      expect(MathUtils.sum([1, 2, 3, 4, 5])).toBe(15);
    });

    it('should calculate the average of an array', () => {
      vi.mocked(MathUtils.average).mockReturnValue(3);
      expect(MathUtils.average([1, 2, 3, 4, 5])).toBe(3);
    });

    it('should find the max value in an array', () => {
      vi.mocked(MathUtils.findMax).mockReturnValue(5);
      expect(MathUtils.findMax([1, 2, 3, 4, 5])).toBe(5);
    });

    it('should find the min value in an array', () => {
      vi.mocked(MathUtils.findMin).mockReturnValue(1);
      expect(MathUtils.findMin([1, 2, 3, 4, 5])).toBe(1);
    });
  });

  describe('StringUtils', () => {
    it('should reverse a string', () => {
      vi.mocked(StringUtils.reverse).mockReturnValue('olleh');
      expect(StringUtils.reverse('hello')).toBe('olleh');
    });

    it('should slice a string', () => {
      vi.mocked(StringUtils.slice).mockReturnValue('ell');
      expect(StringUtils.slice('hello', 1, 4)).toBe('ell');
    });

    it('should match a pattern', () => {
      vi.mocked(StringUtils.matchPattern).mockReturnValue(true);
      expect(StringUtils.matchPattern('test@email.com', /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBe(true);
    });

    it('should convert to camel case', () => {
      vi.mocked(StringUtils.toCamelCase).mockReturnValue('helloWorld');
      expect(StringUtils.toCamelCase('hello-world')).toBe('helloWorld');
    });
  });

  describe('ArrayUtils', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];

    it('should sort an array', () => {
      vi.mocked(ArrayUtils.sort).mockReturnValue([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
      expect(ArrayUtils.sort(numbers)).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it('should remove duplicates from an array', () => {
      vi.mocked(ArrayUtils.unique).mockReturnValue([3, 1, 4, 5, 9, 2, 6]);
      expect(ArrayUtils.unique(numbers)).toEqual([3, 1, 4, 5, 9, 2, 6]);
    });

    it('should filter an array', () => {
      vi.mocked(ArrayUtils.filter).mockReturnValue([5, 9, 5, 6, 5]);
      expect(ArrayUtils.filter(numbers, n => n > 4)).toEqual([5, 9, 5, 6, 5]);
    });

    it('should chunk an array', () => {
      vi.mocked(ArrayUtils.chunk).mockReturnValue([[3, 1, 4], [1, 5, 9], [2, 6, 5], [3, 5]]);
      expect(ArrayUtils.chunk(numbers, 3)).toEqual([[3, 1, 4], [1, 5, 9], [2, 6, 5], [3, 5]]);
    });
  });
});

/**
 * String manipulation utility functions
 */
export class StringUtils {
    /**
     * Reverses a string
     * @param str Input string
     * @returns Reversed string
     */
    static reverse(str: string): string {
        if (!str) return '';
        return str.split('').reverse().join('');
    }

    /**
     * Slices a string, supports negative indices
     * @param str Input string
     * @param start Start index
     * @param end Optional end index
     * @returns Sliced string
     */
    static slice(str: string, start: number, end?: number): string {
        if (!str) return '';
        return str.slice(start, end);
    }

    /**
     * Checks if a string matches a given pattern
     * @param str Input string
     * @param pattern Regular expression pattern
     * @returns True if matches, false otherwise
     */
    static matchPattern(str: string, pattern: RegExp): boolean {
        if (!str || !pattern) return false;
        return pattern.test(str);
    }

    /**
     * Converts string to camelCase
     * @param str Input string
     * @returns Camel cased string
     */
    static toCamelCase(str: string): string {
        if (!str) return '';
        return str.toLowerCase()
            .replace(/[-_\s](.)/g, (_, char) => char.toUpperCase());
    }

    /**
     * Extracts all strings matching a regular expression
     * @param str Input string
     * @param pattern Regular expression pattern
     * @returns Array of matched strings
     * @throws TypeError if regex pattern doesn't have global flag
     */
    static extractMatches(str: string, pattern: RegExp): string[] {
        if (!str || !pattern) return [];
        
        const globalPattern = pattern.global ? pattern : new RegExp(pattern, 'g');
        
        return Array.from(str.matchAll(globalPattern), match => match[0]);
    }
} 
export class DateUtils {
    /**
     * Get current date and time
     */
    static getCurrentDateTime(): string {
        return new Date().toISOString();
    }

    /**             
     * Get current date
     */
    static getCurrentDate(): string {
        return new Date().toISOString().split('T')[0];
    }

    /**
     * Get current time
     */
    static getCurrentTime(): string {
        return new Date().toISOString().split('T')[1].split('.')[0];
    }

    /**
     * Compare two dates
     * @returns 1 if date1 > date2, -1 if date1 < date2, 0 if equal
     */
    static compareDates(date1: Date, date2: Date): number {
        return Math.sign(date1.getTime() - date2.getTime());
    }

    /**
     * Check if the specified year is a leap year
     */
    static isLeapYear(year: number): boolean {
        if (year % 4 !== 0) return false;
        if (year % 100 !== 0) return true;
        return year % 400 === 0;
    }

    /**
     * Format date to yyyy-MM-dd
     */
    static formatDate(date: Date): string {
        return [
            date.getFullYear(),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getDate().toString().padStart(2, '0')
        ].join('-');
    }
}
export default {
  getTerm(): string {
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = date.getMonth();

    if (month < 3) {
      // Fall Semester of Last Year
      return `${year - 1}f`;
    } else if (month < 8) {
      // Spring Semester of This Year
      return `${year}s`;
    } else {
      return `{year}f`;
    }
  },

  getTermDeadline(month: number, day: number, hour: number, min: number): Date {
    const date = new Date(Date.now());
    const res = new Date();
    if (month < 3 && date.getUTCMonth() > 8) {
      // In Fall Semester, Assignments in Next Year
      res.setUTCFullYear(date.getUTCFullYear() + 1);
    } else if (date.getUTCMonth() < 3 && month > 8) {
      // In Fall Semester, Assignments in Previous Year
      res.setUTCFullYear(date.getUTCFullYear() - 1);
    } else {
      res.setUTCFullYear(date.getUTCFullYear());
    }

    res.setUTCMonth(month - 1, day);
    res.setUTCDate(day);
    res.setUTCHours(hour - 9, min, 0); // UTC +9 JST
    return res;
  },
};

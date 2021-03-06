interface IDateProvider {
  compare(end_date: Date): number;
  convertToUtc(date: Date): string;
  compareInDays(start_date: Date, end_date: Date): number;
  dateNow(): Date;
}

export { IDateProvider };

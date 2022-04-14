interface IDateProvider {
  compare(end_date: Date): number;
  convertToUtc(date: Date): string;
}

export { IDateProvider };

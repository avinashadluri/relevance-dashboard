import { FC } from 'react';

export const DateRangeSummary: FC<{ dateRangeStart: string; dateRangeEnd: string }> = ({
  dateRangeStart,
  dateRangeEnd
}) => (
  <p className="text-gray-400 text-sm">
    {dateRangeStart} - {dateRangeEnd}
  </p>
);

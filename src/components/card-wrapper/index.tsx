import { RiFilterLine, RiCheckDoubleLine } from '@remixicon/react';
import { Card } from '@tremor/react';
import { Icon } from '@tremor/react';
import { FC } from 'react';

import { DateRangeSummary } from '@/components/date-range';
import { useMyContext } from '@/components/providers/MainProvider';

export const CardWrapper: FC<{
  showFilter?: boolean;
  heading: string;
  count: number;
  subtext: string;
  showDot?: boolean;
  dotColor?: string;
  classNames?: string;
  children: React.ReactNode;
}> = ({ showFilter, children, heading, count, subtext, showDot, dotColor, classNames }) => {
  const pageData = useMyContext();

  return (
    <Card className={classNames}>
      <div className="flex justify-between items-center">
        <div className="left-content">
          {showDot && dotColor && (
            <span className={`mr-2  w-3 h-3 bg-${dotColor}-500 rounded inline-flex`}></span>
          )}
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content inline-flex">
            {heading}
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {count} <span className="text-xs text-gray-400">{subtext}</span>
          </p>
          <DateRangeSummary
            dateRangeStart={pageData.dateRangeStart}
            dateRangeEnd={pageData.dateRangeEnd}
          />
        </div>
        {showFilter && (
          <div className="absolute top-0 right-0 p-4">
            <Icon
              color="slate"
              size="md"
              icon={RiFilterLine}
              className="items-end cursor-pointer"
              onClick={pageData.togglePopover}
            />
            {pageData.isFilter1Open && (
              <div className="absolute right-0 z-10 w-48 py-2 mt-2 bg-slate-50 border border-gray-300 rounded shadow-lg">
                {pageData.chart_data.labelled_tasks_series.map((option) => (
                  <div
                    key={option.date}
                    onClick={() => pageData.handleOptionClick(option.date)}
                    className="flex justify-between items-center border-b cursor-pointer hover:bg-gray-100"
                  >
                    <div className="left-content">
                      <div className="px-4 py-2">{option.date}</div>
                    </div>
                    {option.date === pageData.selectedFilter1 && (
                      <div className="right-content">
                        <Icon
                          color="green"
                          size="md"
                          icon={RiCheckDoubleLine}
                          className="items-end"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {children}
    </Card>
  );
};

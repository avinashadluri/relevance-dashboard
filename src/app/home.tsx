'use client';

import {
  RiShapesFill,
  RiBookletFill,
  RiPriceTag2Fill,
  RiFilterLine,
  RiCheckDoubleLine,
  RiCalendarScheduleLine,
  RiArrowDropDownLine
} from '@remixicon/react';
import { Card } from '@tremor/react';
import { AreaChart, BarChart, DonutChart, Legend, Icon, Badge } from '@tremor/react';
import { useEffect, useState } from 'react';

import mainData from './data/analytics';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-transparent flex justify-between items-center p-4">
      <div className="text-xl font-bold">Overview</div>
      <div className="flex items-center">
        <button className="text-gray-900 bg-white border border-gray-300  font-medium rounded text-sm px-4 mr-4">
          <Icon color="slate" size="xs" icon={RiCalendarScheduleLine} className="items-end" />
          Date range selected
        </button>
        <div className="relative">
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300  font-medium rounded text-sm px-4"
          >
            All agents{' '}
            <Icon color="slate" size="sm" icon={RiArrowDropDownLine} className="p-0 align-middle" />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
            <a href="#" className="block px-4 py-2">
              Option 1
            </a>
            <a href="#" className="block px-4 py-2">
              Option 2
            </a>
            <a href="#" className="block px-4 py-2">
              Option 3
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

type pageDataProps = {
  agent_icon: string;
  agent_type: string;
  date_range_label: string;
  total_tasks: number;
  waiting_for_approvals: number;
  pending_approval_requests: number;
  labelled_tasks: number;
  active_tasks: number;
  selectedFilter1: string;
  selectedFilter1Count: number;
  isFilter1Open: boolean;
  selectedFilter2: string;
  selectedFilter2Value: number;
  chart_data: {
    total_tasks_series: Array<{ date: string; value: number }>;
    active_tasks_series: Array<{ date: string; value: any }>;
    labelled_tasks_series: Array<{ date: string; value: number }>;
    pending_approvals_series: Array<{ date: string; value: number }>;
    filter1_series: Array<{ date: string; value: number }>;
    filter2_series: Array<{ date: string; value: number }>;
  };
};

interface Option {
  id: number;
  label: string;
}

const Home: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: 'Mar 13, 2024', // TODO: implement date range filter later, for now it is 2 months
    end: 'Today'
  });

  const [pageData, setPageData] = useState<pageDataProps>({
    agent_icon:
      'https://cdn.jsdelivr.net/gh/RelevanceAI/content-cdn@latest/agents/agent_icons/agentfriends.svg',
    agent_type: 'All agents',
    date_range_label: 'over the last 2 months',
    total_tasks: 0,
    waiting_for_approvals: 0,
    pending_approval_requests: 0,
    labelled_tasks: 0,
    active_tasks: 0,
    selectedFilter1: 'Low Fit',
    selectedFilter1Count: 0,
    isFilter1Open: false,
    selectedFilter2: 'Received prospect reply',
    selectedFilter2Value: 0,
    chart_data: {
      total_tasks_series: [],
      active_tasks_series: [],
      labelled_tasks_series: [],
      pending_approvals_series: [],
      filter1_series: [],
      filter2_series: []
    }
  });

  function getFilterData(arr: any[], filter: string) {
    const series = arr
      .filter((event) => event.event_value === filter)
      .map((item) => ({
        value: item.total,
        date: getModernDate(item.insert_date_)
      }));

    return { series, value: labelledTaskFilter[filter] };
  }

  const togglePopover = () => {
    setPageData({
      ...pageData,
      isFilter1Open: !pageData.isFilter1Open
    });
  };
  const handleOptionClick = (selectedOption: string) => {
    setPageData({
      ...pageData,
      isFilter1Open: false,
      selectedFilter1: selectedOption,
      selectedFilter1Count: getFilterData(mainData.labels_results.timeseries, selectedOption).value,
      chart_data: {
        ...pageData.chart_data,
        filter1_series: getFilterData(mainData.labels_results.timeseries, selectedOption).series
      }
    });
  };

  function getModernDate(dateStr: string | number | Date) {
    const date: Date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric'
    };
    const formattedDate: string = date.toLocaleDateString('en-US', options);

    return formattedDate;
  }

  function getPendingApprovals(arr: any[]) {
    const output = arr
      .filter((event) => event.event_value === 'pending-approval')
      .map((item) => ({
        value: item.total,
        date: getModernDate(item.insert_date_)
      }));

    return output;
  }

  function getWaitingForApprovals(arr: any[]) {
    const output = arr
      .filter((event) => event.event_value === 'idle')
      .map((item) => ({
        value: item.total,
        date: getModernDate(item.insert_date_)
      }));

    return output;
  }

  const totalTaskSeries = mainData.tasks_created_results.timeseries.map((item) => ({
    value: item.total,
    date: getModernDate(item.insert_date_)
  }));

  const activeTasksValues = mainData.states_results.change_per_event_value;
  const activeTasksSeries = Object.entries(activeTasksValues).map(([key, value]) => ({
    date: key,
    value: value.current_value
  }));

  const labelledTaskFilter = mainData.labels_results.timeseries
    .filter(
      (event) =>
        event.event_value === 'Mid Fit' ||
        event.event_value === 'Low Fit' ||
        event.event_value === 'Address not found' ||
        event.event_value === 'Received prospect reply' ||
        event.event_value === 'Low Intent'
    )
    .reduce(
      (item, transaction) => {
        if (!item[transaction.event_value]) {
          item[transaction.event_value] = 0;
        }
        item[transaction.event_value] += transaction.total;

        return item;
      },
      {} as { [key: string]: number }
    );

  const labelledTaskSeries = Object.keys(labelledTaskFilter).map((category) => ({
    date: category,
    value: labelledTaskFilter[category]
  }));
  useEffect(() => {
    setPageData({
      ...pageData,
      total_tasks: mainData.tasks_created_results.total_change.current_value,
      labelled_tasks: mainData.labels_results.total_change.current_value,
      active_tasks: mainData.states_results.total_change.current_value,
      pending_approval_requests: getPendingApprovals(mainData.states_results.timeseries).length,
      waiting_for_approvals: getWaitingForApprovals(mainData.states_results.timeseries).length,
      selectedFilter1: pageData.selectedFilter1,
      selectedFilter1Count: getFilterData(
        mainData.labels_results.timeseries,
        pageData.selectedFilter1
      ).value,
      selectedFilter2: pageData.selectedFilter2,
      selectedFilter2Value: getFilterData(
        mainData.labels_results.timeseries,
        pageData.selectedFilter2
      ).value,
      chart_data: {
        ...pageData.chart_data,
        pending_approvals_series: getPendingApprovals(mainData.states_results.timeseries),
        total_tasks_series: totalTaskSeries,
        labelled_tasks_series: labelledTaskSeries,
        active_tasks_series: activeTasksSeries,
        filter1_series: getFilterData(mainData.labels_results.timeseries, pageData.selectedFilter2)
          .series,
        filter2_series: getFilterData(mainData.labels_results.timeseries, pageData.selectedFilter2)
          .series
      }
    });

    //below thing should be set via date range filter.
    setDateRange({
      start: 'Mar 13, 2024',
      end: 'Today'
    });
  }, []);

  const DateRangeSummary = () => (
    <p className="text-gray-400 text-sm">
      {dateRange.start} - {dateRange.end}
    </p>
  );

  const CardWrapper: React.FC<{
    showFilter?: boolean;
    heading: string;
    count: number;
    subtext: string;
    showDot?: boolean;
    dotColor?: string;
    classNames?: string;
    children: React.ReactNode;
  }> = ({ showFilter, children, heading, count, subtext, showDot, dotColor, classNames }) => {
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
            <DateRangeSummary />
          </div>
          {showFilter && (
            <div className="absolute top-0 right-0 p-4">
              <Icon
                color="slate"
                size="md"
                icon={RiFilterLine}
                className="items-end cursor-pointer"
                onClick={togglePopover}
              />
              {pageData.isFilter1Open && (
                <div className="absolute right-0 z-10 w-48 py-2 mt-2 bg-slate-50 border border-gray-300 rounded shadow-lg">
                  {pageData.chart_data.labelled_tasks_series.map((option) => (
                    <div
                      key={option.date}
                      onClick={() => handleOptionClick(option.date)}
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

  const SummaryCard: React.FC = () => {
    return (
      <Card>
        <div className="flex items-center p-2 bg-white rounded">
          <div className="text-4xl text-blue-500 mr-4">
            <img src={pageData?.agent_icon} alt="icon" className="w-8 h-8" />
          </div>
          <div>
            <p className="font-bold">Summary & Performance</p>
            <DateRangeSummary />
          </div>
        </div>
        <div className="flex items-center p-2 bg-white rounded">
          <div className="text-4xl text-blue-500 mr-4">
            <Icon color="slate" size="md" icon={RiShapesFill} />
          </div>
          <div>
            <p className="text-gray-600">
              <Badge color="slate">{pageData.agent_type}</Badge> performed{' '}
              <Badge color="slate">{pageData?.total_tasks} tasks</Badge> in total{' '}
              <Badge color="slate">{pageData.date_range_label}</Badge>
            </p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-white rounded">
          <div className="text-4xl text-blue-500 mr-4">
            <Icon color="slate" size="md" icon={RiBookletFill} />
          </div>
          <div>
            <p className="text-gray-600">
              <Badge color="slate">{pageData.agent_type}</Badge> have{' '}
              <Badge color="slate">{pageData?.waiting_for_approvals} tasks</Badge> waiting for your
              approval <Badge color="slate">{pageData.date_range_label}</Badge>. You can head to the{' '}
              <a href="#" className="text-blue-600">
                Activity Center
              </a>{' '}
              to approve them.
            </p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-white rounded">
          <div className="text-4xl text-blue-500 mr-4">
            <Icon color="slate" size="md" icon={RiPriceTag2Fill} />
          </div>
          <div>
            <p className="text-gray-600">
              <Badge color="slate">{pageData.agent_type}</Badge> labelled{' '}
              <Badge color="slate">{pageData.labelled_tasks} tasks</Badge>{' '}
              <Badge color="slate">{pageData.date_range_label}</Badge>.{' '}
              <Badge color="slate">Received prospect reply tasks</Badge> is the most common label.
            </p>
          </div>
        </div>
      </Card>
    );
  };

  const TotalTasksChart: React.FC<{
    data: Array<{ date: string; value: number }>;
  }> = ({ data }) => {
    return (
      <BarChart
        data={data}
        index="date"
        categories={['value']}
        colors={['blue']}
        yAxisWidth={60}
        showLegend={false}
      />
    );
  };

  const AreaChartSeries: React.FC<{
    data: Array<{ date: string; value: number }>;
    colors: Array<string>;
  }> = ({ data, colors }) => {
    return (
      <AreaChart
        className="h-40"
        data={data}
        index="date"
        categories={['value']}
        colors={colors}
        yAxisWidth={60}
        showGridLines={false}
        showXAxis={false}
        showLegend={false}
        showYAxis={false}
      />
    );
  };

  const LabelTaskChart: React.FC<{
    data: Array<{ date: string; value: number }>;
  }> = ({ data }) => {
    return (
      <BarChart
        data={data}
        index="date"
        categories={['value']}
        colors={['green']}
        yAxisWidth={140}
        showLegend={false}
        layout="vertical"
      />
    );
  };

  const ActiveTasksChart: React.FC<{
    data: Array<{ date: string; value: number }>;
  }> = ({ data }) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <DonutChart
          data={data}
          index="date"
          category="value"
          colors={['black', 'cyan', 'indigo', 'violet']}
          className="w-140"
          showLabel={false}
        />
        <Legend
          categories={data.map(
            (val) =>
              `${val.date} (${val.value} tasks, ${Math.round(
                (val.value / pageData.active_tasks) * 100
              )}%)`
          )}
          colors={['black', 'cyan', 'indigo', 'violet']}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 bg-slate-100">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4 mr-4">
          <SummaryCard />
          <CardWrapper heading="Total tasks" count={pageData?.total_tasks} subtext="tasks">
            <TotalTasksChart data={pageData.chart_data.total_tasks_series} />
          </CardWrapper>
          <CardWrapper
            heading="Pending approvals requested"
            count={pageData?.pending_approval_requests}
            subtext="requests"
            showDot
            dotColor="green"
          >
            <AreaChartSeries
              data={pageData.chart_data.pending_approvals_series}
              colors={['green', 'lime']}
            />
          </CardWrapper>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CardWrapper
              heading={pageData.selectedFilter1}
              count={pageData.selectedFilter1Count}
              subtext="labelled"
              showDot
              dotColor="green"
              showFilter
            >
              <AreaChartSeries
                data={pageData.chart_data.filter1_series}
                colors={['green', 'lime']}
              />
            </CardWrapper>
            <CardWrapper
              heading={pageData.selectedFilter2}
              count={pageData.selectedFilter2Value}
              subtext="labelled"
              showDot
              dotColor="gray"
            >
              <AreaChartSeries
                data={pageData.chart_data.filter2_series}
                colors={['gray', 'slate']}
              />
            </CardWrapper>
          </div>
          <CardWrapper heading="Active tasks" count={pageData.active_tasks} subtext="tasks">
            <ActiveTasksChart data={pageData.chart_data.active_tasks_series} />
          </CardWrapper>
          <CardWrapper heading="Labeled tasks" count={pageData.labelled_tasks} subtext="tasks">
            <LabelTaskChart data={pageData.chart_data.labelled_tasks_series} />
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

export default Home;

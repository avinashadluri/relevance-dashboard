'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import mainData from '../../../data/analytics';

type MyContextValue = {
  dateRangeStart: string;
  dateRangeEnd: string;
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
    active_tasks_series: Array<{ date: string; value: number }>;
    labelled_tasks_series: Array<{ date: string; value: number }>;
    pending_approvals_series: Array<{ date: string; value: number }>;
    filter1_series: Array<{ date: string; value: number }>;
    filter2_series: Array<{ date: string; value: number }>;
  };
  // setPageData?: () => void;
  togglePopover?: () => void;
  handleOptionClick: (arg0: string) => void;
};
const MyContext = createContext<MyContextValue | null>(null);

export const MainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pageData, setPageData] = useState<MyContextValue>({
    dateRangeStart: 'Mar 13, 2024',
    dateRangeEnd: 'Today',
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
    },
    togglePopover: () => {
      setPageData((prevData) => ({ ...prevData, isFilter1Open: !pageData.isFilter1Open }));
    },
    handleOptionClick: (selectedOption: string) => {
      setPageData((prevData) => ({
        ...prevData,
        isFilter1Open: false,
        selectedFilter1: selectedOption,
        selectedFilter1Count: getFilterData(mainData.labels_results.timeseries, selectedOption)
          .value,
        chart_data: {
          ...prevData.chart_data,
          filter1_series: getFilterData(mainData.labels_results.timeseries, selectedOption).series
        }
      }));
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
  }, []);

  return <MyContext.Provider value={pageData}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used inside a MainProvider');
  }
  return context;
};

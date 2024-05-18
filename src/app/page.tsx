'use client';
import { useMyContext } from '@/components/providers/MainProvider';
import { CardWrapper } from '@/components/card-wrapper';
import { SummaryCard } from '@/components/summary-card';
import { TotalTasksChart } from '@/components/total-tasks';
import { AreaChartSeries } from '@/components/area-chart';
import { LabelTaskChart } from '@/components/label-task-chart';
import { ActiveTasksChart } from '@/components/active-task-chart';

const Page: React.FC = () => {
  const pageData = useMyContext();

  return (
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
            <AreaChartSeries data={pageData.chart_data.filter1_series} colors={['green', 'lime']} />
          </CardWrapper>
          <CardWrapper
            heading={pageData.selectedFilter2}
            count={pageData.selectedFilter2Value}
            subtext="labelled"
            showDot
            dotColor="gray"
          >
            <AreaChartSeries data={pageData.chart_data.filter2_series} colors={['gray', 'slate']} />
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
  );
};

export default Page;

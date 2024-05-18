import { FC } from 'react';
import { useMyContext } from '@/components/providers/MainProvider';
import { Card } from '@tremor/react';
import { DateRangeSummary } from '@/components/date-range';
import { Icon, Badge } from '@tremor/react';
import { RiShapesFill, RiBookletFill, RiPriceTag2Fill } from '@remixicon/react';

export const SummaryCard: FC = () => {
  const pageData = useMyContext();
  return (
    <Card>
      <div className="flex items-center p-2 bg-white rounded">
        <div className="text-4xl text-blue-500 mr-4">
          <img src={pageData?.agent_icon} alt="icon" className="w-8 h-8" />
        </div>
        <div>
          <p className="font-bold">Summary & Performance</p>
          <DateRangeSummary
            dateRangeStart={pageData.dateRangeStart}
            dateRangeEnd={pageData.dateRangeEnd}
          />
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

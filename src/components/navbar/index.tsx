'use client';

import { RiCalendarScheduleLine, RiArrowDropDownLine } from '@remixicon/react';
import { Icon } from '@tremor/react';

export const Navbar: React.FC = () => {
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

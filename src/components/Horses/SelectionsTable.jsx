'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SwitcherThree from '@/components/Switchers/SwitcherThree';



const SelectionsTable = ({ optimalParamsEnabled, raceType, miles, furlongs, yards, runners }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleToggle = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Meeting Runners
      </h4>
  
      <div className="flex flex-col">
        {/* Header Row */}
        <div className="flex flex-nowrap rounded-sm bg-gray-2 dark:bg-meta-4 border-b border-stroke dark:border-strokedark">
          <div className="p-2.5 xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base" >Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base" >&#8470; Rest Days</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base" >&#8470; Runs</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40" >
            <h5 className="text-sm font-medium uppercase xsm:text-base">&#8470; Y Cmpting</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base" >&#8470; Wins</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base"  >AVR Position</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base"  >AVR Distance</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base"  >AVR Rating</h5>
          </div>
        </div>
  
        {/* Data Rows */}
        {runners?.selections?.map((runner, index) => (
          <div
            className={`flex flex-nowrap ${index === runners.selections.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
            key={index}
          >
            {/* Example with Checkbox and Details (optional, uncomment if needed) */}
            {/* <div className="flex items-center gap-3 p-2.5 xl:p-5 flex-shrink-0 w-24">
              <input
                type="checkbox"
                onChange={() => toggleStrikethrough(index)}
                aria-label={`Strike-through row ${index + 1}`}
              />
              <p className="hidden text-black dark:text-white sm:block">
                {runner?.selection_name}
              </p>
              <button
                onClick={() => handleToggle(index)}
                className="ml-auto flex items-center text-gray-500 dark:text-gray-300"
              >
                <svg
                  className={`transition-transform duration-300 ${expandedRow === index ? "rotate-180" : ""}`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 15.293l-6.293-6.293a1 1 0 111.414-1.414L12 12.586l5.879-5.879a1 1 0 111.414 1.414L12 15.293z"
                    fill="#000"
                  />
                </svg>
              </button>
            </div> */}
            <div className="flex items-left justify-left p-2.5 xl:p-5 flex-shrink-0 w-50">
              <p className="text-black dark:text-white">{runner?.selection_name}</p>
            </div>
        
            <div className="flex items-left justify-left p-2.5 xl:p-5 flex-shrink-0 w-40">
              <p className="text-meta-3">{runner?.recovery_days}</p>
            </div>
        
            <div className="hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40">
              <p className="text-black dark:text-white">{runner?.num_runs}</p>
            </div>
        
            <div className="hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40">
              <p className="text-meta-5">{runner?.duration}</p>
            </div>
        
            {/* Add additional columns if needed */}
            <div className="hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40">
              <p className="text-meta-5">{runner?.win_count}</p>
            </div>
            <div className="hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40">
              <p className="text-meta-5">{runner?.avg_position.toFixed(2)}</p>
            </div>
            <div className="hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40">
              <p className="text-meta-5">{runner?.avg_distance_furlongs.toFixed(2)}</p>
            </div>
            <div className="hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40">
              <p className="text-meta-5">{runner?.avg_rating.toFixed(2)}</p>
            </div>
        
            {/* Accordion Content */}
            {expandedRow === index && (
              <div className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-800">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2">Detail 1</th>
                      <th className="border p-2">Detail 2</th>
                      <th className="border p-2">Detail 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Detail data 1</td>
                      <td className="border p-2">Detail data 2</td>
                      <td className="border p-2">Detail data 3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectionsTable;

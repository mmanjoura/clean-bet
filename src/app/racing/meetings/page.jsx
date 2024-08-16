'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import TableOne from '@/components/Tables/TableOne';
import MeetingEvents from '@/components/Racing/MeetingEvents';
import ControlPanel from '@/components/Racing/ControlPanel';
import MeetingsDate from '@/components/Racing/MeetingsDate';

const Meetings = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Form state
  const [optimalParamsEnabled, setOptimalParams] = useState(false);
  const [raceType, setRaceType] = useState('1');
  const [miles, setMiles] = useState('A');
  const [furlongs, setFurlongs] = useState('1');
  const [yards, setYards] = useState('100m');

  // Handlers for ControlPanel
  const handleOptimalParamsChange = (e) => {
    setOptimalParams(e.target.value);
  };

  const handleRaceTypeChange = (e) => {
    setRaceType(e.target.value);
  };

  const handleMilesChange = (e) => {
    setMiles(e.target.value);
  };

  const handleFurlongsChange = (e) => {
    setFurlongs(e.target.value);
  };

  const handleYardsChange = (e) => {
    setYards(e.target.value);
  };

  return (
    <DefaultLayout>
      {/* Select input */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row items-center">
            {/* Meeting Events Dropdown */}
            <div className="flex-grow xl:w-1/2">
              <MeetingEvents />
            </div>
            
            {/* Date Picker Component */}
            <div className="flex-grow xl:w-1/2">
              <MeetingsDate 
                selectedDate={selectedDate} 
                onDateChange={setSelectedDate} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pass handlers and form values to ControlPanel */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-6.5">
          <ControlPanel
            optimalParamsEnabled={optimalParamsEnabled}
            raceType={raceType}
            miles={miles}
            furlongs={furlongs}
            yards={yards}
            onOptimalParamsChange={handleOptimalParamsChange}
            onRaceTypeChange={handleRaceTypeChange}
            onMilesChange={handleMilesChange}
            onFurlongsChange={handleFurlongsChange}
            onYardsChange={handleYardsChange}
          />
        </div>
      </div>

      {/* Pass form values to TableOne */}
      <div className="flex flex-col gap-10">
        <TableOne 
          optimalParamsEnabled={optimalParamsEnabled}
          raceType={raceType}
          miles={miles}
          furlongs={furlongs}
          yards={yards}
        />
      </div>
    </DefaultLayout>
  );
};

export default Meetings;

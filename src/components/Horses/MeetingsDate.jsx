// Meeting Date component
import React from 'react';

const MeetingsDate = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

  return (
    <>
      <div>
        <label>
          <div className="font-medium text-black dark:text-white ml-2 py-1">
            Select Event Time
          </div>
        </label>
        <input
          type="date"
          className="p-2 border border-gray-300 rounded"
          value={selectedDate}
          onChange={handleDateChange}
          aria-label="Select a date"
        />
      </div>
    </>
  );
};

export default MeetingsDate;

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
          className={`
            relative z-20 w-3/4 appearance-none rounded border 
            border-stroke bg-transparent px-12 py-3 outline-none 
            transition focus:border-primary active:border-primary 
            dark:border-form-strokedark dark:bg-form-input
          `}
          value={selectedDate}
          onChange={handleDateChange}
          aria-label="Select a date"
        />
      </div>
    </>
  );
};

export default MeetingsDate;

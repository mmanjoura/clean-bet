// TimeSelection.jsx
import React from 'react';
import { useMemo } from 'react';
import HandicupButton from './HandicupButton';
import { useState, useEffect } from 'react';

export default function TimeSelection({
  selectedTime,
  selectedMeetingTime,
  handleTimeClick,
  handleRaceTypeChange,
  raceType,
  handleIsHandicupCheckboxChange,
  miles,
  handleMilesChange,
  furlongs,
  yards,
  raceClass,
  handleFurlongsChange,
  isHandicapRace,
  handleYardsChange,
  handleRaceClassChange,
  totalFurlongs,
  runners }) {


  const yardOptions = useMemo(() => {
    const options = [];
    for (let i = 0; i <= 220; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  }, []);

  return (

    <>
      <div className="flex-grow xl:w-1/2 w-full flex items-center space-x-5">
        <div className="flex items-center space-x-5">
          <span className="mr-1">Distance</span>
          <span className="text-blue-500">({totalFurlongs})</span>
          <span className="mr-1">Runners</span>
          <span className="text-blue-500">({runners?.selections?.length || 0})</span>
        </div>
        <div className="flex items-center space-x-2">
          <HandicupButton onChange={handleIsHandicupCheckboxChange} value={isHandicapRace} />
          <span>Handicup?</span>
        </div>
      </div>

      <table className="flex flex-col">
        <tbody>
          <tr className="flex flex-col md:flex-row md:items-center">
            {[...new Set(selectedMeetingTime.split(','))].map((time, index) => (
              <td key={index} className="px-2 py-1">
                <a
                  href="#"
                  className={`block px-2 py-1 rounded ${time === selectedTime
                    ? 'bg-[#2b96f0] text-white'
                    : 'bg-blue-100 text-[#2b96f0] hover:bg-blue-200'
                    }`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </a>
              </td>

            ))}

            <td className="px-2 py-1">
              <select
                className="w-[120px] rounded border-[1.5px] border-stroke bg-transparent px-1 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={handleRaceTypeChange}
                value={raceType}
              >
                <option value="">RACE TYPE</option>
                <option value="FLAT">FLAT</option>
                <option value="HURDLE">HURDLE</option>
                <option value="CHASE">CHASE</option>
                <option value="ATIONAL HUN">ATIONAL HUNT</option>
                <option value="MAIDEN">MAIDEN</option>
                <option value="SELLING">SELLING</option>
                <option value="CLAIMING">CLAIMING</option>
                <option value="NOVICE">NOVICE</option>
                
              </select>
            </td>
            <td className="px-2 py-1">
              <select
                className="w-[90px] rounded border-[1.5px] border-stroke bg-transparent px-1 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={handleMilesChange}
                value={miles}
              >
                <option value="">MILES</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </td>
            <td className="px-2 py-1">
              <select
                className="w-[120px] rounded border-[1.5px] border-stroke bg-transparent px-1 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={handleFurlongsChange}
                value={furlongs}
              >
                <option value="">FURLONGS</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </td>

            <td className="px-2 py-1">
              <select
                className="w-[90px] rounded border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={handleYardsChange}
                value={yards}
              >
                <option value="">YARDS</option>
                {yardOptions}
              </select>
            </td>
            <td className="px-2 py-1">
              <select
                className="w-[90px] rounded border-[1.5px] border-stroke bg-transparent px-1 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={handleRaceClassChange}
                value={raceClass}
              >
                <option value="">Class</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

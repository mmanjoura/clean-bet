"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HandicupButton from "@/components/Horses/HandicupButton";

const ControlPanel = ({
  totalFurlongs,
  setTotalFurlongs,
  tolerance,
  setTolerance,
  parameters,
  setParameters,
  raceType,
  miles,
  furlongs,
  yards,
  yardOptions,
  isHandicapRace,
  handleCheckboxChange,
  handleRaceTypeChange,
  handleMilesChange,
  handleFurlongsChange,
  handleYardsChange,
  handPickWinner,
  isLoading,
  distanceM,
  distanceF,
  distanceY,
}) => {
  const [rangeValue, setRangeValue] = useState(2);


  useEffect(() => {
    console.log("Rendering ControlPanel with isHandicapRace:", isHandicapRace);
    setParameters(parameters);
    setTotalFurlongs(calculateTotalFurlongs(miles, furlongs, yards));
  }, [parameters, setParameters, miles, furlongs, yards, isHandicapRace]);

  useEffect(() => {
    console.log("isHandicapRace state updated:", isHandicapRace);
  }, [isHandicapRace]);



  const calculateTotalFurlongs = (miles, furlongs, yards) => {
    const milesFloat = parseFloat(miles) || 0;
    const furlongsFloat = parseFloat(furlongs) || 0;
    const yardsFloat = parseFloat(yards) || 0;

    const milesInFurlongs = milesFloat * 8;
    const furlongsFromYards = yardsFloat / 220;
    parameters.current_distance = milesInFurlongs + furlongsFloat + furlongsFromYards;

    return milesInFurlongs + furlongsFloat + furlongsFromYards;
  };

  const handleInput = (e) => {
    const value = parseFloat(e.target.value);
    setRangeValue(value);
    setTolerance(value);
  };

  return (
    <>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row items-center">
        <div className="flex flex-col gap-9">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3 min-w-[140px]">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Race Type
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-6 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={handleRaceTypeChange}
                    value={raceType}
                  >
                    <option value="">Type</option>
                    <option value="FLAT">FLAT</option>
                    <option value="HURDLE">HURDLE</option>
                  </select>
                </div>

                <div className="w-[150px]">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Miles
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={handleMilesChange}
                    value={miles}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div className="w-full xl:w-1/4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Furlongs
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={handleFurlongsChange}
                    value={furlongs}
                  >
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
                </div>

                <div className="w-full xl:w-1/3 min-w-[10px]">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Yards
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-6 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={handleYardsChange}
                    value={yards}
                  >
                    {yardOptions}
                  </select>
                </div>
                <div className="w-full xl:w-1/3 min-w-[10px]">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Handicup
                  </label>
                  <HandicupButton onChange={handleCheckboxChange} value={isHandicapRace} />
                </div>
              </div>

              <div className="w-full xl:w-1/4 flex items-end">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  style={{ backgroundColor: '#2b96f0', whiteSpace: 'nowrap' }} // Prevent wrapping
                  onClick={handPickWinner}
                  disabled={isLoading || !distanceM || !distanceF || !distanceY || !raceType}
                >
                  {isLoading ? (
                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                  ) : (
                    "Get Clean Bet"
                  )}
                </Link>
                <span className="text-red-500 font-medium text-lg ml-20" style={{ color: '#2b96f0' }}>
                  {totalFurlongs.toFixed(2)}
                </span>
                &nbsp;&nbsp;Furlongs
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;

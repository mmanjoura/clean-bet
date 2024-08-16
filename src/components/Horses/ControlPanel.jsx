"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SwitcherThree from "@/components/Switchers/SwitcherThree";

const ControlPanel = ({
    totalFurlongs,
    setTotalFurlongs,
    tolerance,
    setTolerance,
    optimalParameters,
    setOptimalParameters,
    raceType,
    miles,
    furlongs,
    yards,
    yardOptions,
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
        setTolerance(tolerance);
    }, [tolerance]);

    useEffect(() => {
        // Ensure the local state matches the props when they change
        setOptimalParameters(optimalParameters);
        setTotalFurlongs(calculateTotalFurlongs(miles, furlongs, yards));
    }, [optimalParameters, setOptimalParameters, miles, furlongs, yards]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setOptimalParameters((prevState) => ({
            ...prevState,
            [name]: value,
        }));


    };

    const calculateTotalFurlongs = (miles, furlongs, yards) => {
        // Convert string inputs to floats
        const milesFloat = parseFloat(miles) || 0;
        const furlongsFloat = parseFloat(furlongs) || 0;
        const yardsFloat = parseFloat(yards) || 0;

        // Assuming 1 mile = 8 furlongs and 1 furlong = 220 yards
        const milesInFurlongs = milesFloat * 8;
        const furlongsFromYards = yardsFloat / 220; // Convert yards to furlongs

        return milesInFurlongs + furlongsFloat + furlongsFromYards;
    };

    const handleInput = (e) => {
        const value = parseFloat(e.target.value);
        console.log('Setting tolerance to:', value); // Debugging line
        setRangeValue(value);
        setTolerance(value);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                {/* Optimal Parameter */}
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex items-center">
                            <SwitcherThree />
                            <label
                                htmlFor="optimal-parameters-checkbox"
                                className="font-medium text-black dark:text-white ml-2"
                            >
                                Optimal Average Parameters
                            </label>
                        </div>

                        <form action="#">
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            No Runs
                                        </label>
                                        <input
                                            // disabled={!optimalParamsEnabled}
                                            name="avr_number_of_runs" // Add name here
                                            type="text"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={handleFormChange}
                                            value={optimalParameters?.optimal_num_runs || ''}
                                        />

                                    </div>

                                    <div className="w-full xl:w-2/5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            No Years Competing
                                        </label>
                                        <input
                                            // disabled={!optimalParamsEnabled}
                                            name="avr_number_of_years_competing" // Add name here
                                            type="text"
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={handleFormChange}
                                            value={optimalParameters?.optimal_num_years_in_competition || ''}
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            No Wins
                                        </label>
                                        <input
                                            name="avr_number_of_wins" // Add name here
                                            // disabled={!optimalParamsEnabled}
                                            type="text"
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={handleFormChange}
                                            value={optimalParameters?.optimal_num_wins || ''}
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Rating
                                        </label>
                                        <input
                                            name="avr_rating" // Add name here
                                            // disabled={!optimalParamsEnabled}
                                            type="text"
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={handleFormChange}
                                            value={optimalParameters?.optimal_rating || ''}
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Position
                                        </label>
                                        <input
                                            name="avr_position" // Add name here
                                            // disabled={!optimalParamsEnabled}
                                            type="text"
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={handleFormChange}
                                            value={optimalParameters?.optimal_position || ''}
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Distance
                                        </label>
                                        <input
                                            name="avr_distance" // Add name here
                                            // disabled={!optimalParamsEnabled}
                                            type="text"
                                            placeholder=""
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={handleFormChange}
                                            value={optimalParameters?.optimal_distance || ''}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="flex items-center">
                                        <label className="block text-sm font-medium text-black dark:text-white mr-2">
                                            Adjust Tolerance
                                        </label>
                                        <label className="text-sm font-medium text-black dark:text-white" style={{ color: '#2b96f0' }}>
                                            {rangeValue}
                                        </label>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        step="0.01"
                                        value={rangeValue} // Controlled by local state
                                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #2b96f0 ${(rangeValue / 5) * 100}%, #e5e7eb ${(rangeValue / 5) * 100}%)`,
                                        }}
                                        onInput={handleInput}
                                    />
                                </div>

                            </div>
                        </form>
                    </div>
                </div>

                {/* Race Type and Distance */}
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex items-center">
                            <label
                                htmlFor="race-type-distance"
                                className="font-medium text-black dark:text-white flex-grow"
                            >
                                Race Type & Distance
                            </label>
                            {totalFurlongs > 0.00 && (
                                <div className="flex-grow flex justify-end">
                                    <span className="text-red-500 font-medium text-lg" style={{ color: '#2b96f0' }}>
                                        {totalFurlongs.toFixed(2)}
                                    </span>&nbsp;Furlongs
                                </div>
                            )}
                        </div>
                        <form action="#">
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Race Type
                                        </label>
                                        <select
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={handleRaceTypeChange}
                                            value={raceType}
                                        >
                                            <option value="FLAT">FLAT</option>
                                            <option value="CHASE">CHASE</option>
                                            <option value="HURDLE">HURDLE</option>
                                        </select>
                                    </div>

                                    <div className="w-full xl:w-1/5">
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

                                    <div className="w-full xl:w-1/5">
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

                                    <div className="w-full xl:w-1/5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Yards
                                        </label>
                                        <select
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={handleYardsChange}
                                            value={yards}
                                        >                                            
                                            {yardOptions}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Link
                                        href="#"
                                        className="inline-flex items-center justify-center rounded-md px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-24"
                                        style={{ backgroundColor: '#2b96f0' }}
                                        onClick={handPickWinner}
                                        disabled={isLoading || !distanceM || !distanceF || !distanceY || !raceType} // Disable if raceType is not selected
                                    >
                                        {isLoading ? (
                                            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                                        ) : (
                                            "Pick"
                                        )}
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ControlPanel;

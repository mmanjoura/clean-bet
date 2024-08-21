import React, { useState, useEffect } from 'react';
import TimeSelection from '@/components/Horses/TimeSelection';
import { set } from 'date-fns';

const SelectionsTable = ({ raceType, isHandicapRace, runners, selectedTime, selectedMeetingTime, handleTimeClick }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedRunners, setSelectedRunners] = useState([]);
  const [isFlatNovice, setIsFlatNovice] = useState(false);
  const [isHurdleNovice, setIsHurdleNovice] = useState(false);

  const handleToggle = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleCheckboxChange = (runnerName) => {
    if (selectedRunners.includes(runnerName)) {
      setSelectedRunners(selectedRunners.filter(name => name !== runnerName));
    } else {
      setSelectedRunners([...selectedRunners, runnerName]);
    }
  };

  useEffect(() => {
    if (raceType === "FLAT" && isHandicapRace) {
      setIsFlatNovice(true);
    }
    if (raceType === "HURDLE" && isHandicapRace) {
      setIsHurdleNovice(true);
    }
    if (raceType === "FLAT" && !isHandicapRace) {
      setIsFlatNovice(false);
    }
    if (raceType === "HURDLE" && !isHandicapRace) {
      setIsHurdleNovice(false);
    }

    console.log("isFlatNovice", isFlatNovice);
    console.log("isHurdleNovice", isHurdleNovice);
  }, [raceType, isHandicapRace]);


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">


      <div className="flex-grow xl:w-1/2"> {runners?.selections?.length || 0} Runners
        <TimeSelection
          selectedTime={selectedTime}
          selectedMeetingTime={selectedMeetingTime}
          handleTimeClick={handleTimeClick}
        />
      </div>


      <div className="flex flex-col">
        {/* Header Row */}
        <div className="flex flex-nowrap rounded-sm bg-gray-2 dark:bg-meta-4 border-b border-stroke dark:border-strokedark">
          <div className="p-2.5 xl:p-5 flex-shrink-0 w-12">
            <h5 className="text-sm font-medium uppercase xsm:text-base">#</h5>
          </div>
          <div className="p-2.5 xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base">&#8470; Rest Days</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base">&#8470; Runs</h5>
          </div>
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base">&#8470; Y Cmpting</h5>
          </div> */}
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base">&#8470; Wins</h5>
          </div> */}
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base">AVR Position</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base">AVR Distance</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base">AVR Rating</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-40">
            <h5 className="text-sm font-medium uppercase xsm:text-base">AVR Odds</h5>
          </div>
        </div>

        {/* Data Rows */}
        {runners?.selections
          ?.sort((a, b) => a.avg_position - b.avg_position) // Sort by average position
          .map((runner, index) => {
            const isChecked = selectedRunners.includes(runner?.selection_name);
            return (
              <div
                className={`flex flex-col ${index === runners.selections.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                  }`}
                key={index}
              >
                <div className={`flex flex-nowrap items-center"`}>
                  {runner?.win_lose?.position !== 0 && (
                    <div
                      className={`flex items-center justify-left p-2.5 xl:p-5 flex-shrink-0 w-12 ${[1, 2, 3].includes(runner.win_lose.position) ? 'text-meta-7' : ''}`}
                    >
                      <p className={`${['1', '2', '3'].includes(runner.win_lose.position) ? 'text-meta-3' : ''}`}>
                        {runner.win_lose.position}
                      </p>
                    </div>

                  )}
                  <div className="flex items-center justify-left p-2.5 xl:p-5 flex-shrink-0 w-12">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(runner?.selection_name)}
                      className="mr-2"
                    />

                    <button onClick={() => handleToggle(index)}>
                      {expandedRow === index ? "-" : "+"}
                    </button>
                  </div>

                  <div
                    className={`flex items-left justify-left p-2.5 xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through-red" : ""
                      }`}
                  >
                    {/* If Number of year is greater than 3 years make red */}
                    <p className={`${runner?.duration > 3 ? 'text-meta-7' : 'text-meta-4'}`}>
                      {runner?.selection_name}
                    </p>
                  </div>

                  {/* If isFlatNovice = true*/}

                  <div
                    className={`flex items-left justify-left p-2.5 xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through-red" : ""}`}
                  >
                      {(!isFlatNovice && runner?.recovery_days > 30) ? (
                      <p className="text-meta-7">{runner?.recovery_days.toFixed(2)}</p>
                    ) : (!isHurdleNovice && runner?.recovery_days < 20) ? (
                      <p className="text-meta-3">{runner?.recovery_days.toFixed(2)}</p>
                    ) : (
                      <p className="text-meta-5">{runner?.recovery_days.toFixed(2)}</p>
                    )}
                  </div>

                  <div
                    className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through-red" : ""
                      }`}
                  >                 
                    {(!isFlatNovice && runner?.num_runs < 6) ? (
                      <p className="text-meta-3">{runner?.num_runs.toFixed(2)}</p>
                    ) : (!isHurdleNovice && runner?.num_runs < 20) ? (
                      <p className="text-meta-3">{runner?.num_runs.toFixed(2)}</p>
                    ) : (
                      <p className="text-meta-7">{runner?.num_runs.toFixed(2)}</p>
                    )}
                  </div>

                  {/* <div
                    className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through-red" : ""
                      }`}
                  >
                    <p className="text-meta-5">{runner?.duration}</p>
                  </div> */}

                  {/* Additional Columns */}
                  {/* <div
                    className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through-red" : ""
                      }`}
                  >
                    <p className="text-meta-5">{runner?.win_count}</p>
                  </div> */}
                  <div
                    className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through-red" : ""
                      }`}
                  >
                    <p className="text-meta-5">{runner?.avg_position.toFixed(2)}</p>
                  </div>
                  <div
                    className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through-red" : ""
                      }`}
                  >
                    <p className="text-meta-5">{runner?.avg_distance_furlongs.toFixed(2)}</p>
                  </div>
                  <div
                    className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through-red" : ""
                      }`}
                  >
                    <p className="text-meta-5">{runner?.avg_rating.toFixed(2)}</p>
                  </div>
                  <div
                    className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through-red" : ""
                      }`}
                  >
                    {/* If it is FLAT Novice */}
                    {isFlatNovice ? (
                      <p className="text-meta-7">{runner?.avg_odds.toFixed(2)}</p>
                    ) : (
                      <p className="text-meta-7">{runner?.avg_odds.toFixed(2)}</p>
                    )}


                  </div>
                </div>

                {/* Accordion Content */}
                {expandedRow === index && (
                  <div className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-800">
                    <div className="max-w-5xl">
                      <table className="w-full border border-gray-300 border-collapse">
                        <thead>
                          <tr>
                            <th className="border p-2 text-left">
                              Age:{" "}
                              <span className="text-green-500 font-normal">
                                {runner?.age}
                              </span>
                            </th>
                            <th className="border p-2 text-left">
                              Trainer:{" "}
                              <span className="text-green-500 font-normal">
                                {runner?.trainer}
                              </span>
                            </th>
                            <th className="border p-2 text-left">
                              Owner:{" "}
                              <span className="text-green-500 font-normal">
                                {runner?.owner}
                              </span>
                            </th>
                            <th className="border p-2 text-left">
                              Sire:{" "}
                              <span className="text-green-500 font-normal">
                                {runner?.sire}
                              </span>
                            </th>
                          </tr>
                          <tr>
                            <th className="border p-2 text-left">Date</th>
                            <th className="border p-2 text-left">Distance (f)</th>
                            <th className="border p-2 text-left">Position</th>
                            <th className="border p-2 text-left">Event</th>
                          </tr>
                        </thead>
                        <tbody>
                          {runner.trend_analysis?.BestRaces?.map(
                            (race, raceIndex) => (
                              <tr
                                key={raceIndex}
                                className="bg-white even:bg-blue-50"
                              >
                                <td className="border py-2 px-4">
                                  {new Date(race.Date).toLocaleDateString("en-GB", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  })}
                                </td>
                                <td className="border py-2 px-4  font-semibold">
                                  {race.Distance}f
                                </td>
                                <td className="border py-2 px-4 font-semibold">
                                  {race.Position}
                                </td>
                                <td className="border py-2 px-4">{race.Event}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

      </div>
    </div>
  );
};

export default SelectionsTable;

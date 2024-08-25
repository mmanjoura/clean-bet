import React, { useState } from 'react';
import RunnerAccordion from './RunnerAccordion';
import RunnerDetails from './RunnerDetails';



const SelectionsTable = ({ runners, raceType, isHandicapRace, totalFurlongs }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedRunners, setSelectedRunners] = useState([]);

  const handleToggle = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleCheckboxChange = (runnerName) => {
    setSelectedRunners((prevSelectedRunners) =>
      prevSelectedRunners.includes(runnerName)
        ? prevSelectedRunners.filter((name) => name !== runnerName)
        : [...prevSelectedRunners, runnerName]
    );
  };





  return (
    <>
      <div className="flex flex-col">
        {/* Header Row */}
        <div className="flex flex-nowrap rounded-sm bg-gray-2 dark:bg-meta-4 border-b border-stroke dark:border-strokedark">
          <div className="p-2.5 xl:p-5 flex-shrink-0 w-12">
            <h5 className="text-sm font-medium uppercase xsm:text-base">#</h5>
          </div>
          <div className="p-2.5 xl:p-5 flex-shrink-0 w-50">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5 flex-shrink-0 w-35">
            <h5 className="text-sm font-medium uppercase xsm:text-base">&#8470; D Rest</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5 flex-shrink-0 w-35">
            <h5 className="text-sm font-medium uppercase xsm:text-base">&#8470; Runs</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-35">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Position</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-35">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Distance</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-35">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Rating</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 flex-shrink-0 w-35">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Odds</h5>
          </div>
        </div>

        {/* Data Rows */}
        {runners?.selections
          ?.sort((a, b) => {
            // Sort by winner positions (1, 2, 3) first, then by average position
            if (a.win_lose.position !== b.win_lose.position) {
              if ([1, 2, 3].includes(a.win_lose.position)) {
                return -1;
              } else if ([1, 2, 3].includes(b.win_lose.position)) {
                return 1;
              }
            }
            return a.avg_position - b.avg_position;
          })
          .map((runner, index) => {
            const isChecked = selectedRunners.includes(runner?.selection_name);
            if (isHandicapRace && raceType == "HURDLE") {
              return (
                <div
                  className={`flex flex-col ${index === runners.selections.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                    }`}
                  key={index}
                >
                  <RunnerDetails
                    runner={runner}
                    isChecked={isChecked}
                    handleCheckboxChange={handleCheckboxChange}
                    handleToggle={handleToggle}
                    index={index}
                    expandedRow={expandedRow}
                    isHandicapRace={isHandicapRace}
                    raceType={raceType}
                    totalFurlongs={totalFurlongs}
                  />

                  {/* Accordion Content */}
                  {expandedRow === index && (
                    <RunnerAccordion runner={runner} />
                  )}
                </div>
              );
            }
            if (isHandicapRace && raceType == "FLAT") {
              return (
                <div
                  className={`flex flex-col ${index === runners.selections.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                    }`}
                  key={index}
                >
                  <RunnerDetails
                    runner={runner}
                    isChecked={isChecked}
                    handleCheckboxChange={handleCheckboxChange}
                    handleToggle={handleToggle}
                    index={index}
                    expandedRow={expandedRow}
                    isHandicapRace={isHandicapRace}
                    raceType={raceType}
                    totalFurlongs={totalFurlongs}
                  />

                  {/* Accordion Content */}
                  {expandedRow === index && (
                    <RunnerAccordion runner={runner} />
                  )}
                </div>
              );
            }
            if (!isHandicapRace && raceType == "FLAT") {
              return (
                <div
                  className={`flex flex-col ${index === runners.selections.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                    }`}
                  key={index}
                >
                  <RunnerDetails
                    runner={runner}
                    isChecked={isChecked}
                    handleCheckboxChange={handleCheckboxChange}
                    handleToggle={handleToggle}
                    index={index}
                    expandedRow={expandedRow}
                    isHandicapRace={isHandicapRace}
                    raceType={raceType}
                    totalFurlongs={totalFurlongs}
                  />

                  {/* Accordion Content */}
                  {expandedRow === index && (
                    <RunnerAccordion runner={runner} />
                  )}
                </div>
              );
            }
            if (!isHandicapRace && raceType == "HUDDLE") {
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
                          {['1', '2', '3'].includes(runner.win_lose.position) ? runner.win_lose.position : ''}
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
                      className={`flex items-left justify-left p-2.5 xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through text-red-500" : ""
                        }`}
                    >
                      <p className={`${runner?.duration > 3 ? 'text-meta-7' : ''}`}>
                        {runner?.selection_name}
                      </p>
                    </div>

                    <div
                      className={`flex items-left justify-left p-2.5 xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through text-red-500" : ""}`}
                    >

                      <p className={`${runner?.recovery_days.toFixed(2) < 20 ? 'text-meta-7' : ''}`}>
                        {runner?.recovery_days.toFixed(2)}
                      </p>

                    </div>

                    <div
                      className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through text-red-500" : ""
                        }`}
                    >
                      <p className="text-meta-3">{runner?.num_runs.toFixed(2)}</p>
                    </div>
                    <div
                      className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through text-red-500" : ""
                        }`}
                    >
                      <p className="text-meta-5">{runner?.avg_position.toFixed(2)}</p>
                    </div>
                    <div
                      className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through text-red-500" : ""
                        }`}
                    >
                      <p className="text-meta-5">{runner?.avg_distance_furlongs.toFixed(2)}</p>
                    </div>
                    <div
                      className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through text-red-500" : ""
                        }`}
                    >
                      <p className="text-meta-5">{runner?.avg_rating.toFixed(2)}</p>
                    </div>
                    <div
                      className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-40 ${isChecked ? "line-through text-red-500" : ""
                        }`}
                    >
                      <p className="text-meta-7">{runner?.avg_odds.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Accordion Content */}
                  {expandedRow === index && (
                    <div className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-800 flex justify-center">
                      <div className="max-w-5xl w-full">
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
                                  <td className="text-meta-5">
                                    {new Date(race.Date).toLocaleDateString("en-GB", {
                                      month: "2-digit",
                                      day: "2-digit",
                                      year: "numeric",
                                    })}
                                  </td>
                                  <td className="text-meta-5">
                                    {race.Distance.toFixed(2)}f
                                  </td>
                                  <td className="text-meta-5">
                                    {race.Position}
                                  </td>
                                  <td className="text-meta-5">{race.Event}</td>
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
            } else {
              return (
                <div
                  className={`flex flex-col ${index === runners.selections.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                    }`}
                  key={index}
                >
                  <RunnerDetails
                    runner={runner}
                    isChecked={isChecked}
                    handleCheckboxChange={handleCheckboxChange}
                    handleToggle={handleToggle}
                    index={index}
                    expandedRow={expandedRow}
                    isHandicapRace={isHandicapRace}
                    raceType={raceType}
                    totalFurlongs={totalFurlongs}
                  />

                  {/* Accordion Content */}
                  {expandedRow === index && (
                    <RunnerAccordion runner={runner} />
                  )}
                </div>
              );
            }

          })}
      </div>
    </>
  );
};

export default SelectionsTable;

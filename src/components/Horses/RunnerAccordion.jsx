import React from 'react';

const RunnerAccordion = ({ runner }) => {
  return (
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
            {runner.trend_analysis?.BestRaces?.map((race, raceIndex) => (
              <tr key={raceIndex} className="bg-white even:bg-blue-50">
                <td className="text-meta-5">
                  {new Date(race.Date).toLocaleDateString("en-GB", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="text-meta-5">{race.Distance.toFixed(2)}f</td>
                <td className="text-meta-5">{race.Position}</td>
                <td className="text-meta-5">{race.Event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RunnerAccordion;

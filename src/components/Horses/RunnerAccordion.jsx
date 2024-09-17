import React from 'react';

const RunnerAccordion = ({ runner }) => {
  return (
    <div className={`relative z-20 w-full p-4 mt-2 bg-transparent dark:bg-form-input flex justify-center`}>
      <div className="max-w-5xl w-full">
        <table className={`w-full border border-stroke dark:border-form-strokedark border-collapse`}>
          <thead>
            <tr>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left">
                Age:{" "}
                <span className="text-meta-3 font-normal">
                  {runner?.age}
                </span>
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left">
                Trainer:{" "}
                <span className="text-meta-3 font-normal">
                  {runner?.trainer}
                </span>
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left">
                Owner:{" "}
                <span className="text-meta-3 font-normal">
                  {runner?.owner}
                </span>
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left">
                Sire:{" "}
                <span className="text-meta-3 font-normal">
                  {runner?.sire}
                </span>
              </th>
            </tr>
            <tr>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left">
                Date
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left">
                Distance (f)
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left">
                Position
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left">
                Event
              </th>
            </tr>
          </thead>
          <tbody>
            {runner.trend_analysis?.BestRaces?.map((race, raceIndex) => (
              <tr key={raceIndex} className="bg-white dark:bg-form-input even:bg-blue-50 dark:even:bg-form-strokedark">
                <td className="text-meta-5 p-2 border border-stroke dark:border-form-strokedark">
                  {new Date(race.Date).toLocaleDateString("en-GB", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="text-meta-5 p-2 border border-stroke dark:border-form-strokedark">
                  {race.Distance.toFixed(2)}f
                </td>
                <td className="text-meta-5 p-2 border border-stroke dark:border-form-strokedark">
                  {race.Position}
                </td>
                <td className="text-meta-5 p-2 border border-stroke dark:border-form-strokedark">
                  {race.Event}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default RunnerAccordion;

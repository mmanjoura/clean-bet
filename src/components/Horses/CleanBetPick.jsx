import React from 'react';

const CleanBetPick = ({ totalFurlongs, raceType, flatWinner, hurdleWinner }) => {
  // Determine the appropriate winner data based on raceType
  const winnerData = raceType === 'FLAT' ? flatWinner[0] : hurdleWinner[0];

  // Check if winnerData exists to avoid rendering errors
  if (!winnerData) {
    return null; // Or render a fallback UI/message
  }

  return (
    <div className="mt-4">
      <div>
        <label className="text-md font-medium shadow-default block mb-2">
          CLEAN BET PICK ({raceType})
        </label>
        <table className="w-full text-green-700">
          <tbody>
            <tr>
              <td className="font-bold py-2 pr-3">Selection Name:</td>
              <td className="py-2">{winnerData.selection_name || 'N/A'}</td>
            </tr>
            <tr>
              <td className="font-bold py-2 pr-3">Trainer:</td>
              <td className="py-2">{winnerData.trainer || 'N/A'}</td>
            </tr>
            <tr>
              <td className="font-bold py-2 pr-3">Owner:</td>
              <td className="py-2">{winnerData.owner || 'N/A'}</td>
            </tr>
            <tr>
              <td className="font-bold py-2 pr-3">Average Odds:</td>
              <td className="py-2">
                {winnerData.avg_odds !== undefined
                  ? winnerData.avg_odds.toFixed(2)
                  : 'N/A'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CleanBetPick;

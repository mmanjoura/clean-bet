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
        <label className="text-md font-medium shadow-default">
          CLEAN BET PICK ({raceType})
        </label>
        <table className="w-full text-green-700 mt-2">
          <tbody>
            <tr>
              <td className="font-bold">Selection Name:</td>
              <td>{winnerData.selection_name || 'N/A'}</td>
            </tr>
            <tr>
              <td className="font-bold">Trainer:</td>
              <td>{winnerData.trainer || 'N/A'}</td>
            </tr>
            <tr>
              <td className="font-bold">Owner:</td>
              <td>{winnerData.owner || 'N/A'}</td>
            </tr>
            <tr>
              <td className="font-bold">Average Odds:</td>
              <td>
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

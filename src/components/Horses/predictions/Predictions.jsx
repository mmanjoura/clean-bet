import React, { useMemo, useState } from 'react';

// Helper function to group predictions by event name
const groupByEventName = (predictions) => {
  return predictions.reduce((acc, item) => {
    if (!acc[item.event_name]) {
      acc[item.event_name] = [];
    }
    acc[item.event_name].push(item);
    return acc;
  }, {});
};

const PredictionsTable = ({ eventName, predictions }) => {
  // State for sorting
  const [sortConfig, setSortConfig] = useState({ key: 'event_time', direction: 'ascending' });

  // Function to handle sorting when a column header is clicked
  const handleSort = (key) => {
    if (sortConfig.key === key) {
      // Toggle direction if sorting the same column
      setSortConfig({ key, direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' });
    } else {
      // Sort by new column, default to ascending
      setSortConfig({ key, direction: 'ascending' });
    }
  };

  // Sort predictions based on the current sort configuration
  const sortedPredictions = useMemo(() => {
    // Sort first by total_score in descending order to get the highest scores first
    const sortedByScore = [...predictions].sort((a, b) => b.total_score - a.total_score);
    
    // Then sort by event_time
    const sortedByEventTime = sortedByScore.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    // Return only the top 3 predictions
    return sortedByEventTime.slice(0, 3);
  }, [predictions, sortConfig]);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">{eventName}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th
                onClick={() => handleSort('event_time')}
                className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 cursor-pointer bg-blue-100"
              >
                Time {sortConfig.key === 'event_time' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th
                onClick={() => handleSort('selection_name')}
                className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 cursor-pointer bg-green-100"
              >
                Selection Name {sortConfig.key === 'selection_name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th
                onClick={() => handleSort('avg_position')}
                className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 cursor-pointer bg-yellow-100"
              >
                Avg Position {sortConfig.key === 'avg_position' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th
                onClick={() => handleSort('avg_rating')}
                className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 cursor-pointer bg-red-100"
              >
                Avg Rating {sortConfig.key === 'avg_rating' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th
                onClick={() => handleSort('total_score')}
                className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 cursor-pointer bg-purple-100"
              >
                Total Score {sortConfig.key === 'total_score' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPredictions.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{item?.event_time}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{item?.selection_name}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{item?.avg_position}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{item?.avg_rating}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{item?.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Predictions = ({ predictions }) => {
  // Group predictions by event name
  const groupedPredictions = useMemo(() => groupByEventName(predictions), [predictions]);

  return (
    <div className="container mx-auto px-4 py-8">
      {Object.entries(groupedPredictions).map(([eventName, eventPredictions]) => (
        <PredictionsTable key={eventName} eventName={eventName} predictions={eventPredictions} />
      ))}
    </div>
  );
};

export default Predictions;

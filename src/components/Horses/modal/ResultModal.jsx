const ResultModal = ({ isOpen, onClose, modalData }) => {
  if (!isOpen) return null;



  const hasData = modalData && modalData?.simulationResults?.length > 0;

  console.log(modalData?.simulationResults);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center mt-60">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
        {!hasData ? (
          <>
            <p>Sorry, we couldn't find any selections for the given parameters.</p>
            <button
              onClick={onClose}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </>
        ) : (
          <>
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th colSpan="8" className="py-4 px-4 border-b text-left">
                    <p className="text-meta-3">
                      {/* Correctly access the first element of simulationResults */}
                      {modalData?.simulationResults && modalData.simulationResults[0]?.event_name}
                    </p>
                  </th>
                </tr>

                <tr>
    
                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">Time</p>
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">Name</p>
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">Odds</p>
                  </th>

                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">Trainer</p>
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">Score</p>
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">AVG Positon</p>
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">A Rating</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {modalData?.simulationResults
                  ?.sort((a, b) => {
                    // First, sort by total_score in descending order
                    const scoreComparison = b.total_score - a.total_score;
                    if (scoreComparison !== 0) return scoreComparison;

                    // If total_score is the same, sort by avg_position in ascending order
                    const avgPositionComparison = a.avg_position - b.avg_position;
                    if (avgPositionComparison !== 0) return avgPositionComparison;

                    // If avg_position is also the same, sort by avg_rating in descending order
                    const avgRatingComparison = b.avg_rating - a.avg_rating;
                    return avgRatingComparison;
                  }).slice(0, 3)
                  .map((item, index) => (

                    <tr key={index} className="hover:bg-gray-200 transition-colors duration-300">
                      <td className="py-2 px-4 border-b">{item?.event_time}</td>
                      <td className="py-2 px-4 border-b">{item?.selection_name.split(" ")[0]} {item?.selection_name.split(" ")[0].slice(0, 1)} {item?.age.split(" ")[0]}&nbsp; {item?.run_count}</td>
                      <td className="py-2 px-4 border-b">{item?.odds}</td>
                      <td className="py-2 px-4 border-b">{item?.trainer}</td>
                      <td className="py-2 px-4 border-b">{item?.total_score}</td>
                      <td className="py-2 px-4 border-b">{item?.avg_position}</td>
                      <td className="py-2 px-4 border-b">{item?.avg_rating}</td>
                    </tr>
                  ))}

              </tbody>
            </table>
            <button
              onClick={onClose}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultModal;

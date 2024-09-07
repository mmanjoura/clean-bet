import { useState } from "react";

const ResultModal = ({ isOpen, onClose, modalData }) => {
  // Ensure the modal is displayed only when it's open
  if (!isOpen) return null;



  // Check if there is data in modalData
  const hasData = modalData && Object.keys(modalData).length > 0;

  const [eventName, setEventName] = useState('')


  // Flatten the data structure for easier processing
  const flattenedData = {};

  // Process each event in the modalData object
  Object.entries(modalData).forEach(([key, value]) => {
    Object.entries(value).forEach(([eventName, selections]) => {
      if (!flattenedData[eventName]) {
        flattenedData[eventName] = [];
      }
      flattenedData[eventName] = flattenedData[eventName].concat(selections);

    });
  });

  console.log("Data:", modalData);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center mt-60">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
        {!hasData ? ( // Check if there is data to display
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
            {/* Iterate over each event in flattenedData */}
            {Object.entries(flattenedData).map(([eventName, selections]) => (

          
              <div key={eventName}>
                {/* Display event name */}
                <h2 className="text-meta-1">{eventName}</h2>
                <table className="min-w-full bg-white mb-8">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 border-b text-left text-meta-3">Time</th>
                      <th className="py-2 px-4 border-b text-left text-meta-3">Name</th>
                      <th className="py-2 px-4 border-b text-left text-meta-3">Odds</th>
                      <th className="py-2 px-4 border-b text-left text-meta-3">Trainer</th>
                      <th className="py-2 px-4 border-b text-left text-meta-3">Score</th>
                      <th className="py-2 px-4 border-b text-left text-meta-3">AVG Position</th>
                      <th className="py-2 px-4 border-b text-left text-meta-3">A Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(selections) ? selections : [])
                      .sort((a, b) => {
                        // Convert event_time to a comparable format (e.g., HH:mm)
                        const timeA = a.event_time ? a.event_time.split(':').map(Number) : [0, 0];
                        const timeB = b.event_time ? b.event_time.split(':').map(Number) : [0, 0];

                        // Compare hours first, then minutes if hours are equal
                        if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
                        return timeA[1] - timeB[1];
                      })
                      .map((item, index) => (
                        <>
                        <tr key={index} className="hover:bg-gray-200 transition-colors duration-300">
                          <td className="py-2 px-4 border-b text-meta-5">{item?.event_time}</td>
                          <td className="py-2 px-4 border-b text-meta-5" >
                            {/* {item?.selection_name?.split(" ")[0]}{" "}
                            {item?.selection_name?.split(" ")[1]?.slice(0, 3)}{" "}
                            {item?.age?.split(" ")[0]} {item?.run_count} */}
                            {item?.selection_name + " " + item?.age?.split(" ")[0]}
                          </td>
                          <td className="py-2 px-4 border-b text-meta-5">{item?.odds}</td>
                          <td className="py-2 px-4 border-b text-meta-5">{item?.trainer}</td>
                          <td className="py-2 px-4 border-b text-meta-5">{item?.total_score}</td>
                          <td className="py-2 px-4 border-b text-meta-5">{item?.avg_position}</td>
                          <td className="py-2 px-4 border-b text-meta-5">{item?.avg_rating}</td>
                        </tr>
                        </>
                      ))}

                  </tbody>
                </table>
              </div>
            ))}
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

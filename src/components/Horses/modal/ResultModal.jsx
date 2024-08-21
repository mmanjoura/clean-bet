const ResultModal = ({ isOpen, onClose, modalData }) => {
    if (!isOpen) return null;
  
    console.log('simulationResults:', modalData);
    const hasData = modalData && modalData?.length > 0;
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
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
              {/* <h2 className="text-2xl font-bold mb-4">MCS Pick For {data?.data[0]?.event_name}</h2> */}
              <table className="min-w-full bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Selection Name</th>
                    <th className="py-2 px-4 border-b text-left">Odds</th>
                    <th className="py-2 px-4 border-b text-left">Event Name</th>
                    <th className="py-2 px-4 border-b text-left">Event Date</th>
                    <th className="py-2 px-4 border-b text-left">Event Time</th>
                    <th className="py-2 px-4 border-b text-left">Win Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {[...new Set(modalData?.map(item => item.selection_name))]
                    .slice(0, 6) // Get only the top 6 runners
                    .map(uniqueName => modalData?.find(item => item.selection_name === uniqueName))
                    .sort((a, b) => a.event_name.localeCompare(b.event_name)) // Sort by event_name
                    .map((item, index) => (
                      <tr key={index} className="hover:bg-gray-200 transition-colors duration-300">
                        <td className="py-2 px-4 border-b">{item.selection_name}</td>
                        <td className="py-2 px-4 border-b">{item.odds}</td>
                        <td className="py-2 px-4 border-b">{item.event_name}</td>
                        <td className="py-2 px-4 border-b">{item.event_date.split("T")[0]}</td>
                        <td className="py-2 px-4 border-b">{item.event_time}</td>
                        <td className="py-2 px-4 border-b">{item.win_probability.toFixed(2)} %</td>
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
  
const ResultModal = ({ isOpen, onClose, modalData }) => {
  if (!isOpen) return null;


  const hasData = modalData && modalData?.simulationResults?.length > 0;
  console.log("Potential winners: ", modalData?.simulationResults)
  console.log("hasData", hasData)

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
                  <th colSpan="4" className="py-4 px-4 border-b text-left">
                    <p className="text-meta-4">
                      Potential Winners for {new Date(modalData?.simulationResults[0]?.event_date).toISOString().split('T')[0].replace(/-/g, '/')}
                    </p>
                  </th>
                </tr>
                <tr>
                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">Event Name</p>
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">Event Time</p>
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">Selection Name</p>
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    <p className="text-meta-5">Odds</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {modalData?.simulationResults
                  ?.sort((a, b) => {
                    const eventNameComparison = a.event_name.localeCompare(b.event_name);
                    if (eventNameComparison !== 0) {
                      return eventNameComparison; // If event names are different, sort by event_name
                    }
                    // If event names are the same, sort by event_time
                    return a.event_time.localeCompare(b.event_time);
                  })
                  .map((item, index) => (
                    <tr key={index} className="hover:bg-gray-200 transition-colors duration-300">
                      <td className="py-2 px-4 border-b">
                        <p className="text-meta-3">{item?.event_name}</p>
                      </td>
                      <td className="py-2 px-4 border-b">{item?.event_time}</td>
                      <td className="py-2 px-4 border-b">{item?.selection_name}</td>
                      <td className="py-2 px-4 border-b">{item?.avg_odds?.toFixed(2)}</td>
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

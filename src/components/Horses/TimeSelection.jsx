import React, { useMemo, useState } from 'react';
import ResultModal from "@/components/Horses/modal/ResultModal";
import axios from 'axios';

export default function TimeSelection({
  selectedTime,
  selectedMeetingTime,
  handleTimeClick,
  raceType,
  isHandicapRace,
  raceClass,
  totalFurlongs,
  runners,
  selectedMeeting,
  selectedDate,
  positions,
  years,
  ages,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const handleMeetingPrediction = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/analysis/MeetingPrediction`, {
        race_type: raceType,
        race_distance: totalFurlongs,
        handicap: isHandicapRace,
        race_class: raceClass,
        event_name: selectedMeeting,
        event_date: selectedDate,
        event_time: selectedTime,
        positions: positions,
        years: years,
        ages: ages,
        going: "",
        bet_amount: "5",
      });

      console.log(response.data);
      setModalData(response.data); // Set the modal data with the response
      openModal(); // Open the modal after receiving the response

    } catch (error) {
      console.error("Error fetching race statistics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const yardOptions = useMemo(() => {
    const options = [];
    for (let i = 0; i <= 220; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  }, []);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex items-center justify-between space-x-5 mb-4">
        <div className="flex items-center space-x-5">
          <span className="text-blue-500">({runners?.race_condition?.race_distance})</span>
          <span className="text-blue-500">({runners?.race_condition?.number_of_runners})</span>
        </div>
      </div>

      {/* Container to align the button */}
      <div className="flex justify-between items-center">
        <table>
          <tbody>
            <tr>
              {[...new Set(selectedMeetingTime.split(','))].map((time, index) => (
                <td key={index} className="px-2 py-1">
                  <a
                    href="#"
                    className={`block px-2 py-1 rounded ${time === selectedTime
                      ? 'bg-[#2b96f0] text-white'
                      : 'bg-blue-100 text-[#2b96f0] hover:bg-blue-200'
                      }`}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </a>
                </td>
              ))}
              <td className="px-2 py-1">
                <button
                  className="block px-10 py-1 rounded bg-orange-500 text-white hover:bg-green-500"
                  onClick={handleMeetingPrediction}
                >
                  {isLoading ? (
                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                  ) : (
                    "Predict"
                  )}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal Component */}
      <ResultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalData={modalData}
      />
    </>
  );
}

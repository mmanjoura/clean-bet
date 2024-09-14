import React, { useMemo, useState, useEffect } from 'react';
import ResultModal from "@/components/Horses/modal/ResultModal";
import axios from 'axios';

export default function TimeSelection({
  selectedTime: initialSelectedTime,
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
  const [selectedTime, setSelectedTime] = useState(initialSelectedTime); // State to hold the selected time
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  // Debugging: Log whenever selectedTime changes
  useEffect(() => {
    if (selectedTime) {
      console.log("Time clicked:", selectedTime); // Check if time is captured correctly
    }
  }, [selectedTime]); // Runs whenever selectedTime changes

  const handleMeetingPrediction = async () => {
    setIsLoading(true);
    console.log("Predicting for event_time:", selectedTime); // Log the event_time before the API call
    try {
      const response = await axios.post(`${baseURL}/analysis/MeetingPrediction`, {
        race_type: raceType,
        race_distance: totalFurlongs,
        handicap: isHandicapRace,
        race_class: raceClass,
        event_name: selectedMeeting,
        event_date: selectedDate,
        event_time: selectedTime, // Use the selected time state
        positions: positions,
        years: years,
        ages: ages,
        bet_amount: "5",
      });

      console.log("Response from API:", response.data);
      setModalData(response.data); // Set the modal data with the response
      openModal(); // Open the modal after receiving the response
    } catch (error) {
      console.error("Error fetching race statistics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeClickInternal = (time) => {
    console.log("Clicked time:", time); // Log clicked time
    setSelectedTime(time); // Update the selected time state
    if (handleTimeClick) {
      handleTimeClick(time); // Call the external handler if provided
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
          <span className="text-blue-500">({Number(runners?.race_condition?.race_distance).toFixed(3) + " furlong"})</span>
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
                    className={`block px-2 py-1 rounded ${
                      time === selectedTime
                        ? 'bg-[#2b96f0] text-white'
                        : 'bg-blue-100 text-[#2b96f0] hover:bg-blue-200'
                    }`}
                    onClick={() => handleTimeClickInternal(time)} // Internal handler to capture click
                  >
                    {time}
                  </a>
                </td>
              ))}
              {/* <td className="px-2 py-1">
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
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal Component */}
      <ResultModal isOpen={isModalOpen} onClose={closeModal} modalData={modalData} />
    </>
  );
}

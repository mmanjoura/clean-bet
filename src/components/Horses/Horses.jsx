'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SelctionsTable from '@/components/Horses/SelectionsTable';
import MeetingEvents from '@/components/Horses/MeetingEvents';
import MeetingsDate from '@/components/Horses/MeetingsDate';
import ResultModal from "@/components/Horses/modal/ResultModal";
import TimeSelection from '@/components/Horses/TimeSelection';
import Link from "next/link";
import axios from "axios";

const Horses = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [numRunAnalysis, setNumRunAnalysis] = useState('4');
  const [raceType, setRaceType] = useState('');
  const [miles, setMiles] = useState('');
  const [furlongs, setFurlongs] = useState('');
  const [raceClass, setRaceClass] = useState('');
  const [yards, setYards] = useState('YARDS');
  const [totalFurlongs, setTotalFurlongs] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isHandicapRace, setIsHandicapRace] = useState(false);
  const [positions, setPositions] = useState("");
  const [years, setYears] = useState("");
  const [ages, setAges] = useState("11,12");

  const [parameters, setParameters] = useState({
    avr_number_of_runs: '',
    avr_years_in_competition: '',
    avr_number_of_wins: '',
    avr_rating: '',
    avr_position: '',
    avr_distance: '',
    current_distance: '',
  });

  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedEventName] = useState('');
  const [selectedMeetingTime, setSelectedMeetingTime] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [runners, setRunners] = useState([]);

  // Get Events Meetings
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`${baseURL}/preparation/GetTodayMeeting`, {
          params: { date: selectedDate }
        });
        const meetingsData = response?.data || [];
        setMeetings(meetingsData);
        if (meetingsData.length > 0) {
          setSelectedEventName(meetingsData[0].event_name);
          const times = [...new Set(meetingsData[0].event_time.split(','))];
          if (times.length > 0) {
            setSelectedMeetingTime(meetingsData[0].event_time);
            setSelectedTime(times[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
    fetchMeetings();
  }, [selectedDate, baseURL]);

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
        num_run_analysis: numRunAnalysis,
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

  // Get Runners
  useEffect(() => {
    if (selectedMeeting && selectedTime) {
      const fetchRunners = async () => {
        try {
          const response = await axios.get(`${baseURL}/preparation/GetMeetingRunners`, {
            params: {
              event_name: selectedMeeting,
              event_time: selectedTime,
              event_date: selectedDate,
              race_type: raceType
            }
          });
          setRunners(response?.data?.analysisDataResponse || []);
          setParameters(response?.data?.analysisDataResponse?.parameters || {});
          setTotalFurlongs(calculateTotalFurlongs(miles, furlongs, yards));
        } catch (error) {
          console.error("Error fetching runners:", error);
        }
      };

      fetchRunners();
    }

  }, [selectedMeeting, selectedTime, selectedDate]);

  useEffect(() => {
    setTotalFurlongs(calculateTotalFurlongs(miles, furlongs, yards));
  }, [miles, furlongs, yards]);

  const handleCheckboxChange = useCallback((e) => {
    setIsHandicapRace(e.target.checked);
  }, []);

  const handleRaceTypeChange = useCallback((e) => {
    setRaceType(e.target.value);
  }, []);

  const handleMilesChange = useCallback((e) => {
    setMiles(e.target.value);
  }, []);

  const handleFurlongsChange = useCallback((e) => {
    setFurlongs(e.target.value);
  }, []);

  const handleYardsChange = useCallback((e) => {
    setYards(e.target.value);
  }, []);
  const handleRaceClassChange = useCallback((e) => {
    setRaceClass(e.target.value);
  }, []);

  const handleTimeClick = useCallback((time) => {
    setSelectedTime(time);
    // setDistanceM('');
    // setDistanceF('');
    // setDistanceY('');
  }, []);

  // const handleIsHandicupCheckboxChange = () => {
  //   setIsHandicapRace(prevState => !prevState);
  // };

  useEffect(() => {
    console.log('isHandicapRace:', isHandicapRace);
  }, [isHandicapRace]);

  const handleEventSelectChange = useCallback((event) => {
    const selectedEventName = event.target.value;
    setSelectedEventName(selectedEventName);
    const selectedMeetingDetails = meetings.find(meeting => meeting.event_name === selectedEventName);
    const times = [...new Set(selectedMeetingDetails?.event_time.split(','))];
    setSelectedMeetingTime(selectedMeetingDetails?.event_time || '');
    if (times.length > 0) {
      setSelectedTime(times[0]);
    } else {
      setSelectedTime('');
    }
  }, [meetings]);

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

  const calculateTotalFurlongs = (miles, furlongs, yards) => {
    const milesFloat = parseFloat(miles) || 0;
    const furlongsFloat = parseFloat(furlongs) || 0;
    const yardsFloat = parseFloat(yards) || 0;
    const milesInFurlongs = milesFloat * 8;
    const furlongsFromYards = yardsFloat / 220;
    parameters.current_distance = milesInFurlongs + furlongsFloat + furlongsFromYards;

    let result = milesInFurlongs + furlongsFloat + furlongsFromYards;
    result = result.toFixed(0);

    return result.toString();
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const isButtonDisabled = !raceType || !miles || !furlongs || !yards;

  const dropdownStyles = (value) => ({
    borderColor: value ? 'initial' : 'red',
  });

  const handleEventNumRunAnalysisChange = (event) => {
    const selectedValue = event.target.value;
    setNumRunAnalysis(selectedValue);

    // Add any other logic you want to handle when the event changes
    console.log('Selected num run Analysis:', selectedValue);
  };



  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-3.5 p-3.5">
          <div className="flex flex-col gap-6 xl:flex-row items-center">
            <div className="flex-grow xl:w-1/2">
              <MeetingEvents
                meetings={meetings}
                handleEventSelectChange={handleEventSelectChange}
              />
            </div>
            <div className="flex-grow xl:w-3/4">
              <MeetingsDate
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div className="flex-grow xl:w-1/2">
              <div>
                <label>
                  <div className="font-medium text-black dark:text-white ml-2 py-1">
                    Analyse Based On
                  </div>
                </label>
                <select
                  id="num_run_analysis"
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-1 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                  onChange={handleEventNumRunAnalysisChange}
                  aria-label="Select a meeting"
                >
                  <option value="1">Last Run Only</option>
                  <option selected value="2">Last 2 Runs</option>
                  <option value="3">Last 3 Runs</option>
                  <option  value="4">Last 4 Runs</option>
                  <option value="5">Last 5 Runs</option>
                  <option value="6">Last 6 Runs</option>
                  <option value="7">Last 7 Runs</option>
                  <option value="8">Last 8 Runs</option>
                  <option value="9">Last 9 Runs</option>
                </select>
              </div>
            </div>
            <div className="flex-grow xl:w-1/2 flex justify-end mt-7">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-md border border-meta-3 px-10 py-4 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10 mr-4" // Added mr-4
                onClick={handleMeetingPrediction}
                disabled={isButtonDisabled}
              >
                {isLoading ? (
                   <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-orange-500 rounded-full"></div>
                ) : (
                  "Analysis"
                )}
              </Link>        

            </div>

          </div>

        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex-grow xl:w-1/2">
            <TimeSelection
              isHandicapRace={isHandicapRace}
              selectedTime={selectedTime}
              selectedMeetingTime={selectedMeetingTime}
              raceType={raceType}
              handleRaceTypeChange={handleRaceTypeChange}
              handleTimeClick={handleTimeClick}
              handleMilesChange={handleMilesChange}
              handleFurlongsChange={handleFurlongsChange}
              handleYardsChange={handleYardsChange}
              // handleIsHandicupCheckboxChange={handleIsHandicupCheckboxChange}
              miles={miles}
              furlongs={furlongs}
              yards={yards}
              raceClass={raceClass}
              handleRaceClassChange={handleRaceClassChange}
              yardOptions={yardOptions}
              totalFurlongs={totalFurlongs}
              runners={runners}
              dropdownStyles={dropdownStyles}
              selectedMeeting={selectedMeeting}
              selectedDate={selectedDate}
              positions={positions}
              years={years}
              ages={ages}

            />
          </div>

          <SelctionsTable
            runners={runners}
            raceType={raceType}
            isHandicapRace={isHandicapRace}
            totalFurlongs={totalFurlongs}

          />
        </div>
      </div>

      {/* <ResultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalData={modalData}
      /> */}
    </>
  );
};

export default Horses;

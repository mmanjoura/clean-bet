'use client';
import React, { useState, useEffect, useCallback, useMemo, use } from 'react';
import SelctionsTable from '@/components/Horses/SelectionsTable';
import MeetingEvents from '@/components/Horses/MeetingEvents';
import MeetingsDate from '@/components/Horses/MeetingsDate';
import ResultModal from "@/components/Horses/modal/ResultModal";
import TimeSelection from '@/components/Horses/TimeSelection';
import Link from "next/link";
import axios from "axios";

const Horses = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [distanceM, setDistanceM] = useState('');
  const [distanceF, setDistanceF] = useState('');
  const [distanceY, setDistanceY] = useState('');
  const [raceType, setRaceType] = useState('');
  const [miles, setMiles] = useState('');
  const [furlongs, setFurlongs] = useState('');
  const [yards, setYards] = useState('YARDS');
  const [totalFurlongs, setTotalFurlongs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tolerance, setTolerance] = useState(2);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [randomIndex, setRandomIndex] = useState(0);
  const [isHandicapRace, setIsHandicapRace] = useState(false); // New state for checkbox
  const [isChecked, setIsChecked] = useState(false);
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
    console.log('totalFurlongs:', totalFurlongs);
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
  }, [miles]);

  const handleFurlongsChange = useCallback((e) => {
    setFurlongs(e.target.value);
  }, []);

  const handleYardsChange = useCallback((e) => {
    setYards(e.target.value);
  }, []);

  const handleTimeClick = useCallback((time) => {
    setSelectedTime(time);
    setDistanceM('');
    setDistanceF('');
    setDistanceY('');
  }, []);


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

    return milesInFurlongs + furlongsFloat + furlongsFromYards;
  };


  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

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
            <div className="flex-grow xl:w-1/2">
              <MeetingsDate
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />

            </div>
            <div className="flex-grow xl:w-1/2 flex justify-end">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-md px-10 py-4 text-center font-medium text-white hover:bg-opacity-90"
                style={{ backgroundColor: '#2b96f0', whiteSpace: 'nowrap' }} // Prevent wrapping
                // onClick={handPickWinner}
                disabled={isLoading || !distanceM || !distanceF || !distanceY || !raceType}
              >
                {isLoading ? (
                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                ) : (
                  "Get Clean Bet"
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
              miles={miles}
              furlongs={furlongs}
              yards={yards}
              yardOptions={yardOptions}
              totalFurlongs={totalFurlongs}
              runners={runners}
            />
          </div>
          <SelctionsTable
            runners={runners}
          />
        </div>
      </div>

      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalData={modalData}
      />
    </>
  );
};

export default Horses;

'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SelctionsTable from '@/components/Horses/SelectionsTable';
import MeetingEvents from '@/components/Horses/MeetingEvents';
import ControlPanel from '@/components/Horses/ControlPanel';
import MeetingsDate from '@/components/Horses/MeetingsDate';
import TimeSelection from '@/components/Horses/TimeSelection';
import CleanBetPick from '@/components/Horses/CleanBetPick';
import ResultModal from "@/components/Horses/modal/ResultModal";
import Link from "next/link";
import axios from "axios";

const Horses = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [distanceM, setDistanceM] = useState('');
  const [distanceF, setDistanceF] = useState('');
  const [distanceY, setDistanceY] = useState('');
  const [optimalParamsEnabled, setOptimalParams] = useState(false);
  const [raceType, setRaceType] = useState('TYPE');
  const [miles, setMiles] = useState('');
  const [furlongs, setFurlongs] = useState('');
  const [yards, setYards] = useState('');
  const [totalFurlongs, setTotalFurlongs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tolerance, setTolerance] = useState(2);
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [randomIndex, setRandomIndex] = useState(0);
  const [flatWinner, setFlatWinner] = useState([]);
  const [hurdleWinner, setHurdleWinner] = useState([]);
  const [isHandicapRace, setIsHandicapRace] = useState(false); // New state for checkbox
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
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const [selectedMeetingTime, setSelectedMeetingTime] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [runners, setRunners] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`${baseURL}/preparation/GetTodayMeeting`, {
          params: { date: selectedDate }
        });
        const meetingsData = response?.data || [];
        setMeetings(meetingsData);
        if (meetingsData.length > 0) {
          setSelectedMeeting(meetingsData[0].event_name);
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
        } catch (error) {
          console.error("Error fetching runners:", error);
        }
      };

      fetchRunners();
    }
  }, [selectedMeeting, selectedTime, selectedDate, raceType, baseURL]);

  const handPickWinner = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/analysis/RacePicksSimulation`, {
        race_type: raceType,
        race_distance: totalFurlongs,
        tolerance: tolerance,
        optimal_num_runs: runners.parameters?.optimal_num_runs || '',
        optimal_num_years_in_competition: runners.parameters?.optimal_num_years_in_competition || '',
        optimal_num_wins: runners.parameters?.optimal_num_wins || '',
        optimal_rating: runners.parameters?.optimal_rating || '',
        optimal_position: runners.parameters?.optimal_position || '',
        optimal_distance: runners.parameters?.optimal_distance || '',
        event_name: selectedMeeting,
        event_date: selectedDate,
        event_time: selectedTime,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Result Data", response?.data?.simulationResults);
      setModalData(response?.data?.simulationResults || {});
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error in picking winner:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCheckboxChange = useCallback((e) => {

    setIsHandicapRace(e.target.checked);
  }, []);

  const handleOptimalParamsChange = useCallback((e) => {
    setOptimalParams(e.target.checked);
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

  const handleToleranceChange = useCallback((e) => {
    setTolerance(e.target.value);
  }, []);

  const handleTimeClick = useCallback((time) => {
    setSelectedTime(time);
    setDistanceM('');
    setDistanceF('');
    setDistanceY('');
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setRunners((prevState) => ({
      ...prevState,
      parameters: {
        ...prevState.parameters,
        [name]: value,
      },
    }));
  }, []);

  const handleEventSelectChange = useCallback((event) => {
    const selectedEventName = event.target.value;
    console.log("Selected Event Name:", selectedEventName);

    setSelectedMeeting(selectedEventName);

    const selectedMeetingDetails = meetings.find(meeting => meeting.event_name === selectedEventName);
    console.log("Selected Meeting Details:", selectedMeetingDetails);

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


  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  if (!meetings) {
    return <div>Loading...</div>;
  }

  function GetHurdleWinner(data) {

    const hurdleSelections = data?.selections.filter(selection =>
      totalFurlongs > 10 && (data.parameters.race_type === "HURDLE")

    );

    // Sort by avg_position (ascending)
    hurdleSelections.sort((a, b) => a.avg_position - b.avg_position);

    // Return the third and fourth items as tuples
    if (hurdleSelections.length >= 4) {
      setRandomIndex(Math.floor(Math.random() * 3) + 3);

      return [
        {
          trainer: hurdleSelections[randomIndex].trainer,
          owner: hurdleSelections[randomIndex].owner,
          selection_name: hurdleSelections[randomIndex].selection_name,
          avg_odds: hurdleSelections[randomIndex].avg_odds
        }
      ];
    } else {
      return [];
    }
  }


  function GetFlatWinner(data) {
    // Filter the selections based on the race type and distance
    const flatSelections = data.selections.filter(selection =>
      totalFurlongs < 10 && data?.parameters.race_type === "FLAT"
    );

    // Sort by avg_position (ascending)
    flatSelections.sort((a, b) => a.avg_position - b.avg_position);

    // Return the first and second items as tuples
    if (flatSelections.length >= 3) {
      // So, setRandomIndex() will now set the index to either 0, 1, 2 randomly.
      setRandomIndex(Math.floor(Math.random() * 3));
      return [
        {
          trainer: flatSelections[randomIndex].trainer,
          owner: flatSelections[randomIndex].owner,
          selection_name: flatSelections[randomIndex].selection_name,
          avg_odds: flatSelections[randomIndex].avg_odds
        }
      ];
    } else {
      return [];
    }
  }

  useEffect(() => {
    if (runners?.selections && totalFurlongs !== 0) {
      const flatWinnerData = GetFlatWinner(runners);
      const hurdleWinnerData = GetHurdleWinner(runners);

      setFlatWinner(flatWinnerData);
      setHurdleWinner(hurdleWinnerData);

    }
  }, [runners, totalFurlongs]); // Re-run the effect when runners or totalFurlongs changes

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-3.5 p-3.5">
          <div className="flex flex-col gap-6 xl:flex-row items-center">
            <div className="flex-grow xl:w-1/2">
              <MeetingEvents
                meetings={meetings}
                handleEventSelectChange={handleEventSelectChange}
                // selectedOption={selectedOption}
                isOptionSelected={isOptionSelected}
              />
            </div>
            <div className="flex-grow xl:w-1/2">
              <MeetingsDate
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
          </div>

        </div>
      </div>

      <div className="flex gap-0">
        <div className="flex-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3.5">

          <ControlPanel
            totalFurlongs={totalFurlongs}
            setTotalFurlongs={setTotalFurlongs}
            tolerance={tolerance}
            setTolerance={setTolerance}
            parameters={parameters}
            setParameters={setParameters}
            raceType={raceType}
            miles={miles}
            furlongs={furlongs}
            yards={yards}
            yardOptions={yardOptions}
            isHandicapRace={isHandicapRace}
            handleCheckboxChange={handleCheckboxChange}
            handleRaceTypeChange={handleRaceTypeChange}
            handleMilesChange={handleMilesChange}
            handleFurlongsChange={handleFurlongsChange}
            handleYardsChange={handleYardsChange}
            handPickWinner={handPickWinner}
            handleToleranceChange={handleToleranceChange}
            isLoading={isLoading}
            distanceM={distanceM}
            distanceF={distanceF}
            distanceY={distanceY}
          />
        </div>
        <div className="flex-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3.5">
          <div className="flex flex-col gap-9 items-end"> {/* Align items to the end (right) */}
            <div className="w-full xl:max-w-3xl p-4 rounded-lg border-[1.5px] border-stroke bg-white dark:bg-form-input dark:border-strokedark bg-blue-50" style={{ height: '220px' }}>

                  <CleanBetPick totalFurlongs={totalFurlongs} raceType={raceType} flatWinner={flatWinner} hurdleWinner={hurdleWinner} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <SelctionsTable
          raceType={raceType}
          isHandicapRace={isHandicapRace}
          runners={runners}
          selectedTime={selectedTime}
          selectedMeetingTime={selectedMeetingTime}
          handleTimeClick={handleTimeClick}
        />
      </div>
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}  // Ensure this is correctly passed
        modalData={modalData}
      />
    </>
  );
};

export default Horses;

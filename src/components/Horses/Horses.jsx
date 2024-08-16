'use client';
import React, { useState, useEffect } from 'react';
import SelctionsTable from '@/components/Horses/SelectionsTable';
import MeetingEvents from '@/components/Horses/MeetingEvents';
import ControlPanel from '@/components/Horses/ControlPanel';
import MeetingsDate from '@/components/Horses/MeetingsDate';
import TimeSelection from '@/components/Horses/TimeSelection';
import axios from "axios";

const Horses = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [distanceM, setDistanceM] = useState('');
  const [distanceF, setDistanceF] = useState('');
  const [distanceY, setDistanceY] = useState('');
  const [optimalParamsEnabled, setOptimalParams] = useState(false);
  const [raceType, setRaceType] = useState('FLAT');
  const [miles, setMiles] = useState('');
  const [furlongs, setFurlongs] = useState('');
  const [yards, setYards] = useState('');
  const [totalFurlongs, setTotalFurlongs] = useState(0);
  const [optimalParameters, setOptimalParameters] = useState({
    avr_number_of_runs: '',
    avr_years_in_competition: '',
    avr_number_of_wins: '',
    avr_rating: '',
    avr_position: '',
    avr_distance: '',
  });

  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const [selectedMeetingTime, setSelectedMeetingTime] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [runners, setRunners] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/preparation/GetTodayMeeting`, {
      params: { date: selectedDate }
    }).then((response) => {
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
    }).catch((error) => {
      console.error("Error fetching meetings:", error);
    });
  }, [selectedDate]);

  useEffect(() => {
    if (selectedMeeting) {
      axios.get(`${baseURL}/preparation/GetMeetingRunners`, {
        params: {
          event_name: selectedMeeting,
          event_time: selectedTime,
          event_date: selectedDate,
          race_type: raceType
        }
      }).then((response) => {
        setRunners(response?.data?.analysisDataResponse || []);
        setOptimalParameters(response?.data?.analysisDataResponse?.parameters || {});
      }).catch((error) => {
        console.error("Error fetching runners:", error);
      });
    }
  }, [selectedMeeting, selectedTime, selectedDate, raceType]);

  const handleOptimalParamsChange = (e) => {
    setOptimalParams(e.target.checked);
  };

  const handleRaceTypeChange = (e) => {
    setRaceType(e.target.value);
  };

  const handleMilesChange = (e) => {
    console.log('Miles input value:', e.target.value);
    setMiles(e.target.value);
  };

  const handleFurlongsChange = (e) => {
    console.log('Furlongs input value:', e.target.value);
    setFurlongs(e.target.value);
  };

  const handleYardsChange = (e) => {
    console.log('Yards input value:', e.target.value);
    setYards(e.target.value);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setDistanceM('');
    setDistanceF('');
    setDistanceY('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRunners((prevState) => ({
      ...prevState,
      parameters: {
        ...prevState.parameters,
        [name]: value,
      },
    }));
  };

  const handleEventSelectChange = (event) => {
    const selectedEventName = event.target.value;
    setSelectedMeeting(selectedEventName);

    const selectedMeetingDetails = meetings.find(meeting => meeting.event_name === selectedEventName);
    const times = [...new Set(selectedMeetingDetails?.event_time.split(','))];
    setSelectedMeetingTime(selectedMeetingDetails?.event_time || '');
    if (times.length > 0) {
      setSelectedTime(times[0]);
    } else {
      setSelectedTime('');
    }
  };

  const yardOptions = [];
  for (let i = 0; i <= 220; i++) {
    yardOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  if (!meetings) {
    return <div>Loading...</div>;
  }
console.log('totalFurlong', totalFurlongs);
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row items-center">
            <div className="flex-grow xl:w-1/2">
              <MeetingEvents
                meetings={meetings}
                handleEventSelectChange={handleEventSelectChange}
                selectedOption={selectedOption}
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
          <div className="">
            <div className="flex-grow xl:w-1/2">
              <TimeSelection
                selectedTime={selectedTime}
                selectedMeetingTime={selectedMeetingTime}
                handleTimeClick={handleTimeClick}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-6.5">
          <ControlPanel
            totalFurlongs={totalFurlongs}
            setTotalFurlongs={setTotalFurlongs}
            optimalParameters={optimalParameters}
            setOptimalParameters={setOptimalParameters}
            raceType={raceType}
            miles={miles}
            furlongs={furlongs}
            yards={yards}
            yardOptions={yardOptions}
            handleRaceTypeChange={handleRaceTypeChange}
            handleMilesChange={handleMilesChange}
            handleFurlongsChange={handleFurlongsChange}
            handleYardsChange={handleYardsChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <SelctionsTable
          optimalParamsEnabled={optimalParamsEnabled}
          raceType={raceType}
          miles={miles}
          furlongs={furlongs}
          yards={yards}
          runners={runners}
        />
      </div>
    </>
  );
};

export default Horses;

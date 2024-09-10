"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MeetingsDate from "@/components/Horses/MeetingsDate";
import axios from "axios";

const CleanBet = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [predictions, setPredictions] = useState([]);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const ukRacecourses = [
    "Cheltenham", "Aintree", "Goodwood", "Newmarket", "Royal Ascot", "Ascot", "Epsom Downs", "Epsom",
    "Doncaster", "Newbury", "Lingfield", "Wolverhampton", "Kempton", "Haydock Park", "Haydock", "Ascot",
    "Chester", "York", "Windsor", "Bath", "Brighton", "Southwell", "Ffos Las", "Catterick", "Stratford",
    "Wetherby", "Fontwell", "Hereford", "Ripon", "Warwick", "Cartmel", "Plumpton", "Hamilton Park",
    "Hamilton", "Lingfield Park", "Lingfield", "Nottingham", "Bangor-on-Dee", "Bangor", "Newton Abbot",
    "Towcester", "Fontwell Park", "Fontwell", "Musselburgh", "Kelso", "Sedgefield", "Market Rasen",
    "Pontefract", "Hexham", "Thirsk", "Beverley", "Leicester", "Uttoxeter", "Newcastle", "Folkestone", "Yarmouth"
  ];

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(`${baseURL}/preparation/GetPredictions?event_date=${selectedDate}`);
        const predictionsData = response?.data?.predictions;

        if (Array.isArray(predictionsData)) {
          // Sort predictions by event_time in ascending order
          const sortedPredictions = predictionsData.sort((a, b) => {
            // Assuming event_time is in HH:mm format or any valid date-time format
            const timeA = new Date(`${selectedDate}T${a.event_time}`);
            const timeB = new Date(`${selectedDate}T${b.event_time}`);
            return timeA - timeB;
          });
          setPredictions(sortedPredictions);
        } else {
          console.error("Predictions data is not an array:", predictionsData);
          setPredictions([]);
        }
        console.log("response ...", response);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setPredictions([]);
      }
    };

    fetchPredictions();
  }, [selectedDate, baseURL]);

  const groupSelectionsByEvent = Array.isArray(predictions)
    ? predictions.reduce((group, selection) => {
        const { event_name } = selection;
        if (!group[event_name]) {
          group[event_name] = [];
        }
        group[event_name].push(selection);
        return group;
      }, {})
    : {};

  const filteredSelectionsByEvent = Object.entries(groupSelectionsByEvent).filter(([eventName]) =>
    ukRacecourses.includes(eventName)
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clean Bets" />
      <div className="flex-grow xl:w-1/2 mb-6">
        <MeetingsDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      {filteredSelectionsByEvent.map(([eventName, eventSelections]) => (
        <div key={eventName}>
          {/* Event Name Header */}
          <h2 className="text-2xl font-bold mb-4 mt-6">{eventName}</h2>

          {/* Grid layout to ensure three rectangles in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 2xl:gap-7.5">
            {/* Group selections by event time */}
            {Object.entries(
              eventSelections.reduce((group, selection) => {
                const { event_time } = selection;
                if (!group[event_time]) {
                  group[event_time] = [];
                }
                group[event_time].push(selection);
                return group;
              }, {})
            ).map(([eventTime, timeSelections]) => (
              <div
                key={eventTime}
                className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                {/* Time Header */}
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Time:</span>
                  <span className="text-green-500 ml-2 font-bold">{eventTime}</span>
                </div>

                {/* Render selections with the same time */}
                {timeSelections.map((selection) => (
                  <div key={selection.selection_id} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-green-500 ml-2 font-bold">{selection?.selection_name + " " + selection?.odds}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </DefaultLayout>
  );
};

export default CleanBet;

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

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(`${baseURL}/preparation/GetPredictions?event_date=${selectedDate}`);
        const predictionsData = response?.data?.predictions;

        if (Array.isArray(predictionsData)) {
          setPredictions(predictionsData);
        } else {
          console.error("Predictions data is not an array:", predictionsData);
          setPredictions([]);
        }
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setPredictions([]);
      }
    };

    fetchPredictions();
  }, [selectedDate, baseURL]);

  // Group predictions by event name
  const groupedPredictions = predictions.reduce((acc, prediction) => {
    if (!acc[prediction.event_name]) {
      acc[prediction.event_name] = [];
    }
    acc[prediction.event_name].push(prediction);
    return acc;
  }, {});

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clean Bets" />
      <div className="flex mb-6">
        <div className="flex-grow xl:w-1/2 mr-4">
          <MeetingsDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <div className="flex-grow xl:w-1/6">
          <div className="rounded-sm border border-stroke bg-grey-200 p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg">Starting Pot:</h2>
              <span className="text-lg flex items-center">
                <span className="mr-1">€</span>
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg">Total Bet:</h2>
              <span className="text-lg flex items-center">
                <span className="mr-1">€</span>
              </span>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-lg">Total Profit & Loss:</h2>
              <span className={`text-lg flex items-center ${23 > 12 ? 'text-green-500' : 'text-red-500'}`}>
                <span className="mr-1">€</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Render grouped predictions */}
      {Object.entries(groupedPredictions).map(([eventName, eventPredictions]) => (
        <div key={eventName}>
          {/* Event Name Header */}
          <h2 className="text-2xl font-bold mb-4 mt-6">{eventName}</h2>

          {/* Grid Container with Three Columns on Large Screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventPredictions.map((prediction, index) => (
              <div
                key={index}
                className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                {/* Time Header */}
                <div className="flex justify-between mb-4">
                  <span className="text-meta-1">{prediction?.event_time}</span>
                </div>

                {/* Table Header for Selections */}
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <span className="text-meta-6 w-1/4 text-left">Selection</span>
                  <span className="text-meta-6 w-1/4 text-left">Score</span>
                  <span className="text-meta-6 w-1/4 text-left">Odds</span>
                  <span className="text-meta-6 w-1/4 text-left">Position</span>
                </div>

                {/* Render selection details */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    {/* Align each item to match the header alignment */}
                    <span className="text-blue-500 w-1/4 text-left font-bold">{prediction?.selection_name.slice(0, 7)}</span>
                    <span className="text-blue-500 w-1/4 text-left font-bold">
                      {prediction?.clean_bet_score}
                    </span>
                    <span className="text-green-500 w-1/4 text-left font-bold text-sm">{prediction?.odds}</span>
                    <span className="text-green-500 w-1/4 text-left font-bold text-sm">{prediction?.selection_position}</span>
                  </div>
                </div>


                {/* Divider */}
                <div className="border-t border-stroke"></div>
                P&L for this event:&nbsp;
              </div>
            ))}
          </div>
        </div>
      ))}

    </DefaultLayout>
  );
};

export default CleanBet;

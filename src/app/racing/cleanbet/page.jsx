'use client';
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MeetingsDate from "@/components/Horses/MeetingsDate";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";  // Importing icons for check and cross

const CleanBet = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [predictions, setPredictions] = useState([]);
  const [totalBet, setTotalBet] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(`${baseURL}/preparation/GetPredictions?event_date=${selectedDate}`);
        const predictionsData = response?.data?.predictions?.selections;
        const totalBetAmount = response?.data?.predictions?.total_bet;
        const totalProfitAmount = response?.data?.predictions?.total_return;
        setTotalBet(totalBetAmount);
        setTotalProfit(totalProfitAmount);

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
              <h2 className="text-lg">Total Bet:</h2>
              <span className="text-lg flex items-center">
                <span className="mr-1">€{totalBet}</span>
              </span>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-lg">Total Profit & Loss:</h2>
              <span className={`text-lg flex items-center ${totalProfit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span className="mr-1">€{totalProfit.toFixed(2)}</span>
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
            {eventPredictions.map((prediction, index) => {
              // Determine if the selection is a win (e.g., position "1") or loss
              const isWin = prediction.position[0] === "1";

              return (
                <div
                  key={index}
                  className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
                >
                  {/* Time or Date Header (Red for loss, Green for win) */}
                  <div className="flex justify-between mb-4">
                    <span
                      className={`flex items-center ${
                        isWin ? "text-green-500" : "text-meta-1"
                      }`}
                    >
                      {isWin ? (
                        <>
                          <span className="mr-1">{prediction?.event_time}</span>
                          <FaCheck /> {/* Checkmark icon for win */}
                        </>
                      ) : (
                        <>
                          <span className="mr-1">{prediction?.event_time}</span>
                          <FaTimes /> {/* Cross icon for loss */}
                        </>
                      )}
                    </span>
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
                      <span className="text-blue-500 w-1/4 text-left font-bold">
                        {prediction?.selection_name.slice(0, 7)}
                      </span>
                      <span className="text-blue-500 w-1/4 text-left font-bold">
                        {prediction?.clean_bet_score}
                      </span>
                      <span className="text-green-500 w-1/4 text-left font-bold text-sm">
                        {prediction?.odds}
                      </span>
                      <span className="text-green-500 w-1/4 text-left font-bold text-sm">
                        {prediction?.position}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-stroke"></div>
                  P&L for this event:&nbsp;
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </DefaultLayout>
  );
};

export default CleanBet;

"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MeetingsDate from "@/components/Horses/MeetingsDate";
import axios from "axios";

const CleanBet = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [predictions, setPredictions] = useState([]);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(`${baseURL}/preparation/GetPredictions?event_date=` + selectedDate);
        setPredictions(response?.data?.predictions || []);
        console.log('response ...', response);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchPredictions();
  }, [selectedDate, baseURL]);

  // Group selections by event name
  const groupSelectionsByEvent = predictions.reduce((group, selection) => {
    const { event_name } = selection; // Corrected field name from eventName to event_name
    if (!group[event_name]) {
      group[event_name] = [];
    }
    group[event_name].push(selection);
    return group;
  }, {});

  console.log('predictions ...', predictions);
  console.log('selectedDate...', selectedDate);
  console.log('groupSelectionsByEvent ...', groupSelectionsByEvent);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Today Clean Bets" />
      <div className="flex-grow xl:w-1/2 mb-6">
        <MeetingsDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      {Object.entries(groupSelectionsByEvent).map(([eventName, eventSelections]) => (
        <div key={eventName}>
          {/* Event Name Header */}
          <h2 className="text-2xl font-bold mb-4 mt-6">{eventName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 2xl:gap-7.5">
            {eventSelections.map((selection, index) => (
              <div
                key={selection.selection_id} // Use selection_id for unique key
                className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                {/* Details for each grid item */}
                <p className="text-sm">{selection.run_count || 'Unknown'} Runners</p>
                <p className="text-sm font-medium">Selection: {selection.selection_name}</p> {/* Corrected field name from selectionName to selection_name */}
                <p className="text-sm">Odds: {selection.odds}</p>
                <p className="text-sm">Clean Bet Score: {selection.total_score}</p> {/* Corrected field name from cleanBetScore to total_score */}
                <p className="text-sm">Average Position: {selection.avg_position}</p> {/* Corrected field name from avgPosition to avg_position */}
                <p className="text-sm">Average Rating: {selection.avg_rating}</p> {/* Corrected field name from avgRating to avg_rating */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </DefaultLayout>
  );
};

export default CleanBet;

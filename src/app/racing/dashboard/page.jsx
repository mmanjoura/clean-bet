"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MeetingsDate from '@/components/Horses/MeetingsDate';
import axios from 'axios';

const Dashboard = () => {

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  console.log("Selected Date:", selectedDate);

  const handleGetRacingMarketData = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(`${baseURL}/preparation/GetRacingMarketData`, {
        event_date: selectedDate,  // Add your parameter(s) here
      });

      // Handle the response further here if needed
    } catch (error) {
      console.error("Scraping Racing Market Data", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // Stop loading
    }
  };


  const handleGetRacingMarketWinners = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(`${baseURL}/preparation/GetRacingMarketWinners`, {
        event_date: selectedDate,  // Add your parameter(s) here
      });

    } catch (error) {
      console.error("Scraping Market Winners", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // Stop loading
    }
  };



  const isButtonDisabled = false

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Import Markets" />

      <div  className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-4 md:p-6 xl:p-9" >

          <div className="flex-grow xl:w-1/3">
          <MeetingsDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-end mt-6 gap-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md h-12 px-8 text-center font-medium text-white hover:bg-opacity-90"
              style={{ backgroundColor: '#2b96f0', whiteSpace: 'nowrap' }}
              onClick={handleGetRacingMarketData}
              disabled={isButtonDisabled}
            >
              {isLoading ? (
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
              ) : (
                "Get Market Data"
              )}
            </Link>

            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md h-12 px-8 text-center font-medium text-white hover:bg-opacity-90"
              style={{ backgroundColor: '#2b96f0', whiteSpace: 'nowrap' }}
              onClick={handleGetRacingMarketWinners}
              disabled={isButtonDisabled}
            >
              {isLoading ? (
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
              ) : (
                "Get Market Winners"
              )}
            </Link>
          </div>


        </div>
      </div>



    </DefaultLayout>
  );
};

export default Dashboard;

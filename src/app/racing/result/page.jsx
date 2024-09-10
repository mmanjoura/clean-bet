"use client";
import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Predictions from "@/components/Horses/Predictions/Predictions";
import { useEffect, useState } from "react";
import MeetingsDate from "@/components/Horses/MeetingsDate";
import axios from "axios";

const page = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [predictions, setpPedictions] = useState([]);


    useEffect(() => {

        const fetchPredictions = async () => {
          try {
            const response = await axios.get(`${baseURL}/preparation/GetPredictions?event_date=` + selectedDate, {

             

            });
            setpPedictions(response || []);
            console.log('response ...', response);

          } catch (error) {
            console.error("Error fetching runners:", error);
          }
        };
  
        fetchPredictions();
      
  
    }, [selectedDate]);

    return (
      <DefaultLayout>
        <Breadcrumb pageName="Events Predictions" />
        <div className="flex items-center justify-between"> {/* Updated flex container */}
          <div className="flex-grow xl:w-1/2">
            <MeetingsDate
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

        </div>
        <Predictions predictions={predictions} />
      </DefaultLayout>
    );
    
};

export default page;

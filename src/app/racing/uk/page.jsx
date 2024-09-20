
'use client';
import ECommerce from "@/components/Dashboard/E-commerce";
import { useState } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Horses from "@/components/Horses/Horses";

export default function Home() {
  const [eventName, setEventName] = useState("UK");
  
  return (
    <>
      <DefaultLayout>
        <Horses EventName = {eventName}/>
      </DefaultLayout>
    </>
  );
}

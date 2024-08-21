"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UkIrelandWin from "@/components/Horses/Charts/UkIrelandWin";
import UkIrelandPlace from "@/components/Horses/Charts/UkIrelandPlace";
import ChartTwo from "@/components/Charts/ChartTwo";
import dynamic from "next/dynamic";

const Stats: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Statistics" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <UkIrelandWin />
        <ChartTwo />
      </div>
    </DefaultLayout>
  );
};

export default Stats;

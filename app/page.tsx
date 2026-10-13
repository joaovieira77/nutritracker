"use client";

import { useState } from "react";
import BottomNav, { Tab } from "@/components/BottomNav";
import TodayTab from "@/components/TodayTab";
import WeightTab from "@/components/WeightTab";
import BloodPressureTab from "@/components/BloodPressureTab";
import ReportTab from "@/components/ReportTab";
import MoreTab from "@/components/MoreTab";
import StepsTab from "@/components/StepsTab";
import SleepTab from "@/components/SleepTab";
import CaloriesTab from "@/components/CaloriesTab";

export default function Home() {
  const [tab, setTab] = useState<Tab>("today");

  return (
    <main>
      {tab === "today" && <TodayTab />}
      {tab === "weight" && <WeightTab />}
      {tab === "bloodPressure" && <BloodPressureTab />}
      {tab === "report" && <ReportTab />}
      {tab === "more" && <MoreTab onNavigate={setTab} />}
      {tab === "steps" && <StepsTab />}
      {tab === "sleep" && <SleepTab />}
      {tab === "calories" && <CaloriesTab />}
      <BottomNav active={tab} onChange={setTab} />
    </main>
  );
}

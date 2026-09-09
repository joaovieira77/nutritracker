"use client";

import { useState } from "react";
import BottomNav, { Tab } from "@/components/BottomNav";
import TodayTab from "@/components/TodayTab";
import WeightTab from "@/components/WeightTab";
import ReportTab from "@/components/ReportTab";
import MoreTab from "@/components/MoreTab";

export default function Home() {
  const [tab, setTab] = useState<Tab>("today");

  return (
    <main>
      {tab === "today" && <TodayTab />}
      {tab === "weight" && <WeightTab />}
      {tab === "report" && <ReportTab />}
      {tab === "more" && <MoreTab />}
      <BottomNav active={tab} onChange={setTab} />
    </main>
  );
}

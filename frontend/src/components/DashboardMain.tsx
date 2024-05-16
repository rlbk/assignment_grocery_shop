import React from "react";
import OverviewSection from "./OverviewSection";
import GroceryItem from "./GroceryItem";

type TProps = {
  tab: string;
};

const DashboardMain: React.FC<TProps> = ({ tab }) => {
  return (
    <div className="bg-slate-200 flex-1 px-8 py-10 overflow-y-auto hidden-scrollbar">
      {tab === "overview" && <OverviewSection />}
      {tab === "grocery-item" && <GroceryItem />}
    </div>
  );
};

export default DashboardMain;

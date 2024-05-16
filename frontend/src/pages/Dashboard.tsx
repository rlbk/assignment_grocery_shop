import { Navigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import DashboardMain from "../components/DashboardMain";
import { useEffect } from "react";
import { getGroceries } from "../redux/features/grocery-item/groceryApi";
import { useAppDispatch } from "../redux/hook";
import { getTotalSales } from "../redux/features/sales/salesApi";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  useEffect(() => {
    dispatch(getGroceries());
    dispatch(getTotalSales());
  }, []);
  if (!tab) return <Navigate to={"?tab=overview"} />;
  return (
    <div className="h-screen flex flex-col hidden-scrollbar">
      <Navbar />
      <div
        className="flex "
        style={{
          height: "calc(100% - 80px)",
        }}
      >
        <SideNav tab={tab} />
        <DashboardMain tab={tab} />
      </div>
    </div>
  );
};

export default DashboardPage;

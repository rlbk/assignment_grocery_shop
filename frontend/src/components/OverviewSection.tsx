import { RiAlignItemLeftFill } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import Table from "./ui/Table";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import {
  getHighestProfitableItem,
  getLatestSales,
  getTopFiveSales,
} from "../redux/features/sales/salesApi";
import Shimear from "./ui/TextLoader";
import TextLoader from "./ui/TextLoader";

type TTF = "day" | "week" | "month";
const timeFrame = [
  {
    name: "In a Day",
    value: "day",
  },
  {
    name: "In a Week",
    value: "week",
  },
  {
    name: "In a Month",
    value: "month",
  },
];
const latestSalesCol = ["S.N", "Item Name", "Sold quantity", "Revenue"];
const topFiveSalesCol = ["S.N", "Item Name", "Sales count"];

const OverviewSection = () => {
  const dispatch = useAppDispatch();
  const totalGroceries = useAppSelector((state) => state.groceryReducer.total);
  const salesReducer = useAppSelector((state) => state.salesReducer);
  const totalSales = salesReducer.total;
  const latesSales = salesReducer.latestSales;
  const topFiveSales = salesReducer.topFive;
  const highestProfitableItem = salesReducer.highestProfitItem;
  const isLoading = salesReducer.loading;
  const [timeF, setTimeF] = useState<TTF>("day");

  useEffect(() => {
    dispatch(getLatestSales());
    dispatch(getTopFiveSales());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHighestProfitableItem({ timeframe: timeF }));
  }, [timeF, dispatch]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-green-600/80 py-8 px-12 rounded text-white flex gap-12 items-center">
          <RiAlignItemLeftFill size={70} />
          <p className="text-xl font-bold">
            <span className="text-3xl">
              {isLoading ? <TextLoader /> : totalGroceries}
            </span>{" "}
            <br /> Total Grocery Item
          </p>
        </div>
        <div className="flex-1 bg-blue-600/80 py-8 px-12 rounded text-white  flex gap-12 items-center">
          <SiSimpleanalytics size={70} />
          <p className="text-xl font-bold">
            <span className="text-3xl">
              {isLoading ? <TextLoader /> : totalSales}
            </span>
            <br /> Total Sales
          </p>
        </div>
      </div>
      <div className="bg-yellow-600 mt-12 rounded py-8 px-10 text-white">
        <h1 className="font-bold  text-2xl">Highest Profitable Item</h1>
        <div className="my-2">
          <p>{"{"}</p>
          <div className="pl-4">
            <p>
              Name:
              <span className="pl-2 text-yellow-950">
                {isLoading ? (
                  <TextLoader />
                ) : (
                  highestProfitableItem?.highestProfitableItem.name
                )}
              </span>
            </p>
            <p>
              Total Revenue:
              <span className="pl-2 text-yellow-950">
                {isLoading ? (
                  <TextLoader />
                ) : (
                  highestProfitableItem?.totalRevenue
                )}
              </span>
            </p>
            <p>
              TimeFrame:
              <span className="pl-2 text-yellow-950">
                {isLoading ? <TextLoader /> : highestProfitableItem?.timeframe}
              </span>
            </p>
          </div>
          <p>{"}"}</p>
        </div>
        <div className="flex gap-4">
          {timeFrame.map((timeframe, i) => (
            <button
              key={i}
              onClick={() => setTimeF(timeframe.value as TTF)}
              className={`  ${
                timeframe.value === timeF
                  ? "cursor-not-allowed border  border-white "
                  : "cursor-pointer hover:border-b hover:border-white bg-yellow-600"
              } py-2 px-4 rounded `}
            >
              {timeframe.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mt-16 mb-8">
        <div className="w-2/3 ">
          <h1 className="text-2xl font-bold text-primary mb-2">Latest Sales</h1>
          <Table>
            <Table.Head tableColumn={latestSalesCol} />
            <Table.Body>
              {latesSales?.length ? (
                latesSales.map((sales, i) => (
                  <Table.Row key={sales._id}>
                    <Table.Col>{i + 1}</Table.Col>
                    <Table.Col>{sales.itemId.name}</Table.Col>
                    <Table.Col>{sales.quantitySold}</Table.Col>
                    <Table.Col>{sales.totalRevenue}</Table.Col>
                  </Table.Row>
                ))
              ) : (
                <Table.Empty
                  text="No sales available"
                  colSpan={latestSalesCol.length}
                />
              )}
            </Table.Body>
          </Table>
        </div>
        <div className="w-1/3 ">
          <h1 className="text-2xl font-bold text-primary mb-2">Top 5 Sales</h1>
          <Table>
            <Table.Head tableColumn={topFiveSalesCol} />
            <Table.Body>
              {topFiveSales?.length ? (
                topFiveSales.map((sales, i) => (
                  <Table.Row key={sales._id}>
                    <Table.Col>{i + 1}</Table.Col>
                    <Table.Col>{sales.itemId.name}</Table.Col>
                    <Table.Col>{sales.salesCount}</Table.Col>
                  </Table.Row>
                ))
              ) : (
                <Table.Empty
                  text="No sales available"
                  colSpan={topFiveSalesCol.length}
                />
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;

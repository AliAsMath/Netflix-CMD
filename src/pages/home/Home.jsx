import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import axios from "axios";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const result = await axios.get("users/stats");
        result.data.map((group) =>
          setUserStats((prev) => [
            ...prev,
            { name: month[group._id - 1], "New User": group.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

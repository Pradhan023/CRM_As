import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { type Product } from "../product/ProductSlice";

const Dashboard = () => {
  const { products } = useSelector((state: any) => state.products);
  

  const chartData = useMemo(() => {
    return products?.map((product: Product) => ({
      name: `Item ${product.id}`,
      value: product.price,
    }));
  }, [products]);

  return (
    <div className="w-screen h-screen px-8 py-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;

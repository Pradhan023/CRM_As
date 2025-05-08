import { columns } from "@/components/product/Column";
import { DataList } from "@/components/product/List";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { products } = useSelector((state: any) => state.products);
  const nav = useNavigate();
  const data = products.map((i: any) => ({
    ...i,
    rating: i?.rating?.rate,
  }));

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between pr-4">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">Product List</h1>
        <Button variant={"blue"} onClick={() => nav("/product/create")}>
          <Plus />
          Create Product
        </Button>
      </div>
      <DataList columns={columns} data={data} />
    </div>
  );
};

export default ProductPage;

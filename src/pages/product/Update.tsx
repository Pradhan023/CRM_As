import { ProductForm } from "@/components/product/form/Form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FormUpdate = () => {
  const { id } = useParams();
  const { products } = useSelector((state: any) => state.products);
  const product = products.filter((i: any) => i.id == id);

  return (
    <div className=" w-full px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm id={id} data={product[0]} />
    </div>
  );
};

export default FormUpdate;

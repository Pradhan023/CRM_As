import { ProductForm } from "@/components/product/form/Form";

const FormPage = () => {
  return (
    <div className=" w-full px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

      <ProductForm />
    </div>
  );
};

export default FormPage;

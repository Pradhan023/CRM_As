import type { AppDispatch } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  addProduct,
  updateProduct,
  type Product,
} from "@/pages/product/ProductSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const formSchema = z.object({
  title: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  image: z.union([
    z.instanceof(FileList).refine((files) => files.length === 1, {
      message: "You must upload exactly one image.",
    }),
    z.string().url().optional(),
  ]),
  price: z.number().min(100, {
    message: "Must be   100",
  }),
});

export function ProductForm({ id, data }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      price: data?.price || "",
      image: data?.image || "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        price: data.price,
        image: data?.image || "",
      });
      setPreviewImage(data.image);
    }
  }, [data, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    let imageUrl: string;

    if (values.image instanceof FileList) {
      const file = values.image[0];
      imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    } else if (typeof values.image === "string") {
      imageUrl = values.image;
    } else {
      imageUrl = "";
    }

    const product: Product = {
      id: id || 0,
      title: values.title,
      price: values.price,
      image: imageUrl,
    };

    if (id) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }

    nav("/product");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="shadcn"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(
                      value === "" ? undefined : parseFloat(value)
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <input
                  className="border-2 p-2"
                  type="file"
                  placeholder="shadcn"
                  onChange={(e) => {
                    const files = e.target.files!;
                    field.onChange(files);
                    if (files.length > 0) {
                      setPreviewImage(URL.createObjectURL(files[0])); // update preview
                    }
                  }}
                  accept="image/*"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {id && (
          <div>
            <img
              className="h-20 w-20"
              src={previewImage ? previewImage : data?.image}
              alt="preview"
            />
          </div>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

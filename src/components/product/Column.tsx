"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./form/Actioncell";

export type List = {
  id: string;
  image: string;
  title: string;
  price: number;
};

export const columns: ColumnDef<List>[] = [
  {
    accessorKey: "id",
    header: "S No.",
  },
  {
    accessorKey: "image",
    header: "Profile",
    cell: ({ row }) => {
      const image: string = row.getValue("image");
      return (
        <img
          src={image}
          alt="image"
          className="h-10 w-10 rounded-full object-contain"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell id={Number(row.original.id)} />,
  },
];

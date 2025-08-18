"use client";

import React, { useEffect, useState } from "react";
import { deleteUser, listUsers } from "@/services/super_admin.service";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type Role = {
  id: number;
  name: string;
  slug: string;
};

type User = {
  ID: number;
  name: string;
  email: string;
  roles: Role[];
  is_active: boolean;
  last_login: string;
};

const Page = () => {
  const [data, setData] = useState<User[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await listUsers();
      setData(res.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (user: User) => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        toast(`Are you sure you want to delete user ${user.name}?`, {
          action: {
            label: "Delete",
            onClick: async () => {
              try {
                await deleteUser(user.ID);
                setData((prev) => prev.filter((u) => u.ID !== user.ID));
                resolve();
              } catch (err) {
                console.error("Error deleting user:", err);
                reject();
              }
            },
          },
          cancel: {
            label: "Cancel",
            onClick: () => reject(),
          },
          duration: 0,
        });
      }),
      {
        loading: "Deleting user...",
        success: "User deleted!",
        error: "Failed to delete user.",
      }
    );
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(!!val)}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.original.name}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      accessorKey: "roles",
      header: "Roles",
      cell: ({ row }) => (
        <span>{row.original.roles.map((role) => role.name).join(", ")}</span>
      ),
    },

    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.original.is_active
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {row.original.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View user</DropdownMenuItem>

            {row.original.roles.some((role) => role.slug === "superadmin") ? (
              <DropdownMenuItem disabled>
                Cannot delete super admin
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => handleDelete(row.original)}>
                Delete User
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4">
      {/* Top controls */}
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search by name..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-64"
        />
        <DropdownMenu>{/* Column toggle menu here */}</DropdownMenu>
      </div>

      {/* Table */}
      <table className="w-full border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="border p-2 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span>
          {table.getSelectedRowModel().rows.length} of{" "}
          {table.getRowModel().rows.length} row(s) selected
        </span>
        <div className="flex gap-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;

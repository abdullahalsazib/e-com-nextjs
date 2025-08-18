"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getVendors,
  approveVendor,
  rejectVendor,
  suspendVendor,
} from "@/services/vendor.service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

type Vendor = {
  id: number;
  shop_name: string;
  status: string;
  user: {
    name: string;
    email: string;
    roles: { name: string }[];
    is_active: boolean;
  };
  created_at: string;
};

export default function VendorsPage() {
  const [data, setData] = useState<Vendor[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  // const [search, setSearch] = useState("");
  const [confirmSuspend, setConfirmSuspend] = useState<{
    open: boolean;
    vendorId: number | null;
  }>({ open: false, vendorId: null });

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      setData(res);

      console.log("Fetched vendors:", res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id: string) => {
    await approveVendor(id);
    fetchVendors();
  };
  const handleReject = async (id: number) => {
    await rejectVendor(id);

    fetchVendors();
  };

  const handleSuspend = async () => {
    if (confirmSuspend.vendorId) {
      await suspendVendor(confirmSuspend.vendorId);
      setConfirmSuspend({ open: false, vendorId: null });
      fetchVendors();
    }
  };

  const columns: ColumnDef<Vendor>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    { accessorKey: "id", header: "#ID" },
    { accessorKey: "shop_name", header: "Shop Name" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`px-2 py-1 rounded text-white text-xs ${
              status === "pending"
                ? "bg-yellow-500"
                : status === "approved"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    { accessorKey: "user.name", header: "User Name" },
    { accessorKey: "user.email", header: "Email" },
    {
      accessorKey: "user.roles",
      header: "Role",
      cell: ({ row }) => row.original.user.roles.map((r) => r.name).join(", "),
    },
    {
      accessorKey: "user.is_active",
      header: "Active",
      cell: ({ row }) =>
        row.original.user.is_active ? (
          <span className="text-green-600 font-semibold">Yes</span>
        ) : (
          <span className="text-red-600 font-semibold">No</span>
        ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.created_at).toLocaleString(),
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
            <DropdownMenuItem
              // onClick={() => toast(row.original.id)}
              onClick={() => handleApprove(String(row.original.id))}
            >
              <>Approve</>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleReject(row.original.id)}>
              Reject
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setConfirmSuspend({ open: true, vendorId: row.original.id })
              }
            >
              Suspend
            </DropdownMenuItem>
            <DropdownMenuItem>View User</DropdownMenuItem>
            <DropdownMenuItem>Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <Card className=" bg-white dark:bg-gray-900">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Vendors List</CardTitle>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Columns</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {table.getAllLeafColumns().map((column) => (
                  <DropdownMenuItem key={column.id}>
                    <Checkbox
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    />
                    <span className="ml-2">{column.id}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" && " 🔼"}
                      {header.column.getIsSorted() === "desc" && " 🔽"}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm">
              {Object.keys(rowSelection).length} of {data.length} row(s)
              selected.
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suspend Confirm Modal */}
      <Dialog
        open={confirmSuspend.open}
        onOpenChange={(open) =>
          setConfirmSuspend({ open, vendorId: confirmSuspend.vendorId })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Suspension</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to suspend this vendor?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmSuspend({ open: false, vendorId: null })}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSuspend}>
              Suspend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

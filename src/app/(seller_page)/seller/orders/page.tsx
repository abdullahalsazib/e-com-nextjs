"use client";

import { useState } from "react";
import OrderDetailsModal from "../seller_component/OrderDetailsModal";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: OrderStatus;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
}

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample order data
  const orders: Order[] = [
    {
      id: "ORD-1001",
      customer: "Alex Johnson",
      date: "2023-05-15",
      amount: 129.98,
      status: "delivered",
      items: [
        { product: "Wireless Headphones", quantity: 1, price: 89.99 },
        { product: "Phone Case", quantity: 1, price: 39.99 },
      ],
    },
    {
      id: "ORD-1002",
      customer: "Maria Garcia",
      date: "2023-05-16",
      amount: 54.97,
      status: "shipped",
      items: [
        { product: "Organic Cotton T-Shirt", quantity: 2, price: 24.99 },
        { product: "Stainless Steel Bottle", quantity: 1, price: 24.99 },
      ],
    },
    {
      id: "ORD-1003",
      customer: "James Wilson",
      date: "2023-05-17",
      amount: 89.99,
      status: "processing",
      items: [{ product: "Smart Watch", quantity: 1, price: 89.99 }],
    },
    {
      id: "ORD-1004",
      customer: "Sarah Miller",
      date: "2023-05-18",
      amount: 74.97,
      status: "pending",
      items: [
        { product: "Yoga Mat", quantity: 1, price: 29.99 },
        { product: "Resistance Bands", quantity: 1, price: 19.99 },
        { product: "Foam Roller", quantity: 1, price: 24.99 },
      ],
    },
    {
      id: "ORD-1005",
      customer: "David Lee",
      date: "2023-05-14",
      amount: 199.95,
      status: "cancelled",
      items: [
        { product: "Bluetooth Speaker", quantity: 1, price: 129.99 },
        { product: "USB-C Cable", quantity: 2, price: 34.98 },
      ],
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    // In a real app, you would update the order status in your database here
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-sm font-medium text-gray-700">
          Filter by status:
        </span>
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1 text-sm rounded-full ${
            statusFilter === "all"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter("pending")}
          className={`px-3 py-1 text-sm rounded-full ${
            statusFilter === "pending"
              ? "bg-yellow-600 text-white"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatusFilter("processing")}
          className={`px-3 py-1 text-sm rounded-full ${
            statusFilter === "processing"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
        >
          Processing
        </button>
        <button
          onClick={() => setStatusFilter("shipped")}
          className={`px-3 py-1 text-sm rounded-full ${
            statusFilter === "shipped"
              ? "bg-indigo-600 text-white"
              : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
          }`}
        >
          Shipped
        </button>
        <button
          onClick={() => setStatusFilter("delivered")}
          className={`px-3 py-1 text-sm rounded-full ${
            statusFilter === "delivered"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800 hover:bg-green-200"
          }`}
        >
          Delivered
        </button>
        <button
          onClick={() => setStatusFilter("cancelled")}
          className={`px-3 py-1 text-sm rounded-full ${
            statusFilter === "cancelled"
              ? "bg-red-600 text-white"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
          onStatusUpdate={updateOrderStatus}
        />
      )}
    </div>
  );
};

export default Orders;

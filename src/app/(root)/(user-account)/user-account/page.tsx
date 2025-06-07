"use client";
import React, { JSX, useState } from "react";
import Breadcrumb from "@/app/components/smallComponent/Breadcrumb";
import {
  FiUser,
  FiMapPin,
  FiShoppingBag,
  FiDownload,
  FiCreditCard,
  FiHeart,
  FiFileText,
  FiStar,
  FiMail,
  FiHome,
} from "react-icons/fi";
import { useAuth } from "@/app/context/AuthContext";
import PrivateRoute from "@/app/components/PrivateRoute";
type SectionKey =
  | "dashboard"
  | "account"
  | "address"
  | "orders"
  | "downloads"
  | "payments"
  | "billing"
  | "wishlist"
  | "reviews"
  | "newsletters";

const breadcrumb = [
  { label: "Home", link: "/" },
  { label: "User account", active: true },
];

const User_account = () => {
  // State to track active section
  const [activeSection, setActiveSection] = useState<SectionKey>("dashboard");

  // Menu items with corresponding sections
  const menuItems = [
    {
      icon: <FiHome />,
      label: "Account Dashboard",
      section: "dashboard" as SectionKey,
    },
    {
      icon: <FiUser />,
      label: "Account Information",
      section: "account" as SectionKey,
    },
    {
      icon: <FiMapPin />,
      label: "Address Book",
      section: "address" as SectionKey,
    },
    {
      icon: <FiShoppingBag />,
      label: "My Orders",
      section: "orders" as SectionKey,
    },
    { divider: true },
    {
      icon: <FiDownload />,
      label: "Downloadable Products",
      section: "downloads" as SectionKey,
    },
    {
      icon: <FiCreditCard />,
      label: "Payment Methods",
      section: "payments" as SectionKey,
    },
    {
      icon: <FiFileText />,
      label: "Billing Agreements",
      section: "billing" as SectionKey,
    },
    {
      icon: <FiHeart />,
      label: "My Wish List",
      section: "wishlist" as SectionKey,
    },
    { divider: true },
    {
      icon: <FiStar />,
      label: "Product Reviews",
      section: "reviews" as SectionKey,
    },
    {
      icon: <FiMail />,
      label: "Newsletter Subscriptions",
      section: "newsletters" as SectionKey,
    },
  ];
  // Section components with proper typing
  const { user } = useAuth();
  const sections: Record<SectionKey, JSX.Element> = {
    dashboard: <DashboardSection user={user} />,
    account: <AccountInfoSection user={user} />,
    address: <AddressBookSection />,
    orders: <OrdersSection />,
    downloads: <DownloadsSection />,
    payments: <PaymentsSection />,
    billing: <BillingSection />,
    wishlist: <WishlistSection />,
    reviews: <ReviewsSection />,
    newsletters: <NewslettersSection />,
  };

  return (
    <PrivateRoute allowedRoles={["user"]}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumb} />

          <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-8">
            My Dashboard
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/4 space-y-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {menuItems.map((item, index) =>
                    item.divider ? (
                      <div
                        key={`divider-${index}`}
                        className="border-t border-gray-100 my-1"
                      />
                    ) : (
                      <li key={item.label}>
                        <button
                          onClick={() => setActiveSection(item.section!)}
                          className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                            activeSection === item.section
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span
                            className={`text-lg ${
                              activeSection === item.section
                                ? "text-blue-500"
                                : "text-gray-400"
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Widgets */}
              <CompareProductsWidget />
              <WishlistWidget />
            </div>

            {/* Main Content - Dynamic based on selection */}
            <div className="w-full lg:w-3/4">{sections[activeSection]}</div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

// Component for each section

interface User {
  name: string;
  email: string;
}

interface Props {
  user: User | null;
}
const DashboardSection: React.FC<Props> = ({ user }) => {
  if (!user) return <div>user loged out</div>;
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Account Dashboard
          </h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">Hello, {user.name}</p>
          <p className="text-gray-600">
            From your account dashboard you can view your recent orders, manage
            your shipping and billing addresses, and edit your password and
            account details.
          </p>
        </div>
      </div>
    </>
  );
};
const AccountInfoSection: React.FC<Props> = ({ user }) => {
  if (!user) return <div>User Loged Out</div>;
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Account Information
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Contact Information
            </h3>
            <p className="text-gray-600">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
            <div className="mt-4 space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Edit
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300">
                Change Password
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Newsletters
            </h3>
            <p className="text-gray-600">
              You are currently not subscribed to any newsletter.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              Edit Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressBookSection = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-100 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-900">Address Book</h2>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">
            Default Billing Address
          </h4>
          <p className="text-gray-600 text-sm">
            You have not set a default billing address.
          </p>
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            Edit Address
          </button>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">
            Default Shipping Address
          </h4>
          <p className="text-gray-600 text-sm">
            You have not set a default shipping address.
          </p>
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            Edit Address
          </button>
        </div>
      </div>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
        Add New Address
      </button>
    </div>
  </div>
);

const OrdersSection = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-100 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-900">My Orders</h2>
    </div>
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ship To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Total
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
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                100000001
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                4/15/2023
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                John Doe
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                $125.00
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Complete
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">
                  View Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-500">Showing 1 to 1 of 1 entries</p>
    </div>
  </div>
);

const DownloadsSection = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-100 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-900">
        My Downloadable Products
      </h2>
    </div>
    <div className="p-6 text-center">
      <p className="text-gray-600">
        You have not purchased any downloadable products yet.
      </p>
    </div>
  </div>
);

const PaymentsSection = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-100 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Stored Payment Methods
      </h2>
    </div>
    <div className="p-6 text-center">
      <p className="text-gray-600">You have no stored payment methods.</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
        Add Payment Method
      </button>
    </div>
  </div>
);

const BillingSection = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-100 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Billing Agreements
      </h2>
    </div>
    <div className="p-6 text-center">
      <p className="text-gray-600">You have no billing agreements.</p>
    </div>
  </div>
);

const WishlistSection = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-100 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-900">My Wish List</h2>
    </div>
    <div className="p-6 text-center">
      <p className="text-gray-600">You have no items in your wish list.</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
        Continue Shopping
      </button>
    </div>
  </div>
);

const ReviewsSection = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-100 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-900">
        My Product Reviews
      </h2>
    </div>
    <div className="p-6 text-center">
      <p className="text-gray-600">You have not submitted any reviews yet.</p>
    </div>
  </div>
);

const NewslettersSection = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-100 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Newsletter Subscriptions
      </h2>
    </div>
    <div className="p-6">
      <div className="flex items-start">
        <input
          type="checkbox"
          id="newsletter-subscription"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
        />
        <label
          htmlFor="newsletter-subscription"
          className="ml-3 block text-sm text-gray-700"
        >
          General Subscription
        </label>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
        Save
      </button>
    </div>
  </div>
);

// Widget components
const CompareProductsWidget = () => (
  <div className="bg-white rounded-xl shadow-sm p-4">
    <h3 className="font-bold text-lg text-center mb-3">Compare Products</h3>
    <p className="text-gray-500 text-center text-sm">
      You have no items to compare
    </p>
    <button className="mt-3 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors">
      Start Comparing
    </button>
  </div>
);

const WishlistWidget = () => (
  <div className="bg-white rounded-xl shadow-sm p-4">
    <h3 className="font-bold text-lg text-center mb-3">My Wish List</h3>
    <p className="text-gray-500 text-center text-sm">
      You have no items in your wish list
    </p>
    <button className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
      Browse Products
    </button>
  </div>
);

export default User_account;

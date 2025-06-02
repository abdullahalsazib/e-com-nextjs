"use client";
import { useState } from "react";
import {
  FiSettings,
  FiUser,
  FiLock,
  FiBell,
  FiCreditCard,
  FiShield,
  FiGlobe,
} from "react-icons/fi";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    businessName: "Doe Enterprises",
    address: "123 Business St, New York, NY",
    timezone: "America/New_York",
    currency: "USD",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          // ...prev[parent as keyof typeof formData],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (API call, etc.)
    console.log("Form submitted:", formData);
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FiSettings className="text-blue-500" />
                Settings
              </h2>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${activeTab === "profile" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  <FiUser className="text-gray-500" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${activeTab === "security" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  <FiLock className="text-gray-500" />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${activeTab === "notifications" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  <FiBell className="text-gray-500" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${activeTab === "billing" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  <FiCreditCard className="text-gray-500" />
                  Billing
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${activeTab === "privacy" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  <FiShield className="text-gray-500" />
                  Privacy
                </button>
                <button
                  onClick={() => setActiveTab("preferences")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${activeTab === "preferences" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  <FiGlobe className="text-gray-500" />
                  Preferences
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                    <FiUser className="text-blue-500" />
                    Profile Information
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="businessName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Business Name
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            id="businessName"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Business Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                    <FiLock className="text-blue-500" />
                    Security Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FiShield className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            Last password change:{" "}
                            <span className="font-medium">2 weeks ago</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Change Password
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Two-Factor Authentication
                      </h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                    <FiBell className="text-blue-500" />
                    Notification Preferences
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Communication Channels
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <label
                                htmlFor="notifications.email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Email Notifications
                              </label>
                              <p className="text-xs text-gray-500">
                                Receive important updates via email
                              </p>
                            </div>
                            <div className="flex items-center h-5">
                              <input
                                id="notifications.email"
                                name="notifications.email"
                                type="checkbox"
                                checked={formData.notifications.email}
                                onChange={handleInputChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <label
                                htmlFor="notifications.sms"
                                className="block text-sm font-medium text-gray-700"
                              >
                                SMS Notifications
                              </label>
                              <p className="text-xs text-gray-500">
                                Get text messages for urgent alerts
                              </p>
                            </div>
                            <div className="flex items-center h-5">
                              <input
                                id="notifications.sms"
                                name="notifications.sms"
                                type="checkbox"
                                checked={formData.notifications.sms}
                                onChange={handleInputChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <label
                                htmlFor="notifications.push"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Push Notifications
                              </label>
                              <p className="text-xs text-gray-500">
                                Get alerts on your mobile device
                              </p>
                            </div>
                            <div className="flex items-center h-5">
                              <input
                                id="notifications.push"
                                name="notifications.push"
                                type="checkbox"
                                checked={formData.notifications.push}
                                onChange={handleInputChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Notification Types
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Order Notifications
                            </label>
                            <select
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                              defaultValue="all"
                            >
                              <option value="all">
                                All order notifications
                              </option>
                              <option value="important">
                                Only important notifications
                              </option>
                              <option value="none">
                                No order notifications
                              </option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Promotional Emails
                            </label>
                            <select
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                              defaultValue="weekly"
                            >
                              <option value="weekly">Weekly digest</option>
                              <option value="monthly">Monthly digest</option>
                              <option value="none">
                                No promotional emails
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Billing Settings */}
              {activeTab === "billing" && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                    <FiCreditCard className="text-blue-500" />
                    Billing Information
                  </h3>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Current Plan
                      </h4>
                      <div className="bg-blue-50 p-4 rounded-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Professional Plan</p>
                            <p className="text-sm text-gray-600">
                              $29.99/month
                            </p>
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Change Plan
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Payment Method
                      </h4>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-md mr-3">
                            <svg
                              className="h-6 w-6 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-600">
                              Expires 04/2024
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                      </div>
                      <button
                        type="button"
                        className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add Payment Method
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Billing History
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Description
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Amount
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Invoice
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                May 15, 2023
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                Professional Plan
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                $29.99
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Paid
                                </span>
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-blue-600">
                                <a href="#" className="hover:underline">
                                  Download
                                </a>
                              </td>
                            </tr>
                            {/* More rows... */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                    <FiShield className="text-blue-500" />
                    Privacy Settings
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Data Sharing
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="analytics"
                                name="analytics"
                                type="checkbox"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="analytics"
                                className="font-medium text-gray-700"
                              >
                                Share analytics data to help improve our
                                services
                              </label>
                              <p className="text-gray-500">
                                This data is anonymized and never includes
                                personal information.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="marketing"
                                name="marketing"
                                type="checkbox"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="marketing"
                                className="font-medium text-gray-700"
                              >
                                Allow personalized marketing communications
                              </label>
                              <p className="text-gray-500">
                                Receive offers and recommendations based on your
                                activity.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Data Retention
                        </h4>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Automatically delete old data after
                          </label>
                          <select
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            defaultValue="365"
                          >
                            <option value="30">30 days</option>
                            <option value="90">90 days</option>
                            <option value="180">180 days</option>
                            <option value="365">1 year</option>
                            <option value="never">
                              Never (not recommended)
                            </option>
                          </select>
                          <p className="mt-1 text-xs text-gray-500">
                            This affects order history, analytics data, and
                            other stored information.
                          </p>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Account Deletion
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Request to delete your account and all associated
                          data. This action cannot be undone.
                        </p>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Delete Account
                        </button>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Privacy Settings
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Preferences Settings */}
              {activeTab === "preferences" && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                    <FiGlobe className="text-blue-500" />
                    Preferences
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="timezone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Timezone
                          </label>
                          <select
                            id="timezone"
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value="America/New_York">
                              Eastern Time (ET)
                            </option>
                            <option value="America/Chicago">
                              Central Time (CT)
                            </option>
                            <option value="America/Denver">
                              Mountain Time (MT)
                            </option>
                            <option value="America/Los_Angeles">
                              Pacific Time (PT)
                            </option>
                            <option value="Europe/London">
                              London (GMT/BST)
                            </option>
                            <option value="Europe/Paris">
                              Paris (CET/CEST)
                            </option>
                            <option value="Asia/Tokyo">Tokyo (JST)</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="currency"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Currency
                          </label>
                          <select
                            id="currency"
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value="USD">US Dollar (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="GBP">British Pound (GBP)</option>
                            <option value="JPY">Japanese Yen (JPY)</option>
                            <option value="CAD">Canadian Dollar (CAD)</option>
                            <option value="AUD">Australian Dollar (AUD)</option>
                          </select>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                          Dashboard Preferences
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <label
                                htmlFor="darkMode"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Dark Mode
                              </label>
                              <p className="text-xs text-gray-500">
                                Switch between light and dark theme
                              </p>
                            </div>
                            <div className="flex items-center h-5">
                              <input
                                id="darkMode"
                                name="darkMode"
                                type="checkbox"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <label
                                htmlFor="compactView"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Compact View
                              </label>
                              <p className="text-xs text-gray-500">
                                Show more content in less space
                              </p>
                            </div>
                            <div className="flex items-center h-5">
                              <input
                                id="compactView"
                                name="compactView"
                                type="checkbox"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

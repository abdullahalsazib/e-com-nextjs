"use client"
import LoginBtn from "@/app/components/buttons/LoginBtn"
import Breadcrumb from "@/app/components/smallComponent/Breadcrumb"
import Link from "next/link"
import { FiMail, FiArrowRight } from "react-icons/fi"
import { motion } from "framer-motion"

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "Forgot password", active: true },
]

const ForgotPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb and Heading */}
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumb} />
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 py-3"
          >
            Forgot Your Password?
          </motion.h1>
          <p className="text-gray-600 mb-6">Enter your email to receive a password reset link</p>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center py-8">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              {/* Decorative Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiMail className="text-white" />
                  Password Recovery
                </h2>
              </div>

              {/* Form */}
              <form className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                      required
                    />
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LoginBtn
                    title="Send Reset Link"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  />
                </motion.div>

                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Remember your password?{' '}
                    <Link
                      href="/login"
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                    >
                      Sign in <FiArrowRight className="ml-1" />
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Don&apos;t have an account?{' '}
                    <Link
                      href="/register"
                      className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
                    >
                      Register <FiArrowRight className="ml-1" />
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Security Tips */}
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Password Security Tips:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Use a combination of letters, numbers, and symbols
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Avoid using personal information like birthdays
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Consider using a password manager
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPage

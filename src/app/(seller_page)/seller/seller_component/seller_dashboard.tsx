import Image from "next/image";
import { ReactNode } from "react";
import { CgProductHunt } from "react-icons/cg";
import { FaJediOrder } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";

// image import
import rocket_image from "@/../public/rocket-white.png";
import bg_ivancik from "../../../../../public/ivancik.jpg";
import { CiLocationArrow1 } from "react-icons/ci";

const Seller_dashboard = () => {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 dark:text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <Stats_Cards
            title="Total Revenue"
            mainNumber="24,780"
            subNumber="12.5"
            icons={<GrMoney />}
          />
          <Stats_Cards
            title="Total Order"
            mainNumber="1,780"
            subNumber="8.2"
            icons={<FaJediOrder />}
          />
          <Stats_Cards
            title="Products"
            mainNumber="83"
            subNumber="3"
            icons={<CgProductHunt />}
          />

          <div className="md:col-span-2 lg:col-span-2 bg-white p-4 lg:p-6 rounded-lg lg:h-[300px] shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start gap-2 lg:gap-7 justify-between">
            <div className=" flex flex-col justify-between h-full">
              <div className=" md:w-[60%]">
                <p className=" text-sm text-gray-400 font-semibold capitalize">
                  Built by developers
                </p>
                <h3 className=" text-xl text-gray-600 font-semibold capitalize py-2">
                  Dashboard
                </h3>

                <h3 className=" font-normal capitalize text-sm text-gray-500">
                  From colors, cards, typography to complex elements, you will
                  find the full documentation.{" "}
                </h3>
              </div>
              <div className="w-full">
                <a
                  href="#"
                  className=" lg:py-0 py- text-sm capitalize underline text-blue-400 flex gap-2 font-bold"
                >
                  read more{" "}
                  <CiLocationArrow1 className=" text-violet-600 text-xl" />
                </a>
              </div>
            </div>
            <div className=" h-full w-full md:w-[50%] rounded-2xl bg-gradient-to-r from-fuchsia-400 to-purple-400">
              <Image
                className=" motion-safe:animate-bounce"
                alt="rocket"
                src={rocket_image}
              />
            </div>
          </div>

          <div
            className={` card_container md:col-span-2 lg:col-span-1 p-4 lg:p-6 rounded-lg lg:h-[300px] shadow-sm border border-gray-200 flex flex-col items-start gap-2 lg:gap-7 justify-between`}
          >
            <div>
              <p className=" text-sm text-gray-100 font-semibold capitalize">
                Built by developers
              </p>
              <h3 className=" text-xl text-gray-200 font-semibold capitalize py-2">
                Dashboard
              </h3>

              <h3 className=" font-normal capitalize text-sm text-gray-300">
                From colors, cards, typography to complex elements, you will
                find the full documentation.{" "}
              </h3>
            </div>
            <div className="w-full">
              <a
                href="#"
                className=" lg:py-0 py-3 text-sm capitalize underline text-blue-100 flex gap-2 font-bold"
              >
                read more{" "}
                <CiLocationArrow1 className=" text-violet-600 text-xl" />
              </a>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="md:col-span-2 lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h2>
              <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                View All
              </button>
            </div>
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1].map((order) => (
                    <tr key={order}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #ORD-{1000 + order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Customer {order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        May {15 + order}, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${(120 + order * 25).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seller_dashboard;

const Stats_Cards = ({
  title,
  mainNumber,
  subNumber,
  icons,
  iconBoxClassName,
}: {
  title: string;
  mainNumber: string;
  subNumber: string;
  icons?: ReactNode;
  iconBoxClassName?: string;
}) => {
  return (
    <div className=" flex items-center justify-between bg-gradient-to-r from-violet-50 to-gray-100 p-6 rounded-lg shadow-sm border border-gray-200">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-2">${mainNumber}</p>
        <p className="text-green-500 text-sm mt-1">
          +{subNumber}% from last month
        </p>
      </div>
      <div className=" text-white p-6 text-3xl rounded-2xl bg-gradient-to-br from-violet-400 via-violet-400 to-indigo-400">
        {icons}
      </div>
    </div>
  );
};

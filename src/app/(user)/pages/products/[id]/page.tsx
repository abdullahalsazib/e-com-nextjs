/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { getProductById } from "@/services/product.service";
import CustomBreadcrumb from "@/components/smallComponent/Breadcrumb";
import { FaSpinner } from "react-icons/fa6";
import { BiHeart } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { getProdcutType } from "@/type/type";
import { BsFacebook, BsMailboxFlag, BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [swtichActive, setSwtichActive] = useState<
    "details" | "reviews" | "discussion"
  >("reviews");
  const [product, setProduct] = useState<getProdcutType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [zoomActive, setZoomActive] = useState(false);

  // Unwrap the Promise with React.use()
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const breadcrumb = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/pages/products" },
    { label: product ? product.name : "Loading...", active: true },
  ];

  return (
    <div className="w-full py-5 px-4 md:px-8 lg:px-[15%] 2xl:px-[20%] min-h-screen bg-gray-50 dark:bg-black">
      <CustomBreadcrumb items={breadcrumb} />

      {loading && (
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="animate-spin text-4xl text-gray-500" />
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {product && (
        <div className="grid gap-3 md:grid-cols-2 mt-8">
          {/* Product Images with Lens Zoom */}
          <div className="flex flex-col gap-4">
            <div
              className="w-full rounded-md overflow-hidden border shadow-sm relative cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZoomActive(true)}
              onMouseLeave={() => setZoomActive(false)}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-auto object-cover"
              />

              {/* Zoom Lens Overlay */}
              {zoomActive && (
                <div
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.image_url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "200%",
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  }}
                />
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className=" flex items-center justify-center aspect-square overflow-hidden rounded-md border shadow-sm"
                >
                  <img
                    src={product?.image_url}
                    alt={`Thumbnail ${index + 1}`}
                    className=" w-full p-2 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
              ))}
              <div className=" flex items-center justify-center aspect-square overflow-hidden rounded-md border shadow-sm cursor-pointer hover:text-2xl duration-500">
                4+ more
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col max-h-fit justify-between rounded-md gap-3">
            <div className="flex flex-col justify-between gap-0 border p-3 rounded-md">
              <div className="">
                <div className="flex justify-between items-center">
                  <Link href={`/vendor/${product.vendor.id}`} className=" text-lg font-semibold capitalize">
                    {product.vendor.shop_name}
                  </Link>

                  <p className="uppercase font-bold text-gray-700">
                    Id: #VHXUeI{product.vendor.id}
                  </p>
                </div>
                <div className="pt- pb-5 flex items-center justify-start gap-3">
                  <p className=" text-sm capitalize font-semibold text-gray-500">
                    {" "}
                    contact us :
                  </p>
                  <ul className=" flex items-center justify-start gap-5">
                    <li>
                      <a href={`mailto:${product.user.email}`} className="">
                        <BsMailboxFlag />
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${product.user.email}`} className="">
                        <BsWhatsapp />
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${product.user.email}`} className="">
                        <BsFacebook />
                      </a>
                    </li>
                  </ul>
                </div>

                <h1 className="text-3xl font-bold mb-4 line-clamp-2">
                  {product.name}
                </h1>

                <p className="text-gray-700 dark:text-gray-300 capitalize text-justify mb-6">
                  {product.description} Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Fuga, fugit unde veritatis rem aliquid
                  inventore similique magnam commodi accusantium, culpa, ipsam
                  autem omnis est perspiciatis ab ducimus nihil placeat qui.
                </p>

                <div className="flex items-center gap-4">
                  <del className="text-xl text-gray-400">
                    ${product.price.toFixed(2)}
                  </del>
                  <span className="text-4xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button className="capitalize" size="lg">
                    Add to Cart
                  </Button>
                  <Button className="capitalize" size="icon">
                    <BiHeart />
                  </Button>
                </div>
              </div>
            </div>
            <div className=" border p-3 rounded-md">
              Lorem, ipsum. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Blanditiis vitae, minus aliquam quod quaerat ipsam quae
              reprehenderit veritatis! Ad, rem praesentium mollitia quae aperiam
              expedita nulla rerum doloribus autem est.
            </div>
          </div>
        </div>
      )}

      <div className=" w-full mt-10 ">
        <div className=" flex items-center justify-center lg:justify-start gap-3">
          <p
            onClick={() => setSwtichActive("reviews")}
            className={` text-sm lg:text-lg capitalize font-semibold px-5 py-2 border cursor-pointer hover:text-gray-800  ${swtichActive === "reviews"
              ? "text-black duration-300 dark:text-white"
              : "text-gray-400 dark:text-gray-500"
              }`}
          >
            Reviews
          </p>
          <p
            onClick={() => setSwtichActive("details")}
            className={` text-sm lg:text-lg capitalize font-semibold px-5 py-2 border cursor-pointer hover:text-gray-800  ${swtichActive === "details"
              ? "text-black duration-300 dark:text-white"
              : "text-gray-400 dark:text-gray-500"
              }`}
          >
            Details
          </p>

          <p
            onClick={() => setSwtichActive("discussion")}
            className={` text-sm lg:text-lg capitalize font-semibold px-5 py-2 border cursor-pointer hover:text-gray-800  ${swtichActive === "discussion"
              ? "text-black duration-300 dark:text-white"
              : "text-gray-400 dark:text-gray-500"
              }`}
          >
            Discussion
          </p>
        </div>
        <div className=" w-full py-3 lg:px-1 duration-300">
          {swtichActive == "details" && (
            <Details description={product?.description} />
          )}
          {swtichActive == "reviews" && <Reviews />}
          {swtichActive == "discussion" && <Discussion />}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

const Details = ({ description }: { description: string | undefined }) => {
  return (
    <>
      <div className=" text-justify">
        <p className=" text-2xl font-semibold pb-2 ">Product Details:</p>
        <p className=" text-lg">{description}</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae est
        iusto porro quaerat consectetur dolor ipsa saepe esse corrupti eaque in
        enim minus tenetur tempora corporis fuga, nam quidem sapiente ipsum
        culpa vero magnam velit. Totam, eligendi voluptates illum repellendus
        reprehenderit hic dicta atque, tempore autem pariatur omnis. Ipsam
        consequatur esse, iusto odio autem omnis odit modi, dolor tempora nulla
        incidunt magnam nemo placeat voluptas veritatis amet rerum excepturi?
        Sed harum voluptates iste itaque, officia ipsum omnis molestiae saepe
        obcaecati fugit optio, vitae laborum deserunt numquam ullam? Mollitia
        fugit voluptas excepturi dignissimos officiis hic iste ipsum molestiae,
        doloremque libero? Libero?{" "}
        <p className=" font-semibold mt-2 dark:text-gray-400">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
          delectus enim ullam. Maiores eos, voluptates ut dicta qui, cumque
          alias adipisci nam quod laudantium illum. Itaque molestias fugiat
          voluptate doloribus eum, alias necessitatibus vitae placeat quis unde
          minus delectus iusto quo, vel hic cumque praesentium, fuga quidem
          magnam neque natus cum asperiores officiis! Numquam similique quasi
          consectetur corporis officia quam quo omnis soluta quis harum
          perspiciatis assumenda neque ab nemo commodi voluptatibus, fugit
          pariatur aperiam! Velit ea consectetur facere nihil suscipit aliquam
          inventore optio ipsa voluptatum vero facilis unde magnam officiis at
          quo vel rerum nemo rem quam, enim ducimus provident architecto dolores
          deserunt. Quasi beatae alias reprehenderit tempora sapiente harum
          laudantium ab sequi perspiciatis! Ad quod ea necessitatibus enim odio,
          accusamus quia cupiditate modi minima non quasi dolor amet mollitia
          repellat vel iusto tempora error rem nostrum in excepturi nulla
          pariatur doloribus doloremque! Repellendus, ex minus quisquam a
          praesentium consequuntur fugit commodi ratione voluptates aperiam
          voluptate mollitia ipsa saepe fuga cum, molestiae officiis velit.
          Expedita pariatur quisquam enim tenetur excepturi, inventore
          temporibus magnam reiciendis ab architecto, consequatur accusamus id
          eveniet odio fugit assumenda laborum velit adipisci eius aliquid quo
          consectetur, commodi mollitia numquam. Ducimus assumenda harum vitae
          dolore consequuntur!
        </p>
      </div>
    </>
  );
};

const Reviews = () => {
  return <>reviewss</>;
};
const Discussion = () => {
  return <>discussion</>;
};

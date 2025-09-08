/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { getProductById } from "@/services/product.service";
import CustomBreadcrumb from "@/components/smallComponent/Breadcrumb";
import { motion } from "framer-motion";
import { BiHeart } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { getProdcutType } from "@/type/type";
import { BsFacebook, BsMailboxFlag, BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [swtichActive, setSwtichActive] = useState<
    "addInfo" | "reviews" | "discussion"
  >("discussion");
  const [product, setProduct] = useState<getProdcutType | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      {error && <p className="text-red-500 text-center">{error}</p>}

      {product && (
        <>
          {" "}
          <div className="grid gap-3 md:grid-cols-2 mt-8">
            {/* Product Images with Lens Zoom */}
            <motion.div
              initial={{
                opacity: 0,
                x: -1000,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
              }}
              className="flex flex-col gap-4"
            >
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
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{
                opacity: 0,
                x: 1000,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
              }}
              className="flex flex-col max-h-fit justify-between rounded-md gap-3"
            >
              <div className="flex flex-col justify-between gap-0 border p-3 rounded-md">
                <div className="">
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/vendor/${product.vendor.id}`}
                      className=" text-lg font-semibold capitalize"
                    >
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
                    {product.description} Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Fuga, fugit unde veritatis rem
                    aliquid inventore similique magnam commodi accusantium,
                    culpa, ipsam autem omnis est perspiciatis ab ducimus nihil
                    placeat qui.
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
                Lorem, ipsum. Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Blanditiis vitae, minus aliquam quod quaerat
                ipsam quae reprehenderit veritatis! Ad, rem praesentium mollitia
                quae aperiam expedita nulla rerum doloribus autem est.
              </div>
            </motion.div>
          </div>
          <div className=" w-full mt-10 ">
            <div className="flex items-center justify-center text-xl gap-5 pt-5 font-normal text-gray-500 border-b-1 border-black/20 dark:border-white/50">
              <p
                className={` cursor-pointer hover:text-black ${
                  swtichActive === "addInfo"
                    ? "border-b-[2px] border-black pb-2 "
                    : ""
                }`}
                onClick={() => setSwtichActive("addInfo")}
              >
                Additional Information
              </p>
              <p
                className={` cursor-pointer hover:text-black  ${
                  swtichActive === "discussion"
                    ? "border-b-[2px] border-black pb-2 "
                    : ""
                }`}
                onClick={() => setSwtichActive("discussion")}
              >
                Description
              </p>
              <p
                className={`cursor-pointer hover:text-black ${
                  swtichActive === "reviews"
                    ? "border-b-[2px] border-black pb-2 "
                    : ""
                }`}
                onClick={() => setSwtichActive("reviews")}
              >
                Reviews(2)
              </p>
            </div>
            <div className=" w-full py-3 duration-300">
              {swtichActive == "discussion" && (
                <Details description={product?.description} />
              )}
              {swtichActive == "reviews" && <Reviews />}
              {swtichActive == "addInfo" && <AddInfo />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;

const Details = ({ description }: { description: string | undefined }) => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className=" text-left font-normal"
      >
        <p className=" text-2xl  font-semibold pb-2 ">Product Details:</p>
        <p className=" text-lg font-normal capitalize">{description}</p>
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
        <p className=" font-normal mt-2 dark:text-gray-400">
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
      </motion.div>
    </>
  );
};

const Reviews = () => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className=" w-full"
      >
        <div className=" w-full flex items-start lg:flex-row flex-col gap-2">
          <div className=" w-full space-y-5">
            <ReviewUser />
          </div>
          <div className=" w-full py-3 px-2  lg:flex-2/3  0">
            <h1 className=" text-lg font-normal">Add you review</h1>
            <div className=" flex items-center gap-2 capitalize text-xs pt-2">
              <p>your rating</p>
              <div className=" flex flex-row items-center justify-center -space-x-0 text-xs">
                <Star className="text-orange-400 w-4 h-4" />
                <Star className="text-orange-400 w-4 h-4" />
                <Star className="text-orange-400 w-4 h-4" />
                <Star className="text-orange-400 w-4 h-4" />
              </div>
            </div>
            <div className=" flex flex-col gap-3 mt-2">
              <div className=" grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="name"
                  className=" py-3 px-5 capitalize border rounded-none"
                />
                <input
                  type="email"
                  placeholder="email"
                  className=" py-3 px-5 capitalize border rounded-none"
                />
              </div>
              <textarea
                placeholder="message"
                role="contentinfo"
                className=" py-3 px-5 capitalize border rounded-none h-40"
              />
            </div>
            <button className=" py-3 px-6 bg-black text-white  mt-3 font-semibold hover:bg-black/40 duration-300 active:scale-110">
              Submit
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
const AddInfo = () => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className=" h-50"
      >
        <h1 className=" text-left text-sm">
          {" "}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,
          mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Similique recusandae hic, iusto nobis quod accusantium non nisi
          quibusdam consectetur deserunt. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Tempore quas doloribus recusandae optio mollitia
          porro deserunt debitis facere illo cumque. Odio dignissimos sit
          voluptatum fugit nam explicabo illo aspernatur iusto.
        </h1>
      </motion.div>
    </>
  );
};

import user1 from "@/../public/review-user/1.jpg";
import user2 from "@/../public/review-user/2.jpg";
import { Star } from "lucide-react";
const ReviewUser = () => {
  return (
    <>
      <div className=" flex items-start justify-start py-2 px-1">
        <div className=" w-20 h-20 bg-black/40">
          <Image src={user1} className=" w-full h-full" alt="user1" />
        </div>
        <div className="  w-[90%] px-4 space-y-2">
          <div className=" flex items-center justify-between w-full">
            <h2>Jhon Deo</h2>
            <p className=" text-sm cursor-pointer text-black/50 hover:text-black duration-300 capitalize">
              replay
            </p>
          </div>
          <div className=" flex items-end">
            <p className=" text-sm text-black/50 text-wrap font-normal line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
              tenetur. Quae porro quidem, quaerat rem inventore laudantium quo
              molestias hic. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Minima, nihil.
            </p>{" "}
            <Link href="/" className=" text-blue-500">
              more
            </Link>
          </div>
          {/* for sub review __ */}
          <div>
            <div className=" flex items-start justify-start py-2 px-1">
              <div className=" w-20 h-20 bg-blue-500/50">
                <Image src={user2} className=" w-full h-full" alt="user2" />
              </div>
              <div className="  w-[90%] px-4 space-y-2">
                <div className=" flex items-center justify-between w-full">
                  <h2>Jhon Deo 2</h2>
                  <p className=" text-sm cursor-pointer text-black/50 hover:text-black duration-300 capitalize">
                    replay
                  </p>
                </div>
                <div className=" flex items-end">
                  <p className=" text-sm text-black/50 text-wrap font-normal line-clamp-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero, tenetur. Quae porro quidem, quaerat rem inventore
                    laudantium quo molestias hic. Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Minima, nihil.
                  </p>{" "}
                  <Link href="/" className=" text-blue-500">
                    more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

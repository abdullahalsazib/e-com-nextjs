"use client";

import Image from "next/image";
import news1 from "@/../public/newes/newes1.png";
import { TbExternalLink } from "react-icons/tb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NewsCard = () => {
  return (
    <Card className="cursor-pointer dark:bg-gradient-to-bl from-neutral-900 to-stone-950 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="p-0">
        <Image className="w-full rounded-t-md" src={news1} alt="news" />
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-evenly gap-4 mt-5">
        <p className="text-center text-sm text-muted-foreground">
          If you’ve recently made a desktop PC or laptop purchase, you might
          want to consider adding peripherals to enhance your home office setup,
          your gaming rig, or your business workspace...
        </p>
        <span className="text-[#A2A6B0] text-xs">01.09.2020</span>
      </CardContent>

      <CardFooter className="flex items-center justify-center">
        <Button
          variant="link"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm lowercase"
        >
          <TbExternalLink className="text-base" />
          <span>see more</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;

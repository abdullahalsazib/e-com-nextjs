import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <Carousel className=" bg-yellow-300 h-full">
      <CarouselContent className=" ">
        <CarouselItem>
          <div className="">
            <Card className="">
              <CardContent className="flex h-full items-center justify-center p-6">
                <span className="text-4xl font-semibold">jack 1</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        {/* <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6 h-[60vh]">
                <span className="text-4xl font-semibold">jack 2</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem> */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

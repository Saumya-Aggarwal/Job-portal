import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
function CategoryCarousel() {
    const categories = [
        "Engineering",
        "Marketing",
        "Finance",
        "Healthcare",
        "Education",
        "Design",
        "Sales",
        "Technology",
        "Management",
      ];
  return (
    <Carousel className="w-full max-w-sm text-center mx-auto">
      <CarouselContent className="-ml-1">
        {categories.map((cat, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <Button variant="outline" className = " rounded-full">{cat}</Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CategoryCarousel;

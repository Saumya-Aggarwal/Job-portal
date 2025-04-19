import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHomeSearchJobByText } from "../../store/jobSlice";
function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setHomeSearchJobByText(query));
    navigate("/browse");
  };
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
            <Button variant="outline" className=" rounded-full" onClick={() => searchJobHandler(cat)}>
              {cat}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CategoryCarousel;

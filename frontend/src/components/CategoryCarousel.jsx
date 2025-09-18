import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Graphic Designer",
  "Full Stack Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Mobile App Developer",
];

function CategoryCarousel() {
  return (
    <div className="w-full text-center my-20">
      
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
        Explore Top{" "}
        <span className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
          Job Categories
        </span>
      </h2>

     
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center" >
              <Button className="px-6 py-3 rounded-full font-medium 
                  border-2 border-transparent hover:shadow-lg hover:scale-105 transition-all duration-300"
              >  {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white hover:scale-110 transition" />
        <CarouselNext className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white hover:scale-110 transition" />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;

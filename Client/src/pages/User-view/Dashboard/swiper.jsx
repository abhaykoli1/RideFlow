import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
import { Navigation, Autoplay, Pagination } from "swiper"; // Import the Navigation module
import { useContext } from "react";
import { MyContext } from "@/components/common/Helper/context";
import { Bike, Trophy, Users } from "lucide-react";

function CarouselSection() {
  const { Slide } = useContext(MyContext);

  const services = [
    {
      image: Slide[0],
      title: "Standard Bike Rental",
      description:
        "Rent our standard bikes for a day, week, or month at competitive prices.",
      icon: <Bike size={"5vw"} />,
    },
    {
      image: Slide[1],
      title: "Premium Bike Rental",
      description:
        "Experience our premium bikes with advanced features for an enhanced ride.",
      icon: <Trophy size={"5vw"} />,
    },
    {
      image: Slide[2],
      title: "Group Rentals",
      description:
        "Special discounts for group rentals. Perfect for events and family outings.",
      icon: <Users size={"5vw"} />,
    },
  ];

  return (
    <section id="home" className="hero-block">
      <h1 className="text-orange-500 font-extrabold text-xl">
        Services We Provide
      </h1>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500 }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        modules={[Navigation, Autoplay, Pagination]} // Add the Navigation module here
        className="overflow-hidden relative z-0"
      >
        {services.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                className="w-full h-auto filter brightness-50"
                src={item.image}
                alt=""
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent text-center p-6 transform transition-transform duration-300 hover:scale-105 cursor-default">
                <div className="flex items-center justify-center">
                  <span className="text-[5vw] text-tomato mr-2">
                    {item.icon}
                  </span>
                  <h2 className="text-[5vw] font-semibold text-white truncate">
                    {item.title}
                  </h2>
                </div>
                <p className="mt-2 text-gray-200 text-[2vw]">
                  {item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Add Navigation Buttons */}
        <div className="swiper-button-next text-white text-2xl font-bold">
          ›
        </div>
        <div className="swiper-button-prev text-white text-2xl font-bold">
          ‹
        </div>
      </Swiper>
    </section>
  );
}

export default CarouselSection;

import { Carousel } from "react-bootstrap";
import { useContext } from "react";
import { MyContext } from "@/components/common/Helper/context";
import { Bike, Trophy, Users } from "lucide-react";

function CarouselSection() {
  const { Slide, sidebar } = useContext(MyContext);

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

  console.log("Slider Images :", Slide);

  return (
    <section id="hom" className="hero-block">
      <h1 className=" flex z-999 text-orange-500 font-extrabold text-xl absolut top-0">
        Services We Provide
      </h1>

      <Carousel
        fade
        autoPlay={true}
        interval={2500}
        controls={true}
        className="overflow-hidden relative z-0"
      >
        {services.map((item, index) => {
          return (
            <Carousel.Item key={index} className="h">
              <img
                className="d-block filter brightness-50 "
                src={item.image}
                alt=""
              />
              <Carousel.Caption>
                <div className="bg-transparent text-center rounded-lg  p-6 transform transition-transform duration-300 hover:scale-105 cursor-default">
                  <div className="flex items-center justify-center">
                    <ul className="text-[5vw] text-tomato mr-2">{item.icon}</ul>
                    <h2 className="text-[5vw] font-semibold text-white truncate">
                      {item.title}
                    </h2>
                  </div>
                  <p className="mt-2 text-gray-200 text-[2vw]">
                    {item.description}
                  </p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </section>
  );
}

export default CarouselSection;

{
  /* {services.map((service, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <div className="flex items-center">
                        <ul className="text-3xl text-tomato mr-2">
                          {service.icon}
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800">
                          {service.title}
                        </h2>
                      </div>
                      <p className="mt-2 text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  ))} */
}

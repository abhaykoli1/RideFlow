import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { EffectCoverflow, Autoplay, FreeMode } from "swiper/modules";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MyContext } from "@/components/common/Helper/context";
import { fetchAllReviews } from "@/store/admin/Reviews-slice";
import { useDispatch, useSelector } from "react-redux";
import { Facebook, Instagram } from "@mui/icons-material";

const initialReview = {
  review: "",
  avtar: "",
  userName: "",
};

function UserReviews() {
  const { reviewData } = useContext(MyContext);
  const { toast } = useToast();
  const swiperRef = useRef(null);
  const [Review, setReview] = useState(initialReview);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [open, setOpen] = useState(false);

  const [expandedIndexes, setExpandedIndexes] = useState({}); // Track expanded state for each review
  const limit = 200; // Character limit before showing "Read More"

  const { ReviewsList } = useSelector((state) => state.adminReviews);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  const toggleReadMore = (index) => {
    setExpandedIndexes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  // console.log("user", userDetails);
  // console.log("Review", Review);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };
  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const onSubmit = async (e) => {
    setOpen(false);
    e.preventDefault();
    try {
      const contactData = await addDoc(collection(db, "Reviews"), {
        ...Review,
        userName: userDetails.userName,
        avtar: userDetails.avtar,
      });
      toast({
        title: "Review Added",
      });
      setReview(initialReview);
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: err.message,
      });
    }
  };

  return (
    <section
      id="revies"
      className={` ${
        ReviewsList.length > 0 ? "flex" : "hidden"
      } bg-cover bg-top bg-black`}
    >
      <div className="bg-[url('http://res.cloudinary.com/dulkmeadg/image/upload/v1730099191/vq0a5xtthaml3m8g1zch.jpg')] bg-cover">
        <div className=" bg-[rgba(0,0,0,0.5)] pt-4  pb-4  px-3">
          <div className="titleHolder">
            <h1 className="font-extrabold text-tomato  mt-8 mb-4 text-center drop-shadow-lg">
              Customer Stories and Feedback
            </h1>
          </div>
          <Swiper
            ref={swiperRef}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 60,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Autoplay, FreeMode]}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 1,
              friction: 0.2,
            }}
            className="xl:py-20 lg:py-6 md:py-5 sm:py-5 py-4"
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
          >
            {ReviewsList && ReviewsList.length > 0
              ? ReviewsList.map((view, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex  flex-col justify-between backdrop-blur-lg border-[0.5p] border-gray-300 text-white bg-transparent
                  xl:w-[40%] lg:w-[50%] md:w-[50%] sm:w-[90%] w-[96%] 
                  shadow-2xl  rounded-lg"
                  >
                    <div className="h-[400px] overflow-hidden">
                      <img src={view.image} className=" w-full rounded-t-lg" />
                    </div>
                    <p className=" p-4 lg:text-lg md:text-lg sm:text-sm text-sm text-pretty flex-1 justify-center overflow-hidden">
                      {/* {view.review} */}

                      {expandedIndexes[index]
                        ? view.review
                        : `${view.review.slice(0, limit)}...`}
                      <a
                        onClick={() => toggleReadMore(index)}
                        className="text-sm text-yellow hover:text-tomato  ml-1 cursor-pointer"
                      >
                        {expandedIndexes[index] ? "Read Less" : "Read More"}
                      </a>
                    </p>
                    <div className="px-4 pb-4 flex relative items-center gap-3">
                      {view.icon === "instagram" ? <Instagram /> : <Facebook />}
                      <p className="text-white font-bold text-lg">
                        {view.userName}
                      </p>
                    </div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
          <div className="flex justify-center gap-10 mb-4 ">
            <div onClick={handlePrev}>
              <ChevronLeftIcon
                color="#fff"
                className="h-8 w-8 cursor-pointer "
              />
            </div>
            <div onClick={handleNext}>
              <ChevronRightIcon
                color="#fff"
                className="h-8 w-8 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sheet */}
      <Sheet
        open={open}
        onOpenChange={() => {
          setOpen(false);
        }}
      >
        <SheetContent
          side={"bottom"}
          className="backdrop-blur-sm  bg-[#222] border-0 rounded-t-xl "
        >
          <div className="container">
            <SheetHeader>
              <SheetTitle className="text-white">
                Add Your Review Here...
              </SheetTitle>
              <SheetDescription className="text-gray-300">
                We value your feedback! Share your experience with us by writing
                a review.
              </SheetDescription>
            </SheetHeader>
            <Form className="mt-16" onSubmit={onSubmit}>
              <div className="grid gap-4 pt-4 pb-0">
                <Textarea
                  id="name"
                  value={Review.review}
                  onChange={(event) =>
                    setReview({
                      ...Review,
                      review: event.target.value,
                    })
                  }
                  required
                  className="row-span-6"
                  placeholder="Your Feedback..."
                />
              </div>

              <SheetFooter>
                <div className="text-white">
                  <Button
                    onClick={onSubmit}
                    disabled={isButtonDisabled}
                    variant="contained"
                    className="mt-2 lg:w-60 md:w-full w-full hover:border-tomato text-black bg-[#fff] hover:!text-black hover:!bg-[#fff] text-lg"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </SheetFooter>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default UserReviews;

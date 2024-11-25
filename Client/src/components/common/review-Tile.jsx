import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const ReviewTile = ({
  review,
  setFormData,
  setOpenAddReviews,
  setCurrentEditedId,
  handleDelete,
}) => {
  return (
    <Card className="w-full  mx-auto">
      <div>
        <div className="relative flex justify-center">
          <img
            src={review?.image}
            alt={review?.userName}
            className="w-full max-w-[300px h-[200px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h3 className="text-xl font-bold mb-2 mt-2">{review?.userName}</h3>
          <div className="flex justify-between items-center mb-2">
            <div className="line-clamp-2">{review?.review}</div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            className="
            !bg-slate-800 text-white"
            onClick={() => {
              setOpenAddReviews(true);
              setCurrentEditedId(review?._id);
              setFormData(review);
            }}
          >
            Edit
          </Button>
          <Button
            className="
            !bg-slate-800 text-white"
            onClick={() => handleDelete(review?._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ReviewTile;

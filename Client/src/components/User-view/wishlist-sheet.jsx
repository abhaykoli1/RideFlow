import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Sheet } from "../ui/sheet";
import { FavoriteBorder } from "@mui/icons-material";
import UserWishlistWrapper from "./wishlist-wrapper";

const HeaderWishlistSheet = () => {
  const [openWishlistSheet, setOpenWishlistSheet] = useState(false);

  const { wishlistItems } = useSelector((state) => state.userWishlist);
console.log(wishlistItems)
  return (
    <div>
      <Sheet
        open={openWishlistSheet}
        onOpenChange={() => setOpenWishlistSheet(false)}
      >
        <div
          onClick={() => setOpenWishlistSheet(true)}
          variant="outline"
          className="relative mr-5 rounded-md p-1 cursor-pointer"
        >
          <FavoriteBorder className=" text-yellow" fontSize="large" />
          <span className="absolute  !bg-white Border text-slate-800 top-[5%] -right-2 font-bold text-sm  rounded-full  px-1.5">
            {wishlistItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </div>
        <UserWishlistWrapper
          setOpenWishlistSheet={setOpenWishlistSheet}
          length={wishlistItems?.items?.length}
          wishlistItems={
            wishlistItems &&
            wishlistItems.items &&
            wishlistItems.items.length > 0
              ? wishlistItems.items
              : []
          }
        />
      </Sheet>
    </div>
  );
};

export default HeaderWishlistSheet;

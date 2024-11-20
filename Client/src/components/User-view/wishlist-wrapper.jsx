import { useNavigate } from "react-router-dom";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserWishlistContent from "./wishlist-items-content";
import { useDispatch } from "react-redux";
import { Separator } from "../ui/separator";

function UserWishlistWrapper({ wishlistItems, setOpenWishlistSheet }) {
  return (
    <SheetContent className="overflow-auto !text-slate-800 bg-gradient-to-t from-[#ffeecc] to-white !max-w-[300px] BorderLef !border-none !bg-white px-3">
      <SheetHeader className=" sticky top-0 flex justify-center  bg-white">
        <SheetTitle className="text-start !text-[16px] my-4">
          Your WishList
        </SheetTitle>
        <Separator />
      </SheetHeader>
      <div className="mt-3 space-y-4">
        {wishlistItems && wishlistItems.length > 0 ? (
          wishlistItems.map((item, index) => (
            <UserWishlistContent
              setOpenWishlistSheet={setOpenWishlistSheet}
              key={index}
              wishlistItems={item}
            />
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </SheetContent>
  );
}

export default UserWishlistWrapper;

import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { Button } from "../ui/button";
// import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.rentPerDay > 0
              ? currentItem?.rentPerDay
              : currentItem?.rentPerHour) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, index) => (
              <UserCartItemsContent key={index} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">
            {"\u20B9"}
            {totalCartAmount}
          </span>
        </div>
      </div>
      <Button
        // onClick={() => {
        // navigate("/shop/checkout");
        // setOpenCartSheet(false);
        // }}
        className="w-full mt-6 bg-black"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
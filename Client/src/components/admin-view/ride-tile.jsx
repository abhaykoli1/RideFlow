import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminRideTile({
  ride,
  setFormData,
  setOpenAddRidesDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w- mx-auto h-[360px]">
      <div>
        <div className="relative flex place-content-center">
          <img
            src={ride?.image}
            alt={ride?.rideName}
            className="w-full max-w-[400px] h-[200px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <div className="flex justify-between">
            <h3 className="text-xl font-bold mb-2 mt-2 capitalize text-yellow">
              {ride?.brand}
            </h3>
            <h3 className="text-xl font-bold mb-2 mt-2">{ride?.rideName}</h3>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                ride?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {"\u20B9 "}
              {ride?.rentPrice}
            </span>
            {ride?.salePrice > 0 ? (
              <span className="text-lg font-bold">
                {"\u20B9 "}
                {ride?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            className="bg-slate-800 text-white"
            onClick={() => {
              setOpenAddRidesDialog(true);
              setCurrentEditedId(ride?._id);
              setFormData(ride);
            }}
          >
            Edit
          </Button>
          <Button
            className="bg-slate-800 text-white"
            onClick={() => handleDelete(ride?._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminRideTile;

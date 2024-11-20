import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminRideTile({
  ride,
  setFormData,
  setOpenAddRidesDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  console.log("ride", ride);
  return (
    <Card className="w-full max-w- mx-auto">
      <div>
        <div className="relative flex place-content-center">
          <img
            src={ride?.image}
            alt={ride?.rideName}
            className="w-full max-w-[400px] h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h3 className="text-xl font-bold mb-2 mt-2">{ride?.rideName}</h3>
          <div className="flex justify-between items-center mb-2">
            {/* <span
              className={`${
                ride?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${ride?.price}
            </span>
            {ride?.salePrice > 0 ? (
              <span className="text-lg font-bold">${ride?.salePrice}</span>
            ) : null} */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenAddRidesDialog(true);
              setCurrentEditedId(ride?._id);
              setFormData(ride);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(ride?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminRideTile;

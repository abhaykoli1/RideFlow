import { Helmet } from "react-helmet";

function UnauthPage() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>You don't have access to view this page</title>
        <link rel="canonical" href="https://rideflowrentals.in/unauth-page" />
        <meta
          name="description"
          content="RideFlow Rentals offers hassle-free motorbike rentals for city rides and adventures. Book your bike online with ease and explore the roads with confidence."
        />
      </Helmet>
      <h1 className="subtitle">You don't have access to view this page</h1>
    </div>
  );
}

export default UnauthPage;

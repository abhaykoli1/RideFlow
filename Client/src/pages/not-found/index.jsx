import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>400 | Page Not Found</title>
        <link rel="canonical" href="https://rideflowrentals.in/*" />
        <meta
          name="description"
          content="RideFlow Rentals offers hassle-free motorbike rentals for city rides and adventures. Book your bike online with ease and explore the roads with confidence."
        />
      </Helmet>
      <h1 className="subtitle">400 | Page Not Found</h1>
    </div>
  );
}

export default NotFound;

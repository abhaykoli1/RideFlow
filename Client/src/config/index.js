import { Bike, Contact, LayoutDashboard } from "lucide-react";

export const UserNavItems = [
  {
    id: "1",
    label: "Home",
    path: "/ride/home",
  },
  {
    id: "2",
    label: "About",
    path: "/ride/about",
  },

  {
    id: "4",
    label: "Rides",
    path: "/ride/listing",
  },
  {
    id: "5",
    label: "Contact-Us",
    path: "/ride/Reach-Us",
  },
];

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Passcode",
    componentType: "input",
    type: "password",
  },
];

export const profileFormControls = [
  // {
  //   name: "userName",
  //   label: "UserName",
  //   placeholder: "UserName",
  //   componentType: "input",
  //   type: "text",
  // },
  // {
  //   name: "email",
  //   label: "Email",
  //   placeholder: "Email",
  //   componentType: "input",
  //   type: "text",
  // },

  {
    name: "dob",
    label: "Date of Birth",
    placeholder: "Enter your Date of Birth",
    componentType: "input",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter Phone number",
    componentType: "input",
    type: "text",
  },
  {
    name: "dl",
    label: "Driving Licence",
    placeholder: "Enter Driving Licence Id",
    componentType: "input",
    type: "text",
  },
];

export const ContactFormElements = [
  {
    name: "name",
    label: "",
    componentType: "input",
    type: "text",
    placeholder: "Enter Your Name",
  },
  {
    name: "email",
    label: "",
    placeholder: "Enter Email Address",
    componentType: "input",
    type: "email",
  },
  {
    name: "phone",
    label: "",
    componentType: "input",
    type: "number",
    placeholder: "Enter Contact Number",
  },
  {
    name: "message",
    label: "",
    componentType: "textarea",
    placeholder: "Enter Contact Message",
  },
];

export const addReviewFormElements = [
  {
    label: "Name",
    name: "userName",
    componentType: "input",
    type: "text",
    placeholder: "Enter Person's Name",
  },
  {
    label: "From",
    name: "icon",
    componentType: "select",
    options: [
      { id: "instagram", label: "Instagram" },
      { id: "facebook", label: "Facebook" },
    ],
  },
  {
    label: "Review",
    name: "review",
    componentType: "textarea",
    placeholder: "Enter a Review",
  },
];

export const addRidesFormElements = [
  {
    label: "Ride Name",
    name: "rideName",
    componentType: "input",
    type: "text",
    placeholder: "Enter Ride Name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter Ride description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "bike", label: "Bike" },
      { id: "scooty", label: "Scooty" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "yamaha", label: "Yamaha" },
      { id: "bajaj", label: "Bajaj" },
      { id: "enfield", label: "Royal Enfield" },
      { id: "hero", label: "Hero" },
      { id: "tvs", label: "TVS" },
      { id: "honda", label: "Honda" },
      { id: "jawa", label: "Jawa" },
    ],
  },

  {
    label: "Rent Price",
    name: "rentPrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter Ride Rent Price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter Ride Sale Price",
  },
  // {
  //   label: "Rent / Hour",
  //   name: "rentPerHour",
  //   componentType: "input",
  //   type: "number",
  //   placeholder: "Enter Ride Rent / Hour",
  // },
  // {
  //   label: "Rent / week",
  //   name: "rentPerWeek",
  //   componentType: "input",
  //   type: "number",
  //   placeholder: "Enter Rent Price / week ",
  // },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  bike: "Bike",
  scooty: "Scooty",
};

export const brandOptionsMap = {
  yamaha: "Yamaha",
  bajaj: "Bajaj",
  royal_enfield: "Royal Enfield",
  hero: "Hero",
  tvs: "TVS",
  honda: "Honda",
  jawa: "Jawa",
};

export const filterOptions = {
  Vehicle: [
    { id: "bike", label: "Bike" },
    { id: "scooty", label: "Scooty" },
  ],
  brand: [
    { id: "yamaha", label: "Yamaha" },
    { id: "bajaj", label: "Bajaj" },
    { id: "royal_enfield", label: "Royal Enfield" },
    { id: "hero", label: "Hero" },
    { id: "tvs", label: "TVS" },
    { id: "honda", label: "Honda" },
    { id: "jawa", label: "Jawa" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Rent: Low to High" },
  { id: "price-hightolow", label: "Rent: High to Low" },
  // { id: "title-atoz", label: "Title: A to Z" },
  // { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
];

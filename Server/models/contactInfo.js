const mongoose = require("mongoose");

const ContactInfoSchema = new mongoose.Schema(
  {
    infoid: {
      type: String, // Use 'type' instead of 'typeof'
      default: "uni", // Default value for the field
    },
    phone: {
      type: Number, // Define the type for the phone field
    },
    email: {
      type: String, // Define the type for the email field
    },
    instagram: {
      type: String, // Define the type for the Instagram field
    },
    whatsapp: {
      type: String, // Define the type for the WhatsApp field
    },
    address: {
      type: String, // Define the type for the address field
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

module.exports = mongoose.model("ContactInfo", ContactInfoSchema);

// const mongoose = require("mongoose");

// const ContactInfoSchema = new mongoose.Schema(
//   {
//     phone: Number, // Define the type for the phone field
//     email: String,
//     instagram: String,
//     whatsapp: String,
//     address: String,
//   },
//   { timestamps: true } // Add timestamps for createdAt and updatedAt
// );

// module.exports = mongoose.model("ContactInfo", ContactInfoSchema);

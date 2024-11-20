const Contact = require("../../models/contact");

// Add a new contact query
const addContactQuery = async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const checkEmail = await Contact.findOne({ email });
    if (!checkEmail) {
      const newContact = new Contact({ name, email, phone, message });
      await newContact.save();

      res.status(200).json({
        message: "Contact added successfully",
        success: true,
        data: newContact,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "You Already submitted Your Query",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// Edit an existing contact query by ID
// const editContactQuery = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, phone, message } = req.body;

//   try {
//     const updatedContact = await Contact.findByIdAndUpdate(
//       id,
//       { name, email, phone, message },
//       { new: true } // Return the updated document
//     );

//     if (!updatedContact) {
//       return res.status(404).json({ message: "Contact not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Contact updated successfully", data: updatedContact });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error editing contact", error: error.message });
//   }
// };

// Delete a contact query by ID
// const deleteContactQuery = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedContact = await Contact.findByIdAndDelete(id);

//     if (!deletedContact) {
//       return res.status(404).json({ message: "Contact not found" });
//     }

//     res.status(200).json({ message: "Contact deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting contact", error: error.message });
//   }
// };

// Fetch all contact queries
// const fetchAllContactQuery = async (req, res) => {
//   try {
//     const contacts = await Contact.find();
//     res
//       .status(200)
//       .json({ message: "Contacts fetched successfully", data: contacts });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching contacts", error: error.message });
//   }
// };

module.exports = {
  addContactQuery,
  //   editContactQuery,
  //   deleteContactQuery,
  //   fetchAllContactQuery,
};

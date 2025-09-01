import { program } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// helpers
const displayContact = (contact) => {
  if (contact) {
    console.log(contact);
  } else {
    console.log("No record with that id!".bgYellow.black);
  }
};

// main function
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const foundContact = await getContactById(id);
      displayContact(foundContact);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      displayContact(addedContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      displayContact(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
      program.help();
  }
}

invokeAction(options);

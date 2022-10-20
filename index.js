const contacts = require("./contacts");
const colors = require("colors");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "Action type")
  .option("-i, --id <type>", "Contact id")
  .option("-n, --name <type>", "Contact name")
  .option("-e, --email <type>", "Contact email")
  .option("-p, --phone <type>", "Contact phone");
program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const getListContacts = await contacts.listContacts();
      console.log("ContactsList :".magenta);
      console.table(getListContacts);
      break;

    case "get":
      if (!id) {
        throw new Error("\x1B[31m No such parameters");
      }
      const getContact = await contacts.getContactById(id);

      if (getContact.length === 0) {
        throw new Error(`\x1B[31m No such contact with id = ${id}`);
      }
      console.log("getContact".magenta, getContact);

      break;

    case "add":
      if (!name || !email || !phone) {
        throw new Error("\x1B[31m No such parameters");
      }
      const addedContact = await contacts.addContact(name, email, phone);
      console.log("addedContact".magenta, addedContact);
      break;

    case "remove":
      if (!id) {
        throw new Error("\x1B[31m No such parameters");
      }
      const deletedContact = await contacts.removeContact(id);

      if (deletedContact.length === 0) {
        throw new Error(`\x1B[31m No such contact with id = ${id}`);
      }

      console.log("deletedContact :".magenta, deletedContact);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

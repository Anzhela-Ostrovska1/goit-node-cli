const contacts = require("./contacts");

const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
console.log(options);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return allContacts;

    case "get":
      const getById = await contacts.getContactById(id);
      return getById;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return newContact;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return removeContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

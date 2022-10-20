const fs = require("fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname + "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    return data.filter((contact) => contact.id === String(contactId));
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const contacts = await listContacts();
    const newContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    return newContact;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(
      (contact) => contact.id !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    const deletedContact = contacts.filter(
      (contact) => contact.id === contactId
    );

    return deletedContact;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

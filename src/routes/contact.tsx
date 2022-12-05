import React from "react";
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";
import { Contact } from "../models/ContactModel";

const ContactComponent = () => {
  // const contact: Contact = {
  //   contactId :"theid",
  //   first: "Your",
  //   last: "Name",
  //   avatar: "https://placekitten.com/g/200/200",
  //   twitter: "your_handle",
  //   notes: "Some notes",
  //   favorite: true,
  // };

  const contact = useLoaderData() as Contact;

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || ""} />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`} target="_blank">
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

function Favorite({ contact }: { contact: Contact }): JSX.Element {
  let favorite: boolean = contact.favorite;

  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "true" : "false"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

export default ContactComponent;

export async function loader({ params }: any) {
  // const contact = await getContact(params.contactId);
  // return { contact };
  return getContact(params.contactId);
}

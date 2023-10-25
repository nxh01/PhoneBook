import { useState } from "react";
import Button from "../../components/buttons/Button";
import ModalInput from "../../components/inputs/ModalInput";
import { UilPlusCircle } from "@iconscout/react-unicons";

function EditModal() {
  const [formState, setFormState] = useState({
    emails: [""],
    phoneNumber: [""],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleEmailChange = (event, index) => {
    const updatedEmails = [...formState.emails];
    updatedEmails[index] = event.target.value;
    setFormState({ ...formState, emails: updatedEmails });
  };

  const handleAddEmailInput = () => {
    setFormState({ ...formState, emails: [...formState.emails, ""] });
  };

  const handlePhoneChange = (event, index) => {
    const updatedPhone = [...formState.phoneNumber];
    updatedPhone[index] = event.target.value;
    setFormState({ ...formState, phoneNumber: updatedPhone });
  };

  const handleAddPhoneInput = () => {
    setFormState({ ...formState, phoneNumber: [...formState.phoneNumber, ""] });
  };

  const generateRndId = () => {
    return Math.floor(Math.random() * 900) + 1;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const id = generateRndId();

    const existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const newContacts = [...existingContacts, { id: id, ...formState }];

    localStorage.setItem("contacts", JSON.stringify(newContacts));

    setFormState({
      emails: [""],
      phoneNumber: [""],
    });
  };

  return (
    <>
      <form className="add__container" onSubmit={handleAdd}>
        <ModalInput
          type={"text"}
          required={true}
          placeholder={"Name"}
          name={"name"}
          value={formState.name || ""}
          onChange={handleChange}
        />
        <ModalInput
          type={"text"}
          required={true}
          placeholder={"Last Name"}
          name={"lastName"}
          value={formState.lastName || ""}
          onChange={handleChange}
        />
        <ModalInput
          type={"text"}
          required={true}
          placeholder={"Address"}
          name={"address"}
          value={formState.address || ""}
          onChange={handleChange}
        />
        <ModalInput
          type={"text"}
          required={true}
          placeholder={"City"}
          name={"city"}
          value={formState.city || ""}
          onChange={handleChange}
        />
        <ModalInput
          type={"text"}
          required={true}
          placeholder={"Country"}
          name={"country"}
          value={formState.country || ""}
          onChange={handleChange}
        />

        <div>
          {formState.emails.map((email, index) => (
            <ModalInput
              key={index}
              type={"email"}
              required={true}
              placeholder={`Email ${index + 1}`}
              name={`email-${index}`}
              value={email}
              onChange={(e) => handleEmailChange(e, index)}
            />
          ))}

          <Button
            className={"add-btn-multiple"}
            action={handleAddEmailInput}
            variant={"blue"}
            Icon={UilPlusCircle}
            style={{ marginTop: "10px" }}
          />
        </div>

        <div>
          {formState.phoneNumber.map((phoneNumber, index) => (
            <ModalInput
              key={index}
              type={"text"}
              required={true}
              placeholder={`Phone Number ${index + 1}`}
              name={`phoneNumber-${index}`}
              value={phoneNumber}
              onChange={(e) => handlePhoneChange(e, index)}
            />
          ))}

          <Button
            className={"add-btn-multiple"}
            action={handleAddPhoneInput}
            variant={"blue"}
            Icon={UilPlusCircle}
            style={{ marginTop: "10px" }}
          />
        </div>

        <div className="modal__button-container">
          <Button
            className={"action-buttons-modal"}
            variant={"orange"}
            text={"Save"}
            type={"submit"}
          />
        </div>
      </form>
    </>
  );
}

export default EditModal;

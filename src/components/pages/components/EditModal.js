import { useState, useEffect } from "react";
import Button from "../../components/buttons/Button";
import ModalInput from "../../components/inputs/ModalInput";
import { UilPlusCircle } from "@iconscout/react-unicons";

function EditModal(props) {
  const { selectedItems } = props;
  const [formState, setFormState] = useState({
    name: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    emails: [""],
    phoneNumber: [""],
  });

  useEffect(() => {
    const initialFormState = selectedItems.reduce((acc, item) => {
      return {
        ...acc,
        id: item.id,
        name: item.name,
        lastName: item.lastName,
        address: item.address,
        city: item.city,
        country: item.country,
        emails: item.emails || [""],
        phoneNumber: item.phoneNumber || [""],
      };
    }, {});

    setFormState(initialFormState);
  }, [selectedItems]);

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
    const newEmails = Array.isArray(formState.emails)
      ? [...formState.emails, ""]
      : [""];
    setFormState({ ...formState, emails: newEmails });
  };

  const handlePhoneChange = (event, index) => {
    const updatedPhone = [...formState.phoneNumber];
    updatedPhone[index] = event.target.value;
    setFormState({ ...formState, phoneNumber: updatedPhone });
  };

  const handleAddPhoneInput = () => {
    setFormState({ ...formState, phoneNumber: [...formState.phoneNumber, ""] });
  };

  const handleEdit = () => {
    const data = JSON.parse(localStorage.getItem("contacts"));

    const index = data.findIndex((item) => item.id === formState.id);

    if (index !== -1) {
      data[index] = formState;
      localStorage.setItem("contacts", JSON.stringify(data));
      console.log("Item with ID", formState.id, "updated.");
    } else {
      console.error("Item not found in the contacts array.");
    }
  };

  return (
    <>
      <form className="edit__container">
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
          {Array.isArray(formState.emails) &&
            formState.emails.map((email, index) => (
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
          {Array.isArray(formState.phoneNumber) &&
            formState.phoneNumber.map((phoneNumber, index) => (
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
            type={"button"}
            action={handleEdit}
          />
        </div>
      </form>
    </>
  );
}

export default EditModal;

import { useState } from "react";
import Button from "../../components/buttons/Button";
import ModalInput from "../../components/inputs/ModalInput";

function EditModal() {
  const [formState, setFormState] = useState({});

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const generateRndId = () => {
    return Math.floor(Math.random() * 900) + 1;
  };

  const handleAdd = () => {
    const id = generateRndId();

    const existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const newContacts = [...existingContacts, { id: id, ...formState }];

    localStorage.setItem("contacts", JSON.stringify(newContacts));

    setFormState({});
  };

  return (
    <>
      <form className="add__container">
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
        <div className="modal__button-container">
          <Button
            className={"action-buttons-modal"}
            variant={"orange"}
            text={"Save"}
            type={"button"}
            action={handleAdd}
          />
        </div>
      </form>
    </>
  );
}

export default EditModal;

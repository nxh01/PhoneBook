import { useState } from "react";
import Button from "../../components/buttons/Button";
import ModalInput from "../../components/inputs/ModalInput";
import MultipleInput from "../../components/inputs/MultipleInput";

function EditModal() {
  const [formState, setFormState] = useState({});

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
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

    setFormState({});
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
        <MultipleInput />
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

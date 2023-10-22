import { useState, useEffect } from "react";
import Button from "../../components/buttons/Button";
import ModalInput from "../../components/inputs/ModalInput";

function EditModal(props) {
  const { selectedItems } = props;
  const [formState, setFormState] = useState({});

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
      };
    }, {});

    setFormState(initialFormState);
  }, [selectedItems]);

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
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

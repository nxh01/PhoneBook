import { useState, useEffect } from "react";
import Button from "../../components/buttons/Button";
import ModalInput from "../../components/inputs/ModalInput";
import { UilPlusCircle } from "@iconscout/react-unicons";

function ViewModal(props) {
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

  return (
    <>
      <form className="edit__container">
        <ModalInput
          type={"text"}
          required={true}
          placeholder={"Name"}
          name={"name"}
          value={formState.name || ""}
          disabled={true}
        />
        <ModalInput
          type={"text"}
          required={true}
          placeholder={"Last Name"}
          name={"lastName"}
          value={formState.lastName || ""}
          disabled={true}
        />
        <ModalInput
          type={"text"}
          required={true}
          placeholder={"Address"}
          name={"address"}
          value={formState.address || ""}
          disabled={true}
        />
        <ModalInput
          type={"text"}
          required={true}
          placeholder={"City"}
          name={"city"}
          value={formState.city || ""}
          disabled={true}
        />
        <ModalInput
          type={"text"}
          required={true}
          placeholder={"Country"}
          name={"country"}
          value={formState.country || ""}
          disabled={true}
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
                disabled={true}
              />
            ))}
        </div>

        <div>
          {Array.isArray(formState.phoneNumber) &&
            formState.phoneNumber.map((phoneNumber, index) => (
              <ModalInput
                key={index}
                type={"text"}
                required={true}
                placeholder={`phoneNumber ${index + 1}`}
                name={`phoneNumber-${index}`}
                value={phoneNumber}
                disabled={true}
              />
            ))}
        </div>
      </form>
    </>
  );
}

export default ViewModal;

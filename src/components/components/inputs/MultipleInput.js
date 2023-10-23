import Button from "../buttons/Button";
import ModalInput from "./ModalInput";
import { UilPlusCircle } from "@iconscout/react-unicons";

function MultipleInput(props) {
  const { type, required, placeholder, name, value, onChange, action } = props;
  return (
    <>
      <div className="multiple__input-container">
        <ModalInput
          type={type}
          required={required}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        <Button
          className={"add-btn-multiple"}
          action={action}
          variant={"blue"}
          Icon={UilPlusCircle}
        />
      </div>
    </>
  );
}

export default MultipleInput;

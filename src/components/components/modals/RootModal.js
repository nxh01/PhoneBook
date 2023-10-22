import { useState } from "react";
import Button from "../buttons/Button";
import { UilMultiply } from "@iconscout/react-unicons";

function RootModal(props) {
  const {
    title,
    subtitle,
    children,
    visible,
    closeBtn,
    saveBtn,
    btnVisible = true,
    // editMode = false,
  } = props;

  // const [modalVisible, setModalVisible] = useState(false);
  // const handleClick = () => {
  //   if (editMode) {
  //     return;
  //   } else {
  //     const rootModal = document
  //       .getElementById("root-modal")
  //       .classList.remove("open-modal");
  //   }
  // };

  return (
    <>
      <div
        id="root-modal"
        className={[`root-modal ${visible ? "open-modal" : ""}`]}
      >
        <div className="root__content">
          <Button
            className={"close-btn-modal"}
            action={closeBtn}
            variant={"blue"}
            Icon={UilMultiply}
          />
          <h1>{title}</h1>
          <h3>{subtitle}</h3>
          <div className="root__children">{children}</div>
          <div className="action__buttons-modal">
            {btnVisible && (
              <>
                <Button
                  className={"action-buttons-modal"}
                  action={saveBtn}
                  variant={"orange"}
                  text={"Save"}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RootModal;

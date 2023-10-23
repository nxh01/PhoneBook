import { useState, useEffect } from "react";
import Table from "../../components/tables/Table";
import RootModal from "../../components/modals/RootModal";
import AddModal from "./AddModal";
import EditModal from "./EditModal";

const columns = [
  { Header: "Id", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Last Name", accessor: "lastName" },
  { Header: "address", accessor: "address" },
  { Header: "city", accessor: "city" },
  { Header: "country", accessor: "country" },
  { Header: "Email", accessor: "email" },
];

function TableContainer() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalVariant, setModalVariant] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("contacts")) || [];
    setData(storedData);
  }, []);

  const handleDelete = (row) => {
    const id = row.original.id;

    const updatedData = data.filter((item) => item.id !== id);

    setData(updatedData);

    localStorage.setItem("contacts", JSON.stringify(updatedData));

    console.log("Item with ID", id, "deleted.");
  };

  const handleModalOpen = (row) => {
    const item = row.original;
    setSelectedItems((prevItems) => [...prevItems, item]);
    setVisibleModal(true);
    setModalVariant(2);
  };

  const handleRefresh = () => {
    const storedData = JSON.parse(localStorage.getItem("contacts")) || [];
    setData(storedData);
  };

  return (
    <>
      <RootModal
        visible={visibleModal}
        closeBtn={() => {
          setVisibleModal(false);
          setSelectedItems([]);
        }}
        title={"Add/Edit Contacts"}
        subtitle={"Everything here is required"}
        btnVisible={false}
      >
        {(modalVariant === 1 && <AddModal />) || (
          <EditModal selectedItems={selectedItems} />
        )}
      </RootModal>
      <Table
        columns={columns}
        data={data}
        editBtn={handleModalOpen}
        deleteBtn={handleDelete}
        refreshBtn={handleRefresh}
        addBtn={() => {
          setVisibleModal(true);
          setModalVariant(1);
        }}
        style={{ minHeight: "400px" }}
        customPageSize={10}
      />
    </>
  );
}

export default TableContainer;

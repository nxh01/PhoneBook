import { useState, useEffect } from "react";
import Table from "../../components/tables/Table";
import RootModal from "../../components/modals/RootModal";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";

const columns = [
  { Header: "Id", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Last Name", accessor: "lastName" },
  { Header: "address", accessor: "address" },
  { Header: "city", accessor: "city" },
  { Header: "country", accessor: "country" },
  {
    Header: "Emails",
    accessor: "emails",
    Cell: ({ cell }) => cell.value.join(", "),
  },
  {
    Header: "Phone Number",
    accessor: "phoneNumber",
    Cell: ({ cell }) => cell.value.join(", "),
  },
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

  const handleView = (row) => {
    const item = row.original;
    setSelectedItems((prevItems) => [...prevItems, item]);
    setVisibleModal(true);
    setModalVariant(3);
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
        title={modalVariant != 3 ? "Add/Edit Contacts" : "View Mode"}
        subtitle={modalVariant != 3 ? "Everything here is required" : ""}
        btnVisible={false}
      >
        {(modalVariant === 1 && <AddModal />) ||
          (modalVariant === 2 && (
            <EditModal selectedItems={selectedItems} />
          )) || <ViewModal selectedItems={selectedItems} />}
      </RootModal>
      <Table
        columns={columns}
        data={data}
        editBtn={handleModalOpen}
        viewBtn={handleView}
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

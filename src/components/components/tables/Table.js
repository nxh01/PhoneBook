import React from "react";
import { useTable, usePagination } from "react-table";
import Button from "../buttons/Button";
import {
  UilAngleRight,
  UilAngleDoubleRight,
  UilAngleLeft,
  UilAngleDoubleLeft,
  UilTrash,
  UilPen,
  UilPlusCircle,
  UilRedo,
} from "@iconscout/react-unicons";
import { useState } from "react";

export default function Table(props) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [itemRow, setItemRow] = useState();

  const { columns, data, deleteBtn, editBtn, addBtn, style } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const handleEdit = (row) => {
    editBtn(row);
  };
  const handleDeletePopup = (row) => {
    setItemRow(row);
    setDeletePopup(true);
    setSelectedRow(row.original);
  };
  const handleDeleteCancel = () => {
    setItemRow();
    setDeletePopup(false);
    setSelectedRow(null);
  };
  const handleDelete = () => {
    deleteBtn(itemRow);
    setDeletePopup(false);
  };

  return (
    <>
      <div className="programs__table" style={style}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    <h1 {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </h1>
                  </th>
                ))}
                <td className="thead-button-cont">
                  <Button
                    className={"thead-add-btn"}
                    action={addBtn}
                    variant={"blueLight"}
                    Icon={UilPlusCircle}
                  />
                </td>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const isRowSelected = row.original === selectedRow;
              return (
                <tr
                  {...row.getRowProps()}
                  className={isRowSelected ? "selected-row" : ""}
                  // onClick={() => setSelectedRow(row.original)}
                >
                  {row.cells.map((cell) => (
                    <td key={cell.column.id}>
                      <h3 {...cell.getCellProps()}>{cell.render("Cell")}</h3>
                    </td>
                  ))}
                  <td className="table-btn-cont">
                    <Button
                      className={"table-row-btn row-edit"}
                      action={() => handleEdit(row)}
                      variant={"blue"}
                      Icon={UilPen}
                    />
                    <Button
                      className={"table-row-btn row-delete"}
                      action={() => handleDeletePopup(row)}
                      variant={"red"}
                      Icon={UilTrash}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination-btn-cont">
            <Button
              className={"table-pagination"}
              action={() => {
                gotoPage(0);
              }}
              variant={"orange"}
              Icon={UilAngleDoubleLeft}
              disabled={pageIndex === 0 ? true : false}
            />
            <Button
              className={"table-pagination"}
              action={() => {
                previousPage();
              }}
              variant={"orange"}
              Icon={UilAngleLeft}
              disabled={pageIndex === 0 ? true : false}
            />
            <Button
              className={"table-pagination"}
              action={() => nextPage()}
              variant={"orange"}
              Icon={UilAngleRight}
              disabled={pageIndex === pageCount - 1 ? true : false}
            />
            <Button
              className={"table-pagination"}
              action={() => gotoPage(pageCount - 1)}
              variant={"orange"}
              Icon={UilAngleDoubleRight}
              disabled={pageIndex === pageCount - 1 ? true : false}
            />
          </div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageCount}
            </strong>{" "}
          </span>
        </div>
        <div
          className={`programs__table-delete-popup ${
            deletePopup ? "active" : ""
          }`}
        >
          <div className="programs__table-delete-content">
            <h1>
              Are you sure you want to proceed with deleting this item?
              <br />
              <span>This process cannot be undone</span>
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <Button
                className={"table-delete-btn row-cancel"}
                action={handleDeleteCancel}
                variant={"blue"}
                text={"Cancel"}
              />
              <Button
                className={"table-delete-btn row-delete"}
                action={handleDelete}
                variant={"red"}
                text={"Yes"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

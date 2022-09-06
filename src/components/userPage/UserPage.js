import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./userpage.css";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
    sortable: true,
  },
  {
    name: "User Role",
    selector: (row) => row.userRole,
  },
  {
    name: "Bank name",
    selector: (row) =>
      row.bankDetails?.bankName ? row.bankDetails.bankName : "-",
  },
  {
    name: "Designation",
    selector: (row) => (row.designation ? row.designation : "-"),
  },
];

function UserPage() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(users);
  useEffect(() => {
    const getData = async () => {
      const result = await axios({
        method: "get",
        url: "http://103.38.50.113:3000/api/v1/users/all-user",
      });
      setUsers(result.data.data);
      // console.log(users);
      // console.log(users, 90);
    };
    getData();
  }, [toggleCleared]);
  const handleRowSelected = React.useCallback((state) => {
    // console.log(state);
    setSelectedRows(state.selectedRows);
    // console.log(selectedRows);
  }, []);
  const deleteUser = async (id) => {
    const result = await axios({
      method: "post",
      url: "http://103.38.50.113:3000/api/v1/users/delete-user",
      data: {
        id: id,
      },
    });
    alert(result.data.meta.message);
  };
  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.title
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        selectedRows.map((item) => {
          const deletedData = deleteUser(item._id);
          return deletedData;
        });
        // setData(differenceBy(data, selectedRows, "title"));
      }
    };

    return (
      <div
        key="delete"
        onClick={handleDelete}
        style={{
          backgroundColor: "red",
          padding: "5px",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
        }}
        icon
      >
        Delete
      </div>
    );
  }, [data, selectedRows, toggleCleared]);
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        fontSize: "43px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        fontSize: "14px",
      },
    },
  };
  return (
    <div className="userpage_container">
      Users
      <div>
        <DataTable
          title="Desserts"
          columns={columns}
          data={users}
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
          pagination
        />
      </div>
    </div>
  );
}

export default UserPage;

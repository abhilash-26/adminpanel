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
  useEffect(() => {
    const getData = async () => {
      const result = await axios({
        method: "get",
        url: "http://103.38.50.113:3000/api/v1/users/all-user",
      });
      setUsers(result.data.data);
      console.log(users);
    };
    getData();
  }, []);
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
        <DataTable columns={columns} data={users} customStyles={customStyles} />
      </div>
    </div>
  );
}

export default UserPage;

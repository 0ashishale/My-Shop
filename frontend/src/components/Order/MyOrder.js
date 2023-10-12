import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../redux/action/orderAction";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Delete from "@mui/icons-material/Delete";
import { useAlert } from "react-alert";

const MyOrder = () => {
  const { orders, error, loading } = useSelector((state) => state.myOrder);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(true);
  const alert = useAlert()


  useEffect(() => {
    dispatch(getMyOrders());

 
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "image",
      headerName: "Product Image",
      width: 200,
      renderCell: ({ value }) => {
        return (
          <>
            {value.map((item) => (
              <img src={item} alt="Product" className="h-14 w-14  ml-2" />
            ))}
          </>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 200,
      renderCell: ({ value }) => {
        return <p>{value} (Items)</p>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        const { value } = params;

        return (
          <div
            className={`${
              value === "Shipped" ? "font-bold text-yellow-600" : ""
            } ${value === "Delivered" ? "font-bold text-green-600" : ""}`}
          >
            {value}
          </div>
        );
      },
    },
    {
      field : 'paymentStatus',
      headerName : "Payment Status",
      width : 150,
      renderCell : (params)=>{
        const {row} = params
        if(row.paymentStatus === 'true'){
         return <b className="text-green-600 font-semibold">Paid</b>
        }else{
         return <b className="font-semibold">Not Paid</b>
        }
       }

    },
    {
      field: "orderAt",
      headerName: "Ordered Date",
      width: 160,
      renderCell: ({ value }) => {
        const onlyDate = value.slice(0, 10);
        return <p>{onlyDate}</p>;
      },
    },
    {
      field: "action",
      headerName: "Action",

      width: 160,
      renderCell: (params) => {
        const { row } = params;

        return (
          <>
            <Link to={`/order/${row.id}`}>
              <VisibilityOutlinedIcon fontSize="small" /> Details
            </Link>
            <Link className={`${row.paymentStatus === 'true' ? '' : 'hidden'} text-red-500 ml-5`}><Delete/></Link>
          </>
        );
      },
    },
  ];
  const rows = [];

  !loading && orders &&
    orders?.forEach((item, i) =>
      rows.push({
        id: item._id,
        quantity: item.orderItems.length,
        status: item.orderStatus,
        image: item.orderItems.map((orderItem) => orderItem.image),
        orderAt: item.updatedAt,
        paymentStatus : item.paymentStatus
      })
    );
  return (
    <div className="p-5">
      <Box sx={{ height: 400 }}>
        <Typography
          variant="h5"
          className="text-center py-2 m-3  font-semibold underline"
        >
          {user?.name}'s Order Details
        </Typography>
        <DataGrid
          className="w-fit mx-auto"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box>
 
    </div>
  );
};

export default MyOrder;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAllOrders, getMyOrders } from "../../redux/action/orderAction";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LaunchIcon from '@mui/icons-material/Launch';import Delete from "@mui/icons-material/Delete";

import { useAlert } from "react-alert";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstants";
import DashboardLayout from "./DashboardLayout";

const Orders = () => {
  const { orders, error, loading } = useSelector((state) => state.allOrders);
  const {isDeleted, error: orderErr}  = useSelector((state)=>state.order)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(true);
  const alert = useAlert()

  const handleDelete = (id) =>{
    const shouldDelete = window.confirm(`Delete ?`)
    if(shouldDelete){
      dispatch(deleteOrder(id))
    }
  }

  useEffect(() => {
    dispatch(getAllOrders());
    if(isDeleted){
      alert.success(`Order Deleted.`)
      dispatch({type : DELETE_ORDER_RESET})
    }
    if(error){
      alert.error(error)
    }
 
  }, [error,alert, isDeleted, dispatch]);

  
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "image",
      headerName: "Product Image",
      width: 400,
      
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
      width: 80,
      renderCell: ({ value }) => {
        return <p>{value} (Items)</p>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 80,
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
      headername : "Payment Status",
      width : 80,
      renderCell : ({value})=>{
       if(value === "true"){
        return <b className="text-green-600 font-semibold">Paid</b>
       }else{
        return <b className="font-semibold">Not Paid</b>
       }
      }

    },
    {
      field: "orderAt",
      headerName: "Ordered Date",
      width: 100,
      renderCell: ({ value }) => {
        const onlyDate = value.slice(0, 10);
        return <p>{onlyDate}</p>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable : false,
      width: 150,
      renderCell: (params) => {
        const { row } = params;

        return (
          <><div className="flex justify-evenly w-full">
            <Link to={`/admin/order/${row.id}`}>
              <LaunchIcon fontSize="small" />
            </Link>
            <Link onClick={()=>handleDelete(row.id)}><Delete fontSize="small" className="text-red-500"/></Link>

          </div>
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
    <DashboardLayout>
    <div className="p-5 overflow-x-auto">
      <Box sx={{ height: 550 }}>
        <Typography
          variant="h5"
          className="text-center py-2 m-3  font-semibold underline"
        >
          All Orders
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
    </DashboardLayout>
  );
};

export default Orders;

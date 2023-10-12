import React, {useEffect, useMemo} from "react";
import {DataGrid} from '@mui/x-data-grid'
import { Box, Typography, Button } from "@mui/material";
import DashboardLayout from "./DashboardLayout";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { deleteProduct, getAdminProducts } from "../../redux/action/productAction";
import { CLEAR_ERRORS, DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants";

const AllProducts = () => {

  const dispatch = useDispatch()
  const alert = useAlert();
  const navigate = useNavigate()

  const {error, products} = useSelector((state)=>state.products)

  const {error : deleteError, isDeleted} = useSelector((state)=>state.product)

const deleteProductHandler = (id)=>{
  const shouldDeleted  = window.confirm(`Are you sure to delete this product?`)
  if(shouldDeleted){
    dispatch(deleteProduct(id))
  } 
  
}

useEffect(()=>{
  dispatch(getAdminProducts())
}, [])


useEffect(()=>{
  

    if(error){
      alert.error(error)
      dispatch({type : CLEAR_ERRORS})
    }
    if(isDeleted){
      alert.success(`Product deleted.`)
      dispatch({type : DELETE_PRODUCT_RESET})
    }
    if(deleteError){
      alert.error(error)
      dispatch({type : CLEAR_ERRORS})
    }
}, [dispatch, error, deleteError, alert, isDeleted])

  const columns =useMemo(()=> [
    { field: 'id', headerName: 'ID', width: 50, },
    {
        field : 'images',
        headerName : "Images",
        editable : false,
        sortable : false,
        width : 100,
        renderCell: ({ value }) => {
          return (
              <div className="overflow-x-auto flex gap-1">
            {value.map((item)=>(
              <img src={item.url} alt="Product" style={{ maxWidth: '100%', width: '100px',  maxHeight: '100px'}} />
            ))}</div>
          )
            },
        

    },
   
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      renderCell : (params)=>{
        const {value, row} = params
        return (
          <Link to={`/product/${row.id}`}>
          <p className="overflow-x-auto">{value}</p>
          </Link>
        )
      }
      
    
    },
    {
      field : 'category',
      headerName : 'Category',
      width : 80,
      
    },
    {
      field : 'rating',
      headerName : "Ratings",
      width : 80
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 80,
      editable : true
      
    },
    {
      field: 'price',
      headerName: 'Price',
      sortable: false,
      width: 80,
      renderCell : ({value})=>{
        return (
            <b>Rs.{value}</b>
        )
      }
      
      
    },

    {
      field : 'featured',
      headerName : 'Featured',
      width :80
    },

    {
      field : 'action',
      headerName : 'Action',
      type :'actions',
      width : 200,
      sortable : false,
      renderCell : (params) => {
        const {row} = params;

            return (
                <>
                  <Link>

                  </Link>
                    <Link to={`/admin/product/${row.id}`}>
                        <EditIcon />
                    </Link>

                    <Button onClick={()=>deleteProductHandler(row.id)}>
                        <DeleteIcon/>

                    </Button>
                </>
            )
        }
      
    }
  ]);
  const rows = [];

  products && products?.forEach(i => {
    rows.push({
      id : i._id,
      name : i.name,
      stock : i.stock,
      price : i.price,
      category : i.category,
      images : i.images,
      featured : i.featured,
      rating : i.ratings
      
    })
  });


  return (
    <DashboardLayout>
      <div>
        <Box sx={{ height: 500, width: "100%" }}>
          <Typography
            variant="h3"
            component="h3"
            sx={{ textAlign: "center", mt: 3, mg: 3 }}
          >
            All Products
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
         
            disableRowSelectionOnClick
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
          />
        </Box>
      </div>
    </DashboardLayout>
  );
};

export default AllProducts;

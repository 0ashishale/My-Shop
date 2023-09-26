import React from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

const Sidebar = () => {
  return (
    <div className="bg-gray-300 h-full min-h-[100vh] flex flex-col gap-5 p-5 text-gray-700">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="h-12" />
      </Link>
      <div className="md:mt-20 ">


      <Link to={"/admin/dashboard"}>
        <p className="flex items-center gap-2 p-4 hover:scale-110 transition-all duration-200">
          <DashboardIcon /> Dashboard
        </p>{" "}
      </Link>
      <Link to={'/admin/orders'}>
       <p className="flex items-center gap-2 p-4 hover:scale-110 transition-all duration-200"><ListAltIcon/> Orders</p>
      </Link>
      <Link to={'/admin/users'}>
       <p className="flex items-center gap-2 p-4 hover:scale-110 transition-all duration-200 "><GroupIcon/> Users</p>
      </Link>
      <Link to={'/admin/reviews'}>
       <p className="flex items-center gap-2 p-4 hover:scale-110 transition-all duration-200"><ReviewsIcon/> Reviews</p>
      </Link>


      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 150, flexGrow: 1, maxWidth: 500, overflowY: "auto" }}
        className="!p-3 "

      >
        <TreeItem nodeId="1" label="Product">
          <Link to="/admin/products">
            {" "}
            <TreeItem nodeId="2" label="All"  className=" !py-2"/>
          </Link>
          <Link to="/admin/create-product" className="">
            {" "}
            <TreeItem nodeId="2" label="Create" icon={<AddIcon />} className="!py-2" />
          </Link>
        </TreeItem>
      </TreeView>

</div>
     
    </div>
  );
};

export default Sidebar;

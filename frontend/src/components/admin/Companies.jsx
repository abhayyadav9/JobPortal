import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

const Companies = () => {
    const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl max-auto my-10">
        <div className="flex justify-between  items-center">
          <Input className="w-fit" placeholder="filter  by name" />
          <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button>
        </div>

        <div>
            <CompaniesTable/>
        </div>
      </div>
    </div>
  );
};

export default Companies;

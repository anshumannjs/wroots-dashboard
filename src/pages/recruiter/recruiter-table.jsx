import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { fetchRecruiters } from "@/services/recruiter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import RecruiterTableActions from "./recruiter-table-actions";

const RecruiterTable = ({ShouldRefresh}) => {
 const columns = [
  {
    id: "name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue("recruiter_name")}</div>
    ),
  },
  {
    id: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <div className="lowercase">{getValue("recruiter_email")}</div>
    ),
  },
  {
    id: "type",
    header: "Type",
    cell: ({ getValue }) => (
      <div>{getValue("isSuperAdmin") ? "Super admin" : "-"}</div>
    ),
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <RecruiterTableActions rowData={row} refresh={setShouldRefresh}/>;
    },
  },
];


  const [filterTerm, setFilterTerm] = useState("second");
  const [page, setPage] = useState(1);
  const [recruiterList, setRecruiterList] = useState([]);
  const [recruiterData, setRecruiterData] = useState([]);
  const [shouldRefresh, setShouldRefresh]=useState(true);
  const [filterData, setFilterData]=useState([]);

  const { mutate, isLoading } = useMutation(fetchRecruiters,{
    onSuccess : ({data}) => {
      setRecruiterData(data?.recruiters);
      setRecruiterList(data?.recruiters);
    }
  });

  useEffect(() => {
    if(shouldRefresh){
      setShouldRefresh(false);
    const id = JSON.parse(localStorage.getItem('userdata')).id;
    const reqbody = {
      pageno : page,
      recruiterId : id
    }
    mutate(reqbody);
    }
  }, [shouldRefresh]);

  useEffect(()=>{
    if (ShouldRefresh){
      setShouldRefresh(true);
    }
  },[ShouldRefresh])

  return (
    <div className="w-full">
      <div className=" pb-4">
        <SearchFilter
          className=""
          onChange={(e) => {
            if(e.length){
              setRecruiterData(recruiterList.filter((rec) => {return (rec.recruiter_name?.toLowerCase().startsWith(e) || rec.recruiter_email?.toLowerCase().startsWith(e))}))
            }else{
              setRecruiterData(recruiterList);
            }
          }}
          placeholder="Filter by name..."
        />
      </div>
      <SimpleTable
        columns={columns}
        data={recruiterData.slice((page*30)-30, page*30)}
        isLoading={isLoading}
      />
      <Pagination page={page} setPage={setPage} totalPages={Math.ceil(recruiterData?.length/30) || 1} />
    </div>
  );
};

export default RecruiterTable;

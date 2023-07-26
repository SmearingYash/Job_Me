import { Box, Stack, Typography } from "@mui/material";
import StatComponent from "../../component/StatComponent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import { Chart } from "react-google-charts";
import { data, options } from "./data/data";
import ChartComponent from "../../component/ChartComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
const { count } = useSelector((state) => state.loadJobs);
const { users } = useSelector((state) => state.allUsers);
const [allusers, setAllusers] = useState(0);
const [totalJOb, setTotalJOb] = useState(0);
const handleAllusers = async () => {
    const { data } = await axios.get("/api/allusers");
    const res = await axios.get(`/api/jobs/show/?pageNumber=undefined&keyword=&cat=&location=`);
    setTotalJOb(res.data.count);
    if (data.success) setAllusers(data);
    };

useEffect(() => {
    handleAllusers();
    }, []);

return (
    <>
    <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
            Dashboard
        </Typography>
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
        <StatComponent
            value={allusers.count}
            icon={
            <SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />
            }
            description="Users and Administrators"
            money=""
        />
        <StatComponent
            value={totalJOb}
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Jobs"
            money=""
        />
        {/* <StatComponent
                        value="6548"
                        icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Jobs categories"
                        money=''
                    /> */}
        </Stack>

        <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ mt: 3 }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
        {allusers.users &&
            allusers.users.map((item) => {
                return (
                <div className="job_request_card" key={item._id}>
                    <p>
                    {item.firstName} {item.lastName}
                    </p>
                    <p>{item?.phone}</p>
                    <p>{item?.email}</p>
                    <div>
                    <p style={{ textDecoration: "underline" }}>Job Requested</p>
                    {item?.jobsHistory.map((job) => {
                        return (
                        <div key={job._id}>
                        <div style={{ display: "flex" }}>
                            <p>{job.title}</p>
                            <button>Pending</button>
                        </div>
                        <p>{job.createdAt}</p>
                        </div>
                        );
                    })}
                    </div>
                </div>
                );
            })}
        </Stack>
        </Box>
    </>
    );
};

export default AdminDashboard;

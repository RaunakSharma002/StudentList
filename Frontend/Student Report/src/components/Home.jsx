import React,{useEffect, useState} from "react";
import { IconButton } from "@mui/material";
import StudentTable from "./StudentTable";
import {AddCircle} from '@mui/icons-material';
import FormPopup from "./FormPopup";


function Home(){
    const [openPopup, setOpenPopup] = useState(false);
    const [students, setStudents] = useState([]);

    // const [data, setData] = useState({id:'', name:'', age: '', email:''});
    const handleOpenPopup = ()=>{
        setOpenPopup(true);
    }

    useEffect(()=>{
        fetch('http://localhost:5000/students')
        .then((res)=>res.json())
        .then((data)=>setStudents(data));
    }, []);

    return (
        <div>
            <StudentTable students={students} handleEditClick={handleOpenPopup}></StudentTable>
            <FormPopup open={openPopup} handleClose={()=>setOpenPopup(false)}></FormPopup>

            <IconButton color="secondary" sx={{position: 'fixed', bottom: 16, right: 16}} onClick={handleOpenPopup}>
                <AddCircle></AddCircle>
            </IconButton>
        </div>
    );
}

export default Home
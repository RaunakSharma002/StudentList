import React,{useEffect, useState} from "react";
import { IconButton } from "@mui/material";
import StudentTable from "./StudentTable";
import {AddCircle} from '@mui/icons-material';
import FormPopup from "./FormPopup";


function Home(){
    const [openPopup, setOpenPopup] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    // const [data, setData] = useState({id:'', name:'', age: '', email:''});
    const handleOpenPopupForSave = ()=>{
        setOpenPopup(true);
        setSelectedStudent(null);
    }
    const handleEdit = (student)=>{
        setOpenPopup(true);
        setSelectedStudent(student);
    }
    const handelClosePopup = ()=>{
        setOpenPopup(false);
        setSelectedStudent(null);
    };
    const handleDelete = (id)=>{
        fetch(`https://student-app-backend-fazl.onrender.com/students/${id}`,{
            method: "DELETE",
        })
        .then(()=>handleFetchStudents())
        .catch((error)=> console.error("Failed to delete Student", error));
    };

    const handleFetchStudents = ()=>{
        fetch('https://student-app-backend-fazl.onrender.com/students')
        .then((res)=>res.json())
        .then((data)=>setStudents(data));
    };

    useEffect(()=>{
       handleFetchStudents();
    }, []);

    return (
        <div>
            <StudentTable students={students} handleEditClick={handleEdit} handleDeleteClick={handleDelete}></StudentTable>
            <FormPopup open={openPopup} student={selectedStudent} handleClose={handelClosePopup} fetchStudents={handleFetchStudents}></FormPopup>

            <IconButton color="secondary" sx={{position: 'fixed', bottom: 16, right: 16}} onClick={handleOpenPopupForSave}>
                <AddCircle></AddCircle>
            </IconButton>
        </div>
    );
}

export default Home
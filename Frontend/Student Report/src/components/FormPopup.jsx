import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import { useEffect, useState } from 'react';

function FormPopup({open, handleClose, student, fetchStudents}){
    const [formData, setFormData] = useState({id: '', name:'', age:'', email:''});
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(()=>{
        if(student){
            setFormData(student);
            setIsUpdating(true);
        }
        else{
            setFormData({id: '', name:'', age:'', email:''});
            setIsUpdating(false);
        }
    },[student])


    const inputHandleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const addOrUpdateStudent = ()=>{
        const url = `https://student-app-backend-fazl.onrender.com/students${isUpdating ? `/${formData.id}` : ''}`;
        const selectedMethod = isUpdating ? 'PUT' : 'POST';
        fetch(url,{
            method: selectedMethod,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
        .then(()=>{
            fetchStudents();
            handleClose();
        })
        .catch((error)=>{console.error("Failed to add Student: ", error)});
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add Student
                </DialogTitle>
                <DialogContent>
                <TextField fullWidth label="Id" margin="dense" variant='outlined' name="id" value={formData.id} onChange={inputHandleChange} disabled={isUpdating}/>
                    <TextField fullWidth label="Name" margin="dense" variant='outlined' name="name" value={formData.name} onChange={inputHandleChange}/>
                    <TextField fullWidth label='Age' margin='dense' variant='outlined' name="age" value={formData.age} onChange={inputHandleChange}/>
                    <TextField fullWidth label='Email' margin='dense' variant='outlined' name="email" value={formData.email} onChange={inputHandleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addOrUpdateStudent}>{isUpdating ? 'Save Changes' : 'Add Student'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormPopup;
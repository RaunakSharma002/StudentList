import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import { useState } from 'react';

function FormPopup({open, handleClose}){
    const [formData, setFormData] = useState({id: '', name:'', age:'', email:''});
    // const [formData, setFormData] = useState({name:'', age:'', email:''});
    const [isUpdating, setIsUpdating] = useState(false);
    const inputHandleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const addOrUpdateStudent = ()=>{
        fetch('http://localhost:5000/students',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
        .then(()=>{ window.location.reload() })
        .catch((error)=>{console.error("Failed to add Student: ", error)});
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add Student
                </DialogTitle>
                <DialogContent>
                <TextField fullWidth label="Id" margin="dense" variant='outlined' name="id" value={formData.id} onChange={inputHandleChange}/>
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
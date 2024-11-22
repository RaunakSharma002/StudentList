import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import {Edit, Delete} from '@mui/icons-material'


function StudentTable({students, handleEditClick, handleDeleteClick}){
    
    return(
        <div>
            <h1 style={{ color: "purple", textAlign: "center" }}>Student List</h1>
            <TableContainer component={Paper} sx={{marginTop: 2}}>
                <Table sx={{minWidth:650}} aria-label="simple table"> 
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, idx)=>{
                            return(
                            <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.age}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>
                                    <IconButton sx={{color: 'purple'}} onClick={()=>handleEditClick(student)}>
                                        <Edit/>
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="secondary" onClick={()=>handleDeleteClick(student.id)}>
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </TableContainer>
        </div>
    )
}

export default StudentTable
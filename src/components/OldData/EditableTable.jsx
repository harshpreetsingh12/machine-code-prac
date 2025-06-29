import React, { useEffect, useState,useRef, Fragment } from 'react'

const ENDPOINT="https://jsonplaceholder.typicode.com/users"
const EditableTable = () => {
    const [ users, setUsers ]= useState([])
    const [ editedUsers, setEditUsers ]= useState([])
    const [ loading, setLoading ]= useState(false)
    const [ editableRow, setEditableRow ]= useState(-1)
    const [ savingRow, setSavingRow ]= useState(-1)

    useEffect(()=>{
        const fetchUsers= async ()=>{
            setLoading(true)
            const response= await fetch(ENDPOINT)
            const users= await response.json();
            setLoading(false)
            setUsers(users)
            setEditUsers(JSON.parse(JSON.stringify(users)))
        }
        fetchUsers()
    },[])

    const handleChange=(param, value)=>{
        // mmic save by giving 100 ms delay
        setEditUsers(prev=>{
            const updated = prev.map((user, i) =>
                i === editableRow ? { ...user, [param]: value } : user
            )
            return updated
        })
        setSavingRow(editableRow)
        setTimeout(()=>{
            setEditableRow(-1)
            setSavingRow(-1)
        },200)
    }
    const handleUndo=(rowIndex)=>{
        // mmic save by giving 100 ms delay
        const oldUser= JSON.parse(JSON.stringify(users[rowIndex]))
        setEditUsers(prev=>{
            const existing=[...prev]
            existing[rowIndex]=oldUser
            return existing
        })
        setEditableRow(-1)
        setSavingRow(-1)
    }

    if(loading) return <div>Loading...</div>
    return (
    <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Undo</th>
            <th>Save</th>
            </tr>
        </thead>
        <tbody>
            {editedUsers.map((el,index)=>{
                return (
                    <tr 
                        key={el.id}
                        onDoubleClick={()=>setEditableRow(index)}
                    >
                        {editableRow===index ?
                            <Fragment>
                                <td>
                                    <input
                                        onBlur={e=>handleChange('name',e.target.value)}
                                        defaultValue={el.name}
                                    />
                                </td>
                                <td>
                                     <input
                                        onBlur={e=>handleChange('email',e.target.value)}
                                        defaultValue={el.email}
                                    />
                                </td>
                                <td>
                                    <input
                                        onBlur={e=>handleChange('phone',e.target.value)}
                                        defaultValue={el.phone}
                                    />
                                </td>

                            </Fragment>
                        :
                            <Fragment>
                                <td>
                                    {el.name}
                                </td>
                                <td>
                                    {el.email}
                                </td>
                                <td>
                                    {el.phone}
                                </td>
                            </Fragment>
                    }
                        <td>
                            <button onClick={()=>handleUndo(index)}>Undo</button>
                        </td>
                        <td>
                           {savingRow===index? 'Saving':'Saved'}
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}


export default EditableTable

import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import styled from 'styled-components'

const columns=['Name','Age','City']
const TableSearch = () => {
    const [searchQuery, setSearchQuery]= useState('')
    const [matchedSearches, setmatchedSearhed]= useState({})
    const [sortStatus, setSortStatus]= useState({
        sort:"asc",
        column:""
    })
    const timeoutref=useRef()

    useEffect(()=>{
        if(timeoutref.current) clearTimeout(timeoutref.current)
        timeoutref.current=setTimeout(()=>{
            if(searchQuery.trim().length===0) return
            searchRows()
        },500)
    },[searchQuery])

    const searchRows=()=>{
        const matchedRowColumns={}
        users.forEach((user,index)=>{
            for(const [key,value] of Object.entries(user)){
                const valueString=value.toString()
                const indexSearched=valueString.toLowerCase().indexOf(searchQuery.toLowerCase())
                if(indexSearched !==-1){
                    matchedRowColumns[user.id]={
                        rowIndex:index,
                        column:key,
                        startUnMatch:valueString.substring(0,indexSearched),
                        matched:valueString.substring(indexSearched,indexSearched+searchQuery.length),
                        endUnMatched:valueString.substring(indexSearched+searchQuery.length, valueString.length)
                    }
                }
            }
        })
        setmatchedSearhed(matchedRowColumns)
    }

    const operatedRows=useMemo(()=>{
        let usersSorted=[...users]
        const {column,sort}=sortStatus
        if(column==='age'){
            if(sort==='asc'){
                usersSorted= usersSorted.sort((userA,userB)=>userA.age-userB.age)
            }
            else{
                usersSorted= usersSorted.sort((userA,userB)=>userB.age-userA.age)
            }
        }
        else if(column==='name' || column==='city'){
            if(sort==='asc'){
                usersSorted= usersSorted.sort((a, b) => a[column].localeCompare(b[column]));
            }
            else{
                usersSorted= usersSorted.sort((a, b) => b[column].localeCompare(a[column]));
            }
        }

        return usersSorted
    },[sortStatus])

    const handleSort=(column)=>{
        setSortStatus(prev=>{
           let direction = prev.sort === 'asc' ? 'desc' : 'asc';
            return {column, sort:direction}
        })
    }

    const handleSearch=(e)=>setSearchQuery(e.target.value)
  return (
    <div>
        <div>
            <label>Search Table</label>
            <input
                onChange={handleSearch}
                name='search'
                placeholder='start search'
            />
        </div>
        <Table>
            <thead>
                <tr>
                {columns.map(column=>{
                    return (
                        <td key={column} onClick={()=>handleSort(column.toLowerCase())}>
                            {column} 
                            {sortStatus.column===column.toLowerCase() && (
                                sortStatus.sort==='asc'?<span>&dArr;</span>:<span>&uArr;</span>
                            )}	
                        </td>
                    )
                })}
                </tr>
            </thead>
            <tbody>
                {operatedRows.map(user=>{
                    return (
                        <tr key={user.id}>
                            {Object.entries(user).map(([key,value],index)=>{
                                if(index===0) return
                                if(matchedSearches?.[user.id] && matchedSearches[user.id].column===key){
                                    const match=matchedSearches[user.id]
                                    return(
                                         <td key={key}>
                                            <span>{match.startUnMatch}</span>
                                            <mark>{match.matched}</mark>
                                            <span>{match.endUnMatched}</span>
                                         </td>
                                    )
                                }
                                return (
                                    <td key={key}>{value}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </div>
  )
}

export default TableSearch

const Table=styled.table`
    thead td{
        font-weight:bold;
    }
    td, tr{
        transition:.2s;
        border:1px solid black;
        width:200px;
        :hover{
            background:#ff000026;
        }

        mark{
            background:#00ff0082;
        }
    }
`
const users = [
  { id: 1, name: "Harsh", age: 24, city: "Dehradun" },
  { id: 2, name: "Ravi", age: 30, city: "Bangalore" },
  { id: 3, name: "Meena", age: 28, city: "Pune" },
  { id: 4, name: "Amit", age: 35, city: "Delhi" },
];

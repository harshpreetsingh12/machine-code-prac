import React, { Fragment, useEffect, useRef, useState } from 'react'

const TagInput = ({
    initialTags,
    onChange
}) => {
    const [tags, setTags]= useState(initialTags)
    const tagInput= useRef()
    
    useEffect(()=>{
        if (typeof onChange === 'function') {
            onChange(tags);
        }
    },[tags])
    function handleRemove(currentTag){
        setTags(prev=> prev.filter(tag=>tag!==currentTag))
    }

    function handleKeyDown(e){
        const key=e.key
        if(key==='Enter'){
            const tag=tagInput.current.value.trim()
            if(tag.length===0) return
            if(!tags.includes(tag)){
                setTags(prev=>([...prev, tag]))
            }
            tagInput.current.value=''
        }
    }
  return (
    <div
        style={{
            margin:'40px 0px',display:'flex',alignItems:'center'
        }}
    >
        {tags.map(tag=>{
            return <Tag tag={tag} key={tag} remove={()=>handleRemove(tag)} setTags={setTags} />
        })}
        <input
            ref={tagInput}
            onKeyDown={handleKeyDown}
            placeholder='add tag'
        />
        
    </div>
  )
}

const Tag=({
    tag, remove,setTags
})=>{
    const [edit,setEditTag]= useState(false)
    const editInput=useRef()
    
    function handleKeyDown(e){
        const key=e.key
        if(key==='Enter'){
            setEditTag(false)
            const tagInput=e.target.value.trim()
            if(tagInput.length===0) return
            setTags(prev=>{
                return prev.map(t=>{
                    if(t===tag) return tagInput
                    return t
                })
            })
        }
    }
    return (
        <div
            onDoubleClick={()=>{
                setEditTag(true);
                setTimeout(()=>{
                    if(editInput?.current) editInput.current.focus()
                },100)
            }}
            style={{
                margin:'10px', display:'flex', gap:'10px', alignItems:'center'
            }}
        >
            {edit ?
                <input
                    onKeyDown={handleKeyDown}
                    placeholder='add tag'
                    defaultValue={tag}
                    ref={editInput}
                />
        
            :
            <Fragment>
                <p>{tag}</p>
                <button onClick={remove}>X</button>
            </Fragment>
            }
        </div>
    )
}
export default TagInput

import React, { useMemo } from 'react'

const TextDiff = ({
    oldText='I love React and JavaScript. It is fast and declarative.',
    newText='I love ReactJS and TypeScript. It is declarative and powerful.'
}) => {
    const oldTextWords= useMemo(()=>{
        return oldText.split(' ')
    },[oldText])

    const newTextWords= useMemo(()=>{
        return newText.split(' ')
    },[newText])

    function getDiffWord(type, word, match) {
        if (!word) return <div>(Removed)</div>;
        if (match) return <div>{word}</div>;
        return <div>{type === "old" ? "❌" : "✅"} {word}</div>;
    }
    const checkOldIndexDiff = (i) => getDiffWord("old", oldTextWords[i], oldTextWords[i] === newTextWords[i]);
    const checkNewIndexDiff = (i) => getDiffWord("new", newTextWords[i], oldTextWords[i] === newTextWords[i]);


    const maxLength = Math.max(oldTextWords.length, newTextWords.length);

  return (
    <div>
        <div className='splitRow'>
            <p>Old</p>
            <p>New</p>
        </div>
      {Array.from({ length: maxLength }).map((_, index)=>{
        return (
            <div key={index} className='splitRow'>
                <div>
                    {checkOldIndexDiff(index)}
                </div>
                <div>
                    {checkNewIndexDiff(index)}
                </div>
            </div>
        )
      })}
    </div>
  )
}

export default TextDiff

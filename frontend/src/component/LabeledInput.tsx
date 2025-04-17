import React from "react"

interface Props {
    id: string;
    label: string;
    placeholder?: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    type?: string
}

const LabeledInput = ({id, label, setValue, placeholder, type}:Props) => {
    return (
        <div className="w-full flex flex-col items-start gap-1 mt-1">
            <label htmlFor={id} className="font-bold">{label}</label>
            <input id={id} type={type || "text"} placeholder={placeholder} onChange={(e)=>setValue(e.target.value)} 
                className="w-full border border-gray-500 shadow-xs shadow-gray-500 outline-0 rounded font-gothic px-4 py-2 "/>
        </div>
    )
}

export default LabeledInput
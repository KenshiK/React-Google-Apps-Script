import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { FormEvent, useEffect } from 'react';


export default function ElementSelector({ title, elementList, updateVariable }:
    { title: String, elementList: Array<String>, updateVariable: Function }) {

    const [element, setElement] = React.useState<String>('');

    function handleChange (event: SelectChangeEvent) 
    {
        console.log(event.target);
        console.log("element from array :" + elementList[event.target.value]);
        setElement(event.target.value);
        updateVariable(event.target.value);
    };

    return (
        <>
            <InputLabel id="demo-simple-select-label">{title}</InputLabel>
            <Select
                labelId="simple-select-label-element"
                id="simple-select-element"
                value={element}
                label={title}
                onChange={handleChange}
            >
                {elementList.map((element, index) => <MenuItem value={index}>{element}</MenuItem>)}
            </Select>
        </>
    )
}

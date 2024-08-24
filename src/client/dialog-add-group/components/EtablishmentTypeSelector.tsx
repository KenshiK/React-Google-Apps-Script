import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';

export default function EtablishmentTypeSelector({ updateType, typeList }: 
  { updateType: Function,
    typeList:Array<String>  }) {

    const [localType, setLocalType] = React.useState('');
    const updateLocalAndGlobal = (event, child) => {
        let value = event.target.value
        setLocalType(value)
        updateType(value)
    }

    // console.log(typeList)
    
    return (
        <>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={localType}
                label="movie"
                onChange={updateLocalAndGlobal}
            >
                {typeList.map((type, index) => <MenuItem value={index}>{type}</MenuItem>)}
            </Select>
            </FormControl>
        </>
    )
  }
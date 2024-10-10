import React , {useEffect} from 'react';
import { Typography } from '@mui/material';
import EtablishmentTypeSelector from './EtablishmentTypeSelector'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import styled from '@emotion/styled'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {SchoolLevel, GeneralStructureType} from '../../utils/model'
import * as helper from '../../utils/helper'

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const school = "Scolaire"
const recreationCenter = "Centre de loisir"
const daycare = "Creche"
const other = "Autre"

const AddGroupDialog = () => {
  const levelList = helper.getEnumList(SchoolLevel);
  const subtypeList = helper.getEnumList(GeneralStructureType); 

  // const [subtypeList, setSubtypeList] = React.useState([]);
  // const [levelList, setLevelList] = React.useState([]);

  const [type, setType] = React.useState('');
  const [name, setName] = React.useState('');
  const [level, setLevel] = React.useState('');
  const [subtype, setSubtype] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [adress, setAdress] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [city, setCity] = React.useState('');
  const [isRep, setIsRep] = React.useState(false);

  const typeList = [school, recreationCenter, daycare, other]

  // useEffect(() => {
  //   switch (type) {
  //     case school:
  //     case recreationCenter:
  //       {
  //         var temp = getLevelList().then((arr) => setLevelList(arr))
  //         console.log("level list promise : ")
  //         console.log(temp)
  //         break;
  //       }
  //     case other:
  //       {
  //         var temp = getOtherSubtypeList().then((arr) => setSubtypeList(arr))
  //         console.log("Subtype list promise : ")
  //         console.log(temp)
  //         break;
  //       }
  //   } 
  // }, [type])
  
  const updateType = (value) => {
    setType(typeList[value])
  }

  const handleLevelSelectChange = (event) => {
    console.log(event.target);
    console.log("level from array :" + levelList[event.target.value]);
    setLevel(event.target.value);
  }; 

  const groupInput = (type) => {
    if(type == null || type == '') return(<></>);

    return (
      <div>
        <StyledTextField 
          id="Name" 
          label="Name" 
          value={name}
          onChange={(event) => setName(event.target.value)}
        >
          Type
        </StyledTextField>

        {type == other ?
          (
            <StyledSelect
              labelId="subtype-select"
              id="subtype-select"
              value={subtype}
              label="subtype"
              onChange={(event) => setSubtype(event.target.value)}
            >
              {subtypeList.map((subtype, index) => <MenuItem value={index}>{subtype}</MenuItem>)}
            </StyledSelect>
          ) : (<></>)
        }


        {type == school || type == recreationCenter ?
          (
            <StyledSelect
              labelId="level-select"
              id="level-select"
              value={level}
              label="level"
              onChange={handleLevelSelectChange}
            >
              {levelList.map((level, index) => <MenuItem value={index}>{level}</MenuItem>)}
            </StyledSelect>
          ) : (<></>)
        }

        <StyledTextField 
          id="Adress" 
          label="Adress" 
          value={adress}
          onChange={(event) => setAdress(event.target.value)}
        >
          Adress
        </StyledTextField>

        <StyledTextField 
          id="PostalCode" 
          label="PostalCode" 
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
        >
          Postal Code
        </StyledTextField>

        <StyledTextField 
          id="City" 
          label="City" 
          value={city}
          onChange={(event) => setCity(event.target.value)}
        >
          City
        </StyledTextField>

        <StyledTextField 
          id="Contact" 
          label="Contact" 
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        >
          Contact
        </StyledTextField>

        <StyledTextField 
          id="ContactNumber" 
          label="ContactNumber" 
          value={contactNumber}
          onChange={(event) => setContactNumber(event.target.value)}
        >
          Contact Number
        </StyledTextField>

        {type == school ? 
        (
          <Button
            id="SchoolIsRep"
            variant={isRep ? "contained" : "outlined"}
            onClick={() => { setIsRep(!isRep); }}
          >
            REP
            <CheckIcon />
          </Button>
        ) : (<></>)
        }
      </div>
    )
  }

  const handleSubmit = async (event) => {
      event.preventDefault();

    console.log("Added " + type)
    try {
      switch (type) {
        case school:
          {
            await serverFunctions.addSchool(name, level, adress, postalCode, city, contact, contactNumber, isRep);
            break;
          }
        case recreationCenter:
          {
            await serverFunctions.addCenter(name, level, adress, postalCode, city, contact, contactNumber);
            break;
          }
        case daycare:
          {
            await serverFunctions.addDayCare(name, adress, postalCode, city, contact, contactNumber);
            break;
          }
        case other:
          {
            await serverFunctions.addOther(subtype, name, adress, postalCode, city, contact, contactNumber);
            break;
          }
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={{ padding: '3px', overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        Ajout d'établissement
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ marginBottom: '30px' }}>
        Ajoutez un nouvel établissement
      </Typography>

      <form
          onSubmit={handleSubmit}
      >
        <EtablishmentTypeSelector updateType={updateType} typeList={typeList}/>
        {groupInput(type)}
        <StyledButton variant="contained" type="submit">
        Submit
        </StyledButton>
      </form>

    </div>
);
};

export default AddGroupDialog;

const StyledTextField = styled(TextField)({
  display: 'block',
  margin: '10px'
});

const StyledButton = styled(Button)({
  margin: '10px',
})

const StyledSelect = styled(Select)({
  margin: '10px',
})

async function getLevelList() {
  try {
    const response = (await serverFunctions.getLevels());
    console.log("LevelList")
    console.log(response)
    return response;
  } catch (error) {
    alert(error);
  }
  return [];
};

async function getOtherSubtypeList() {
  try {
    const response = (await serverFunctions.getOtherSubtypes());
    console.log("Subtypes")
    console.log(response)
    return response;
  } catch (error) {
    alert(error);
  }
  return [];
};
import React , {useEffect} from 'react';
import { Typography } from '@mui/material';
import EtablishmentTypeSelector from './EtablishmentTypeSelector'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import styled from '@emotion/styled'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const school = "École"
const recreationCenter = "Centre de loisir"

const AddGroupDialog = () => {
  const [type, setType] = React.useState('');
  const [name, setName] = React.useState('');
  const [level, setLevel] = React.useState('');
  const [levelList, setLevelList] = React.useState([]);
  const [contact, setContact] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [isRep, setIsRep] = React.useState(false);

  const typeList = [school, recreationCenter]

  useEffect(() => {
    var temp = getLevelList().then((arr) => setLevelList(arr))
    console.log("level list promise : ")
    console.log(temp)
  }, [])
  
  const updateType = (value) => {
    setType(typeList[value])
  }

  const handleLevelSelectChange = (event) => {
    console.log(event.target);
    console.log("level from array :" + levelList[event.target.value]);
    setLevel(event.target.value);
  }; 

  const schoolInput = () => {
    return (
      <div>
        <StyledTextField 
          id="SchoolName" 
          label="SchoolName" 
          value={name}
          onChange={(event) => setName(event.target.value)}
        >
          Type
        </StyledTextField>

        <StyledSelect
          labelId="simple-select-label"
          id="simple-select"
          value={level}
          label="level"
          onChange={handleLevelSelectChange}
        >
          {levelList.map((level, index) => <MenuItem value={index}>{level}</MenuItem>)}
        </StyledSelect>

        <StyledTextField 
          id="SchoolContact" 
          label="SchoolContact" 
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        >
          Contact
        </StyledTextField>

        <StyledTextField 
          id="SchoolContactNumber" 
          label="SchoolContactNumber" 
          value={contactNumber}
          onChange={(event) => setContactNumber(event.target.value)}
        >
          Contact Number
        </StyledTextField>

        <Button 
          id="SchoolIsRep" 
          variant={isRep? "contained" : "outlined"}
          onClick={() => {setIsRep(!isRep);}}
        >
          Ecole Prioritaire
          <CheckIcon/>
        </Button>
      </div>
    )
  }

  const centerInput = () => {
    return (
      <div>
        <StyledTextField 
          id="CenterName" 
          label="CenterName" 
          value={name}
          onChange={(event) => setName(event.target.value)}
        >Type</StyledTextField>

        <StyledSelect
          labelId="simple-select-label"
          id="simple-select"
          value={level}
          label="level"
          onChange={handleLevelSelectChange}
        >
          {levelList.map((level, index) => <MenuItem value={index}>{level}</MenuItem>)}
        </StyledSelect>

        <StyledTextField 
          id="CenterContact" 
          label="CenterContact" 
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        >
          Contact
        </StyledTextField>

        <StyledTextField 
          id="CenterContactNumber" 
          label="CenterContactNumber" 
          value={contactNumber}
          onChange={setContactNumber}
        >
          Contact Number
        </StyledTextField>
      </div>
    )
  } 

  function getInput(type) {
    switch(type)
    {
      case school:
        return schoolInput();
      case recreationCenter:
        return centerInput();
      default:
        return (<></>);
    }
  }

  const handleSubmit = async (event) => {
      event.preventDefault();

      var response;
      console.log("School Added")
      try {
        if(type == school)
          response = await serverFunctions.addSchool(name, level, contact, contactNumber, isRep);
        else if(type == recreationCenter)
          response = await serverFunctions.addCenter(name, level, contact, contactNumber);
      } catch (error) {
        alert(error);
      }
  };

  const submitNewGroup = async (newMovie, newHour) => {
    try {
      const response = await serverFunctions.addMovieHour(newMovie, newHour);
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
        {getInput(type)}
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
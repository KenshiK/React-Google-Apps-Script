import { InputLabel, Select, OutlinedInput, Chip, MenuItem, SelectChangeEvent, styled, Box } from '@mui/material';
import React, { FormEvent, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import { Theme, useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function ClassChip({classList, updateClassListAnswer, display} : 
    {classList:string[], updateClassListAnswer: Function, display: boolean}) {

    // const theme = useTheme();
    const [classes, setClasses] = React.useState<string[]>([]);

    const StyledSpan = styled(Box)({
        display: display? 'block' : 'none',
    });

    // const handleChange = (event: SelectChangeEvent<typeof classes>) => {
    function handleChange(event: SelectChangeEvent<typeof classes>) {

        const value = event.target.value;
        console.log("selected value : " + value)

        // On autofill we get a stringified value.
        const final = typeof value === 'string' ? value.split(',') : value
        setClasses(final);
        updateClassListAnswer( typeof value === 'string' ? value.split(',') : value,);
    };

    return (
        <StyledSpan>
            <InputLabel id="class-chip-Inputlabel-id">Class</InputLabel>
            <Select
                labelId="clas-chip-select-label"
                id="class-multiple-chip"
                multiple
                value={classes}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {classList.map((klass, index) => (
                    <MenuItem
                        key={index}
                        value={klass}
                        // style={getStyles(klass, classes, theme)}
                    >
                        {klass}
                    </MenuItem>
                ))}
            </Select>
        </StyledSpan>
    );
}
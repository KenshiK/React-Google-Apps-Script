import { InputLabel, Select, OutlinedInput, Box, Chip, MenuItem, SelectChangeEvent } from '@mui/material';
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
    // const [classes, setClasses] = React.useState<string[]>([]);

    var classes: string[];

    const handleChange = (event: SelectChangeEvent<typeof classes>) => {
        const {
            target: { value },
        } = event;
        // setClasses(
        //     // On autofill we get a stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        // );

        // On autofill we get a stringified value.
        classes = typeof value === 'string' ? value.split(',') : value;
        updateClassListAnswer(classes);
    };

    return (
        <>
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
                {classList.map((klass) => (
                    <MenuItem
                        key={klass}
                        value={klass}
                        // style={getStyles(klass, classes, theme)}
                    >
                        {klass}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//     return {
//         fontWeight:
//             personName.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }
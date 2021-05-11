import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { languages } from '../Data/Languages';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const LanguageSelector =( props )=> {
    const { language, handleChange } = props;
    const classes = useStyles();
    const [ lang, setLang ] = useState("")

    useEffect(() => {
        language ?
        setLang(language)
        : setLang("")
    }, [ props ])

    const mapLanguages =()=> {
        return (
            languages.map((language, idx) => 
                    <MenuItem key={idx} value={language} style={{textTransform: "capitalize"}} >{language === 'javascript' ? "JavaScript" : language}</MenuItem>
        ))
    }

    return (
        <>
            <FormControl   className={classes.formControl} >
                    <InputLabel id="language-select">Language:</InputLabel>
                    <Select
                    labelId="language-select"
                    id="language"
                    required={ true }
                    value={ lang }
                    onChange={ handleChange("language") }
                    style={{width: "250px"}}
                    >
                    { mapLanguages() }
                    </Select>
                </FormControl>
        </>
    )
}

export { LanguageSelector }

// Base imports
import React from 'react';

// Material UI base

// Material UI components
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// Material UI icons


// Project imports 
import './Settings.css';


// REDUX
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/Settings';

const mapStateToProps = state => {
    return {
        organisation: state.settings.organisation,
        language: state.settings.language,
        languages: state.settings.languages
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeOrganisation: (name) => dispatch(actionCreators.changeOrganisation(name)),
        onChangeLanguage: (language) => dispatch(actionCreators.changeLanguage(language)),
    }
};


// Styling




// Component
const Settings = (props) => {


    const handleOrganisationChange = (event) => {
        props.onChangeOrganisation(event.target.value)
    }

    const handleLanguageChange = (event) => {
        props.onChangeLanguage(event.target.value)
    }

    return (
        <div className="Root">
            <div className="Container">
                <h1>Settings</h1>

                <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue={props.organisation}
                variant="outlined"
                onChange={handleOrganisationChange}
                />

                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    value={props.language}
                    onChange={handleLanguageChange}
                    helperText="Please select your language"
                >
                    {props.languages.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </div>
    );
}


export default connect(mapStateToProps,mapDispatchToProps)(Settings);
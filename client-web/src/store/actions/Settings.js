
// Action for changing organisation name
export const CHANGE_ORGANISATION = 'CHANGE_ORGANISATION';

export const changeOrganisation = ( value ) => {
    return {
        type: CHANGE_ORGANISATION,
        name: value
    };
}




export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const changeLanguage = ( value ) => {
    return {
        type: CHANGE_LANGUAGE,
        language: value
    };
}



export const STORE_SETTINGS = 'STORE_SETTINGS';
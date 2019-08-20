// import axios from 'axios';

export const GET_PROJECTS = '[PROJECT DASHBOARD APP] GET PROJECTS';

export function getProjects() {
    // const request = axios.get('/api/project-dashboard-app/projects');

    const data = [
        {
            'id': 1,
            'name': 'ACME Corp. Backend App'
        },
        {
            'id': 2,
            'name': 'ACME Corp. Frontend App'
        },
        {
            'id': 3,
            'name': 'Creapond'
        },
        {
            'id': 4,
            'name': 'Withinpixels'
        }
    ]

    return (dispatch) =>
        // request.then((response) =>
        //     dispatch({
        //         type: GET_PROJECTS,
        //         payload: response.data
        //     })
        // );
        dispatch({
            type: GET_PROJECTS,
            // payload: response.data
            payload: data
        })
}

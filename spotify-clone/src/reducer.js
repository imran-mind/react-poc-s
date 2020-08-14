export const initialState = {
    user: null,
    discover_weekly: [],
    playlists: [],
    playing: false,
    item: null,
    // token: 'ZwPUUf4ULvzEyP9304yAAxy509bAhNvOFh40a_0ROM1jVSedQjfgNmcvdEhM8BuCpY7EQ2NY4eq_16wipqTJTN8J3NIzlPeeKIza4_X6l7ttBhSGwQhBcG_hFvWVPnhWsviO-vqVBi7tGaK3W6ilpm1Hby9GGIX'
}

const reducer = (state,action) =>{
    console.log('--action--> ',action);

    switch(action.type){

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        
        case 'SET_TOKEN':
            return{
                ...state,
                token: action.token
            }

        case 'SET_PLAYLIST':
            return {
                ...state,
                playlists: action.playlists
            }

        case 'SET_DISCOVER_WEEKLY':
            return{
                ...state,
                discover_weekly: action.discover_weekly
            }

        default:
            return state;
    }
}

export default  reducer;
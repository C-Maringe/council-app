const DISPATCH_USER_DETAILS_DATA = 'DISPATCH_USER_DETAILS_DATA'

const defaultdatastatus = { "data": "data" }

function UserDetails(state = defaultdatastatus, action) {
    switch (action.type) {
        case DISPATCH_USER_DETAILS_DATA:
            return { data: action.payload }
        default:
            return state;
    }
}

export default UserDetails;
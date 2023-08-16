const DISPATCH_LICENCE_DATA = 'DISPATCH_LICENCE_DATA'

const defaultdatastatus = { "data": "data" }

function LicenceData(state = defaultdatastatus, action) {
    switch (action.type) {
        case DISPATCH_LICENCE_DATA:
            return { data: action.payload }
        default:
            return state;
    }
}

export default LicenceData;
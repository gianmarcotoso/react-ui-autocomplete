const dotNotationLookup = (key, object) => {
    return key.split('.').reduce( (o, i) => {
        if (o && o[i]) {
            return o[i]
        }

        return null
    }, object)
}

export default dotNotationLookup

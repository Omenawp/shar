export const required = (value) => {
    return value ? undefined : 'Field is required'
}


/*export const maxLength = (length) => {
    return (value) => {
        if (value && value.length > length)
            return `Max length is ${length} symbols`
        return undefined
    }
}*/
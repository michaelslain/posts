const dateStringify = (date: Date): string => {
    const stringDate = `${
        date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`

    return stringDate
}

export default dateStringify


var users = [{"alias":"trevor", "hash":"$2b$10$bM5C.Gr6eaLcoG0WHtnsou0Hrahh2V8P9EMKBnNsEYPh3X8td91Qm"}]


// const setUsers = () => {
//     users.push({"alias":"trevor", "hash":"$2b$10$bM5C.Gr6eaLcoG0WHtnsou0Hrahh2V8P9EMKBnNsEYPh3X8td91Qm"});
// }

const getUser = async (alias: string): Promise<{}>  => {
    return await users.find(user =>  user["alias"] == alias)
}

const test = () => {
    console.log('tewst')
}

export {
    // setUsers,
    getUser,
    test

}




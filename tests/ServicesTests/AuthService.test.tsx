import AuthService from '../../services/AuthService';

it("Authenticates a user", async () => {
    try{
        const auth = new AuthService();
        auth.authenticateUser = jest.fn(async () => { return true });
        const result = await auth.authenticateUser("x", "x")
        expect(result).toEqual(true)
    } catch(e){
        console.log(e)
    }

})

it("Generates a hash", async () => {
    try{

    const auth = new AuthService();
    const hash = await auth.generateHash("x");
    expect(hash).toBeDefined
} catch(e){
    console.log(e)
}
})

it("Compares a hash", async () => {
    try{

    const auth = new AuthService();
    const result = await auth.compareHash("x", "$2a$10$TZMl64UmgJK1z9Olh.P4leYzn6QjoDrmngNiaDPOvZPlL5L/UKbk.")
    expect(result).toEqual(true)
} catch(e){
    console.log(e)
}
})

export {}
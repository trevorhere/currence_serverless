import UtilService from '../../services/UtilService';

it("Authenticates a user", async () => {
    const utilService = new UtilService();
    utilService.isFollowing = jest.fn(async () => { return true });
    const result = await utilService.isFollowing("x", "x")
    expect(result).toEqual(true)
})

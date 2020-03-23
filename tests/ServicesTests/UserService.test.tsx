import UserService from '../../services/UserService';
import { User } from '../../models';


it("Creates a user", async () => {
    const userService = new UserService();
    let user = new User("alias", "password", "image");

    userService.createUser = jest.fn(async () => { 
        return user
    });

    const u = await  userService.createUser(user)
    expect(u).toEqual(user)
})

it("Follows a user", async () => {
    const userService = new UserService();
    let user = new User("alias", "password", "image");

    userService.follow  = jest.fn(async () => { 
        return user 
    });
    const result = await userService.follow("alias", "x")

    expect(result).toEqual(user)
})

it("Gets followers of a user", async () => {
    const userService = new UserService();
    userService.getFollowers  = jest.fn(async () => {

        return ["y","z"] 
    });

    const result = await userService.getFollowers("x")

    expect(result.length).toEqual(2)
})

it("Gets a user", async () => {
    const userService = new UserService();
    
    let user = new User("alias", "password", "image");

    userService.getUser = jest.fn(async () => { 
        return user 
    });
    const result = await userService.getUser ("alias")
    expect(result).toEqual(user)
})

it("Unfollows a user", async () => {
    const userService = new UserService();
    let user = new User("alias", "password", "image");

    userService.unfollow  = jest.fn(async () => { 
        return user 
    });
    const result = await userService.unfollow("x", "x")
    expect(result).toEqual(user)
})




import StatusService from '../../services/StatusService';
import FeedService from '../../services/FeedService';


it("Creates a status", async () => {
    const statusService = new StatusService();
    statusService.createStatus = jest.fn(() => { return  Promise.resolve({alias: "x", message:"status message"})});
    const status = await statusService.createStatus("x", "status message");
    expect(status).toBeDefined
})

it("builds a story", async () => {
    const statusService = new StatusService();
    statusService.buildStory = jest.fn(() => { return  Promise.resolve([{alias: "x", message:"status message"},{alias: "y", message:"another status message"},{alias: "z", message:"third status message"}])});
    const story = await statusService.buildStory("x", "none");
    expect(story).toBeDefined
    expect(story.length).toEqual(3)
})

it("builds a feed", async () => {
    const feedService = new FeedService();
    feedService.buildFeed = jest.fn(() => { return  Promise.resolve([{alias: "x", message:"status message"},{alias: "y", message:"another status message"},{alias: "z", message:"third status message"}])});
    const feed = await feedService.buildFeed("x", "none");
    expect(feed).toBeDefined
    expect(feed.length).toEqual(3)
})
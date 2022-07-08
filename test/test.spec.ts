import { UserService } from "../src/services/user.service";

describe("User controller", () => {
  it("should return error demo test", () => {
    const userService = new UserService();
    userService.getListUser({ limit: 10, next: 1 }).catch((error) => {
      expect(error).toBeDefined();
    });
  });

  it("should return result demo test", () => {
    const userService = new UserService();
    const result = userService.getListUser({ limit: 10, next: 1 });
    expect(result).toBeDefined();
  });
});

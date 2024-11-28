import faker from "faker";
import AppError from "../../../errors/AppError";
import CreateUserService from "../../../services/UserServices/CreateUserService";
import { disconnect, truncate } from "../../utils/database";

it("should not be able to create a user with duplicate email", async () => {
  try {
    await CreateUserService({
      name: faker.name.findName(),
      email: "teste@sameemail.com",
      password: faker.internet.password()
    });
  } catch (err) {
    if (err instanceof AppError) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(400);
    } else {
      throw err;
    }
  }
});

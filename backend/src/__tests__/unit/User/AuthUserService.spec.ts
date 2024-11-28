import faker from "faker";
import AppError from "../../../errors/AppError";
import AuthUserService from "../../../services/UserServices/AuthUserService";
import CreateUserService from "../../../services/UserServices/CreateUserService";
import { disconnect, truncate } from "../../utils/database";

describe("Auth", () => {
  beforeEach(async () => {
    await truncate();
  });

  afterEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to login with an existing user", async () => {
    const password = faker.internet.password();
    const email = faker.internet.email();

    await CreateUserService({
      name: faker.name.findName(),
      email,
      password
    });

    const response = await AuthUserService({
      email,
      password
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to login with not registered email", async () => {
    try {
      await AuthUserService({
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    } catch (err: unknown) {
      if (err instanceof AppError) {
        expect(err).toBeInstanceOf(AppError);
        expect(err.statusCode).toBe(401);
        expect(err.message).toBe("ERR_INVALID_CREDENTIALS");
      } else {
        throw err;
      }
    }
  });

  it("should not be able to login with not registered email", async () => {
    try {
      await AuthUserService({
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    } catch (err) {
      if (err instanceof Error) {
        expect(err).toBeInstanceOf(AppError);
        expect((err as unknown as AppError).statusCode).toBe(401);
        expect(err.message).toBe("ERR_INVALID_CREDENTIALS");
      } else {
        throw err;
      }
    }
  });
});

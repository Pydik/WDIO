import { faker } from "@faker-js/faker";

export const userData = {
  standardUser: {
    username: "standard_user",
    password: "secret_sauce",
  },
  invalidUser: {
    username: "standard_user",
    password: faker.internet.password({ length: 10 }),
  },
  getRandomValuesUser: {
    username: faker.internet.username(),
    password: faker.internet.password({ length: 10 }),
    postalCode: Number(faker.location.zipCode()),
  },
  lockedOutUser: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
  problemUser: {
    username: "problem_user",
    password: "secret_sauce",
  },
  performanceGlitchUser: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
  errorUser: {
    username: "error_user",
    password: "secret_sauce",
  },
  visualUser: {
    username: "visual_user",
    password: "secret_sauce",
  },
};

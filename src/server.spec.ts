import Person from "./server";

it("Should return a name", () => {
  const person = new Person();
  expect(person.sayMyName()).toBe("Lucas");
});

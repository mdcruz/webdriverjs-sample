const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('TodoApp', () => {
  let driver;
  let newTodoField;
  let todoList;

  beforeEach(async () => {
    driver = new Builder().forBrowser('chrome').build();
    await driver.get('http://todomvc.com/examples/react/');

    newTodoField = By.css('.new-todo');
    todoList = By.css('.todo-list li');

    await driver.wait(until.elementLocated(newTodoField));
    await driver
      .findElement(newTodoField)
      .sendKeys('do lunch and learn about Cypress', Key.ENTER);
    await driver.findElement(newTodoField).sendKeys('have lunch', Key.ENTER);
  });

  it('should add a new todo successfully', async () => {
    await driver.wait(until.elementLocated(todoList));
    await driver
      .findElements(todoList)
      .then((elements) => expect(elements.length).to.equal(2));
  });

  it('should mark a todo item as completed', async () => {
    await driver.findElement(By.css('.toggle:first-child')).click();
    await driver.findElement(By.linkText('Completed')).click();
    await driver
      .findElements(todoList)
      .then((elements) => elements[0].getText())
      .then((text) =>
        expect(text).to.equal('do lunch and learn about Cypress')
      );
  });

  afterEach(async () => driver.quit());
});

const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('TodoApp', () => {
  const driver = new Builder().forBrowser('chrome').build();

  it('should add a new todo successfully', async () => {
    await driver.get('http://todomvc.com/examples/react/');

    const newTodoField = By.css('.new-todo');
    const todoList = By.css('.todo-list li');

    await driver.wait(until.elementLocated(newTodoField));
    await driver
      .findElement(newTodoField)
      .sendKeys('do lunch and learn about Cypress', Key.ENTER);
    await driver.findElement(newTodoField).sendKeys('have lunch', Key.ENTER);

    await driver.wait(until.elementLocated(todoList));
    await driver
      .findElements(todoList)
      .then((elements) => expect(elements.length).to.equal(2));

    await driver.findElement(By.css('.toggle:first-child')).click();
    await driver.findElement(By.linkText('Completed')).click();
    await driver
      .findElements(todoList)
      .then((elements) => elements[0].getText())
      .then((text) =>
        expect(text).to.equal('do lunch and learn about Cypress')
      );
  });

  after(async () => driver.quit());
});

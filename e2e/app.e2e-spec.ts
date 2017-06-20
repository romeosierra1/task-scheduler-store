import { TaskSchedulerPage } from './app.po';

describe('task-scheduler App', () => {
  let page: TaskSchedulerPage;

  beforeEach(() => {
    page = new TaskSchedulerPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

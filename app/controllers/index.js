import UserController from './UserController';
import ServiceController from './ServiceController';
import FilterController from './FilterController';

export default class InitControllers {
  static init(router) {
    new UserController(router);
    new ServiceController(router);
    new FilterController(router);
  }
}

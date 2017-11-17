import UserModel from './User';
import ServiceModel from './Service';
import ServiceTypeModel from './ServiceType';
import ServiceFilterModel from './ServiceFilter';
import FilterModel from './Filter';

export default class InitModels {
  static init() {
    new UserModel();
    new ServiceModel();
    new ServiceTypeModel();
    new FilterModel();
    new ServiceFilterModel();
  }
}

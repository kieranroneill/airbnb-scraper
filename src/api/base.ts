// Models.
import { IModel } from '../models';

export default class BaseAPI {
  protected model: IModel;

  constructor(model: IModel) {
    this.model = model;
  }
}


import { observable } from 'mobx';

class Model {
  @observable private _value: string;
  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
  }
}

export default Model;

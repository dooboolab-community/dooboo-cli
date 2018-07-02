import { observable } from 'mobx';

class ObservableListStore {
  @observable private value: _number;

  public get $value(): _number {
    return this.value;
  }

  public set $value(value: _number) {
    this.value = value;
  }
}

const observableListStore = new ObservableListStore();
export default observableListStore;

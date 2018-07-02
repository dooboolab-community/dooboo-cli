import { observable } from 'mobx';

class ObservableListStore {
  @observable value: number;
}

const observableListStore = new ObservableListStore();
export default observableListStore;

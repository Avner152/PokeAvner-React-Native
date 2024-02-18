import { observable, action, makeObservable } from "mobx";

class MyStore {
  series = [];
  sets = [];
  set = [];
  cardsInSet = [];
  searchedPokemon = [];

  constructor() {
    makeObservable(this, {
      series: observable,
      sets: observable,
      set: observable,
      cardsInSet: observable,
      searchedPokemon: observable,
      updateSeries: action,
      updateSets: action,
      updateSet: action,
      updateCardsInSet: action,
      updateSearchedPokemon: action,
    });
  }
  updateSeries(newVal) {
    this.series = [...newVal];
  }
  updateSets(newVal) {
    this.sets = [...newVal];
  }
  updateSet(newVal) {
    this.set = newVal;
  }
  updateCardsInSet(newVal) {
    this.cardsInSet = newVal;
  }
  updateSearchedPokemon(newVal) {
    this.searchedPokemon = newVal;
  }
}

const myStore = new MyStore();
export default myStore;

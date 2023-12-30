import MenuStore from "./menuStore"
import BasketStore from "./basketStore"

class RootStore {
    constructor() {
        this.menuStore = new MenuStore(this)
        this.basketStore = new BasketStore(this)
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new RootStore()
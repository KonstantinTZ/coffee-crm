import { makeAutoObservable } from 'mobx'

class UiStore {

    constructor() {
        makeAutoObservable(this)
    }

    isNavigationOpen = true


}

export const uiStore = new UiStore()
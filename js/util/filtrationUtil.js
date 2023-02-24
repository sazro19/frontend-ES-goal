import {filtrationType as type} from '../enum/filtrationType.js';

export let filtrationUtil;

class FiltrationUtil {
    #hiddenProducts;
    #favouriteProducts;
    #comparedProducts;

    #filtrationTypeToArrayMap;

    constructor() {
        this.allProducts = Array.from(document.querySelectorAll('.product')).map(product => product.id);

        this.#hiddenProducts = localStorage.getItem(type.HIDDEN) ? localStorage.getItem(type.HIDDEN).split(',') : [];
        this.#favouriteProducts = localStorage.getItem(type.FAVOURITE) ? localStorage.getItem(type.FAVOURITE).split(',') : [];
        this.#comparedProducts = localStorage.getItem(type.COMPARISON) ? localStorage.getItem(type.COMPARISON).split(',') : [];

        this.#filtrationTypeToArrayMap = new Map();
        this.#filtrationTypeToArrayMap.set(type.HIDDEN, this.#hiddenProducts);
        this.#filtrationTypeToArrayMap.set(type.FAVOURITE, this.#favouriteProducts);
        this.#filtrationTypeToArrayMap.set(type.COMPARISON, this.#comparedProducts);
    }

    changeFilterState(productId, removeFromFiltered, filtrationType) {
        let filteredProducts = this.#filtrationTypeToArrayMap.get(filtrationType);
        if (removeFromFiltered) {
            let productIndex = filteredProducts.indexOf(productId);
            filteredProducts.splice(productIndex, 1);
        } else {
            filteredProducts.push(productId);
        }

        localStorage.setItem(filtrationType, filteredProducts);
    }

    get hiddenProducts() {
        return this.#hiddenProducts.map(productId => productId);
    }

    get favouriteProducts() {
        return this.#favouriteProducts.map(productId => productId);
    }

    get comparedProducts() {
        return this.#comparedProducts.map(productId => productId);
    }

    getFilteredProductsByType(filtrationType) {
        switch (filtrationType) {
            case type.ALL:
                return this.allProducts;
            case type.HIDDEN:
                return this.hiddenProducts;
            case type.FAVOURITE:
                return this.favouriteProducts;
            case type.COMPARISON:
                return this.comparedProducts;
        }
    }

    isItHiddenProduct(productId) {
        return this.#hiddenProducts.includes(productId);
    }

    isItFavouriteProducts(productId) {
        return this.#favouriteProducts.includes(productId);
    }

    isItComparedProduct(productId) {
        return this.#comparedProducts.includes(productId);
    }
}

filtrationUtil = new FiltrationUtil();

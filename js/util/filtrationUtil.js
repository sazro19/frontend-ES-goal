import {filtrationType as type} from '../enum/filtrationType.js';

export let filtrationUtil;

class FiltrationUtil {
    #hiddenProducts;
    #favouriteProducts;
    #comparedProducts;

    #filtrationTypeToArrayMap;

    constructor() {
        this.#hiddenProducts = localStorage.getItem(type.HIDDEN) ? localStorage.getItem(type.HIDDEN).split(',') : [];
        this.#favouriteProducts = localStorage.getItem(type.FAVOURITE) ? localStorage.getItem(type.FAVOURITE).split(',') : [];
        this.#comparedProducts = localStorage.getItem(type.COMPARISON) ? localStorage.getItem(type.COMPARISON).split(',') : [];

        this.#filtrationTypeToArrayMap = new Map();
        this.#filtrationTypeToArrayMap.set(type.ALL, Array.from(document.querySelectorAll('.product')).map(product => product.id))
        this.#filtrationTypeToArrayMap.set(type.HIDDEN, this.#hiddenProducts);
        this.#filtrationTypeToArrayMap.set(type.FAVOURITE, this.#favouriteProducts);
        this.#filtrationTypeToArrayMap.set(type.COMPARISON, this.#comparedProducts);
    }

    changeFilterState(productId, widget, filtrationType) {
        let filteredProducts = this.#filtrationTypeToArrayMap.get(filtrationType);
        let isActive = widget.classList.contains('button-widget--active');
        if (isActive) {
            let productIndex = filteredProducts.indexOf(productId);
            filteredProducts.splice(productIndex, 1);
        } else {
            filteredProducts.push(productId);
        }

        localStorage.setItem(filtrationType, filteredProducts);
    }

    getFilteredProductsByType(filtrationType) {
        return this.#filtrationTypeToArrayMap.get(filtrationType).map(productId => productId);
    }

    isItHiddenProduct(productId) {
        return this.#hiddenProducts.includes(productId);
    }

    isItFavouriteProduct(productId) {
        return this.#favouriteProducts.includes(productId);
    }

    isItComparedProduct(productId) {
        return this.#comparedProducts.includes(productId);
    }
}

filtrationUtil = new FiltrationUtil();

import {filtrationType as type} from '../enum/filtrationEnum.js';

export let filtrationUtil;

class FiltrationUtil {
    #hiddenProducts;
    #favouriteProducts;
    #comparedProducts;

    constructor() {
        this.#hiddenProducts = localStorage.getItem('hiddenProducts') || [];
        this.#favouriteProducts = localStorage.getItem('favoriteProducts') || [];
        this.#comparedProducts = localStorage.getItem('comparedProducts') || [];
    }

    changeFilterState(product, removeFromFiltered, filtrationType) {
        let filteredProducts = this.#determineFilteredProducts(filtrationType);
        if (removeFromFiltered) {
            let productIndex = filteredProducts.indexOf(product);
            filteredProducts.splice(productIndex, 1);
        } else {
            filteredProducts.push(product);
        }
    }

    get hiddenProducts() {
        return this.#hiddenProducts.map(product => product);
    }

    get favouriteProducts() {
        return this.#favouriteProducts.map(product => product);
    }

    get comparedProducts() {
        return this.#comparedProducts.map(product => product);
    }

    isItHiddenProduct(product) {
        return this.#hiddenProducts.includes(product);
    }

    isItFavouriteProducts(product) {
        return this.#favouriteProducts.includes(product);
    }

    isItComparedProduct(product) {
        return this.#comparedProducts.includes(product);
    }

    #determineFilteredProducts(filtrationType) {
        switch (filtrationType) {
            case type.HIDDEN:
                return this.#hiddenProducts;
            case type.FAVOURITE:
                return this.#favouriteProducts;
            case type.COMPARISON:
                return this.#comparedProducts;
            default:
                console.warn('Unsupported filtration type:'.concat(' ').concat(filtrationType));
                return undefined;
        }
    }
}

filtrationUtil = new FiltrationUtil();

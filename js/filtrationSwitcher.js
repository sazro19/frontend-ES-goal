import {filtrationUtil} from './util/filtrationUtil.js';
import {filtrationType} from './enum/filtrationEnum.js';

export let filtrationSwitcher;

class FiltrationSwitcher {
    constructor() {
        this.showHiddenCheckBox = document.querySelector('.checkbox-toggler__input');
        this.allProducts = document.querySelectorAll('.product');
    }

    changeShowHiddenCheckBox(event) {
        filtrationUtil.hiddenProducts.forEach(product => {
            if (this.showHiddenCheckBox.checked) {
                product.classList.add('product--show-hidden');
            } else {
                product.classList.remove('product--show-hidden');
                product.classList.add('product--hide');
            }
        });
    }

    switchFiltration(event) {
        let button = event.target;
        if (button.classList.contains('filter-buttons__button') && !button.classList.contains('filter-buttons__button--active')) {
            document.querySelector('.filter-buttons__button--active').classList.remove('filter-buttons__button--active');
            button.classList.add('filter-buttons__button--active');

            switch (button.dataset.filter) {
                case filtrationType.ALL:
                    this.allProducts.forEach(product => {
                        if (!filtrationUtil.isItHiddenProduct(product)) {
                            product.classList.remove('product--hide');
                        } else if (this.showHiddenCheckBox.checked) {
                            product.classList.add('product--show-hidden');
                        }
                    });
                    break;
                case filtrationType.FAVOURITE:
                    filtrationUtil.favouriteProducts.forEach(product => {
                        if (!filtrationUtil.isItHiddenProduct(product)) {
                            product.classList.remove('product--hide');
                        } else if (this.showHiddenCheckBox.checked) {
                            product.classList.add('product--show-hidden');
                        }
                    });
                    this.allProducts.forEach(product => {
                        if (!filtrationUtil.isItFavouriteProducts(product)) {
                            product.classList.add('product--hide');
                            product.classList.remove('product--show-hidden');
                        }
                    });
                    break;
                case filtrationType.COMPARISON:
                    filtrationUtil.comparedProducts.forEach(product => {
                        if (!filtrationUtil.isItHiddenProduct(product)) {
                            product.classList.remove('product--hide');
                        } else if (this.showHiddenCheckBox.checked) {
                            product.classList.add('product--show-hidden');
                        }
                    });
                    this.allProducts.forEach(product => {
                        if (!filtrationUtil.isItComparedProduct(product)) {
                            product.classList.add('product--hide');
                            product.classList.remove('product--show-hidden');
                        }
                    });
                    break;
            }
        }
    }

    isShowHiddenCheckboxChecked() {
        return this.showHiddenCheckBox.checked;
    }

    getActivatedFilterButton() {
        return document.querySelector('.filter-buttons__button--active');
    }
}

filtrationSwitcher = new FiltrationSwitcher();

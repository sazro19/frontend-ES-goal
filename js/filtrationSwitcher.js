import {filtrationUtil} from './util/filtrationUtil.js';
import {filtrationType} from './enum/filtrationType.js';

export let filtrationSwitcher;

class FiltrationSwitcher {
    constructor() {
        this.showHiddenCheckBox = document.querySelector('.checkbox-toggler__input');
        this.allProducts = document.querySelectorAll('.product');
    }

    changeShowHiddenCheckBox(event) {
        let activatedFiltrationType = this.getActivatedFilterButton().dataset.filter;
        let currentFilteredProducts = filtrationUtil.getFilteredProductsByType(activatedFiltrationType);
        filtrationUtil.hiddenProducts.forEach(productId => {
            let product = document.getElementById(productId);
            if (this.showHiddenCheckBox.checked && currentFilteredProducts.includes(productId)) {
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
                        if (!filtrationUtil.isItHiddenProduct(product.id)) {
                            product.classList.remove('product--hide');
                        } else if (this.showHiddenCheckBox.checked) {
                            product.classList.add('product--show-hidden');
                        }
                    });
                    break;
                case filtrationType.FAVOURITE:
                    this.allProducts.forEach(product => {
                        if (!filtrationUtil.isItFavouriteProduct(product.id)) {
                            product.classList.add('product--hide');
                            product.classList.remove('product--show-hidden');
                        } else if (!filtrationUtil.isItHiddenProduct(product.id)) {
                            product.classList.remove('product--hide');
                        } else if (this.showHiddenCheckBox.checked) {
                            product.classList.add('product--show-hidden');
                        }
                    });
                    break;
                case filtrationType.COMPARISON:
                    this.allProducts.forEach(product => {
                        if (!filtrationUtil.isItComparedProduct(product.id)) {
                            product.classList.add('product--hide');
                            product.classList.remove('product--show-hidden');
                        } else if (!filtrationUtil.isItHiddenProduct(product.id)) {
                            product.classList.remove('product--hide');
                        } else if (this.showHiddenCheckBox.checked) {
                            product.classList.add('product--show-hidden');
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

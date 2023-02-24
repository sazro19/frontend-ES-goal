import {filtrationUtil} from './util/filtrationUtil.js';
import {filtrationType} from './enum/filtrationType.js';
import {filtrationSwitcher} from "./filtrationSwitcher.js";
import {DomUtil} from "./util/domUtil.js";

export let productStateController

class ProductStateController {
    constructor() {
    }

    initWidgets() {
        filtrationUtil.hiddenProducts.forEach(productId => {
            let product = document.getElementById(productId);
            let widget = product.querySelector('.product__button-hide');
            widget.classList.add('button-widget--active');
            this.#changeWidgetState(widget, false, true);

            if (filtrationSwitcher.isShowHiddenCheckboxChecked()) {
                product.classList.add('product--show-hidden', 'product--hide');
            } else {
                product.classList.remove('product--show-hidden');
                product.classList.add('product--hide');
            }
        });

        filtrationUtil.favouriteProducts.forEach(productId => {
            let product = document.getElementById(productId);
            let widget = product.querySelector('.product__button-favorite');
            widget.classList.add('button-widget--active');
            this.#changeWidgetState(widget, false, true);
        });

        filtrationUtil.comparedProducts.forEach(productId => {
            let product = document.getElementById(productId);
            let widget = product.querySelector('.product__button-compare');
            widget.classList.add('button-widget--active');
            this.#changeWidgetState(widget, false, false);
        });
    }

    toggleWidget(event) {
        if (event.target.classList.contains('button-widget') || event.target.classList.contains('button-widget__icon')) {
            let widget = DomUtil.getClosest(event.target, 'button-widget');
            let product = DomUtil.getClosest(event.target, 'product');
            if (widget.classList.contains('product__button-hide')) {
                let isActive = widget.classList.contains('button-widget--active');
                filtrationUtil.changeFilterState(product.id, isActive, filtrationType.HIDDEN);
                this.#changeWidgetState(widget, isActive, true);

                if (widget.classList.contains('button-widget--active')) {
                    if (filtrationSwitcher.isShowHiddenCheckboxChecked()) {
                        product.classList.add('product--show-hidden', 'product--hide');
                    } else {
                        product.classList.remove('product--show-hidden');
                        product.classList.add('product--hide');
                    }
                } else {
                    product.classList.remove('product--show-hidden', 'product--hide');
                }
            }

            if (widget.classList.contains('product__button-favorite')) {
                let isActive = widget.classList.contains('button-widget--active');
                filtrationUtil.changeFilterState(product.id, isActive, filtrationType.FAVOURITE);
                this.#changeWidgetState(widget, isActive, true);

                let activatedFilterButton = filtrationSwitcher.getActivatedFilterButton();
                if (activatedFilterButton.dataset.filter === 'favourite') {
                    product.classList.add('product--hide');
                    product.classList.remove('product--show-hidden');
                }
            }

            if (widget.classList.contains('product__button-compare')) {
                let isActive = widget.classList.contains('button-widget--active');
                filtrationUtil.changeFilterState(product.id, isActive, filtrationType.COMPARISON);
                this.#changeWidgetState(widget, isActive, false);

                let activatedFilterButton = filtrationSwitcher.getActivatedFilterButton();
                if (activatedFilterButton.dataset.filter === 'comparison') {
                    product.classList.add('product--hide');
                    product.classList.remove('product--show-hidden');
                }
            }
        }
    }

    #changeWidgetState(widget, isActive, changeIcon) {
        let icon = widget.querySelector('i');
        if (isActive) {
            widget.classList.remove('button-widget--active');
            if (changeIcon) {
                icon.classList.add('far');
                icon.classList.remove('fas');
            }
        } else {
            widget.classList.add('button-widget--active');
            if (changeIcon) {
                icon.classList.add('fas');
                icon.classList.remove('far');
            }
        }
    }
}

productStateController = new ProductStateController();

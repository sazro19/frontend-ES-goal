import {filtrationUtil} from './util/filtrationUtil.js';
import {filtrationType} from './enum/filtrationType.js';
import {filtrationSwitcher} from "./filtrationSwitcher.js";
import {DomUtil} from "./util/domUtil.js";

export let productStateController

class ProductStateController {

    initProductAndWidgetStates() {
        filtrationUtil.getFilteredProductsByType(filtrationType.HIDDEN).forEach(productId => {
            let product = document.getElementById(productId);
            let widget = product.querySelector('.product__button-hide');
            this.#changeWidgetState(widget, true);

            product.classList.add('product--hide');
        });

        filtrationUtil.getFilteredProductsByType(filtrationType.FAVOURITE).forEach(productId => {
            let product = document.getElementById(productId);
            let widget = product.querySelector('.product__button-favorite');
            this.#changeWidgetState(widget, true);
        });

        filtrationUtil.getFilteredProductsByType(filtrationType.COMPARISON).forEach(productId => {
            let product = document.getElementById(productId);
            let widget = product.querySelector('.product__button-compare');
            this.#changeWidgetState(widget,false);
        });
    }

    toggleWidget(event) {
        if (event.target.classList.contains('button-widget') || event.target.classList.contains('button-widget__icon')) {
            let widget = DomUtil.getClosest(event.target, 'button-widget');
            let product = DomUtil.getClosest(event.target, 'product');

            if (widget.classList.contains('product__button-hide')) {
                filtrationUtil.changeFilterState(product.id, widget, filtrationType.HIDDEN);
                this.#changeWidgetState(widget, true);

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
                filtrationUtil.changeFilterState(product.id, widget, filtrationType.FAVOURITE);
                this.#changeWidgetState(widget, true);

                let activatedFilterButton = filtrationSwitcher.getActivatedFilterButton();
                if (activatedFilterButton.dataset.filter === 'favourite') {
                    product.classList.add('product--hide');
                    product.classList.remove('product--show-hidden');
                }
            }

            if (widget.classList.contains('product__button-compare')) {
                filtrationUtil.changeFilterState(product.id, widget, filtrationType.COMPARISON);
                this.#changeWidgetState(widget, false);

                let activatedFilterButton = filtrationSwitcher.getActivatedFilterButton();
                if (activatedFilterButton.dataset.filter === 'comparison') {
                    product.classList.add('product--hide');
                    product.classList.remove('product--show-hidden');
                }
            }
        }
    }

    #changeWidgetState(widget, changeIcon) {
        let icon = widget.querySelector('i');
        let isActive = widget.classList.contains('button-widget--active');
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

const hiddenProducts = [];
const favoriteProducts = [];
const comparedProducts = [];

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.button-widget').forEach(button => {
        button.addEventListener('click', toggleWidget);
    });
    document.querySelector('.checkbox-toggler__input').addEventListener('change', changeShowHiddenCheckBox);
});

function toggleWidget(event) {
    let widget = getClosest(event.target, 'button-widget');
    let product = getClosest(event.target, 'product');
    if (widget.classList.contains('product__button-hide')) {
        let isActive = widget.classList.contains('button-widget--active');
        changeFilterState(product, isActive, hiddenProducts);
        changeWidgetState(widget, isActive, true);

        let showHiddenCheckbox = document.querySelector('.checkbox-toggler__input');
        changeProductVisibility(product, showHiddenCheckbox.checked);
    }
    if (widget.classList.contains('product__button-favorite')) {
        let isActive = widget.classList.contains('button-widget--active');
        changeFilterState(product, isActive, favoriteProducts);
        changeWidgetState(widget, isActive, true);
    }
    if (widget.classList.contains('product__button-compare')) {
        let isActive = widget.classList.contains('button-widget--active');
        changeFilterState(product, isActive, comparedProducts);
        changeWidgetState(widget, isActive, false);
    }
}

function changeWidgetState(widget, isActive, changeIcon) {
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

function changeFilterState(product, isActive, filteredProducts) {
    if (isActive) {
        let productIndex = hiddenProducts.indexOf(product);
        filteredProducts.splice(productIndex, 1);
    } else {
        filteredProducts.push(product);
    }
}

function changeProductVisibility(product, show) {
    if (show) {
        product.classList.remove('product--hide');
        product.classList.add('product--show-hidden');
    } else {
        product.classList.remove('product--show-hidden');
        product.classList.add('product--hide');
    }
}

function changeShowHiddenCheckBox(event) {
    let checkbox = event.target;
    if (checkbox.checked) {
        hiddenProducts.forEach(product => {
            changeProductVisibility(product, true);
        });
    } else {
        hiddenProducts.forEach(product => {
            changeProductVisibility(product, false);
        });
    }
}

function getClosest(element, closestClass) {
    if (element.classList.contains(closestClass)) return element;
    while ((element = element.parentElement) && !element.classList.contains(closestClass));
    return element;
}
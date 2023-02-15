const hiddenProducts = [];
const favoriteProducts = [];
const comparedProducts = [];

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.products').addEventListener('click', toggleWidget);
    document.querySelector('.checkbox-toggler__input').addEventListener('change', changeShowHiddenCheckBox);
    document.querySelector('.filter-buttons').addEventListener('click', switchFiltration);
});

function toggleWidget(event) {
    if (event.target.classList.contains('button-widget') || event.target.classList.contains('button-widget__icon')) {
        let widget = getClosest(event.target, 'button-widget');
        let product = getClosest(event.target, 'product');
        if (widget.classList.contains('product__button-hide')) {
            let isActive = widget.classList.contains('button-widget--active');
            changeFilterState(product, isActive, hiddenProducts);
            changeWidgetState(widget, isActive, true);

            let showHiddenCheckbox = document.querySelector('.checkbox-toggler__input');
            if (widget.classList.contains('button-widget--active')) {
                if (showHiddenCheckbox.checked) {
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
            changeFilterState(product, isActive, favoriteProducts);
            changeWidgetState(widget, isActive, true);

            let activatedFilterButton = document.querySelector('.filter-buttons__button--active');
            if (activatedFilterButton.dataset.filter === 'favourite') {
                product.classList.add('product--hide');
                product.classList.remove('product--show-hidden');
            }
        }

        if (widget.classList.contains('product__button-compare')) {
            let isActive = widget.classList.contains('button-widget--active');
            changeFilterState(product, isActive, comparedProducts);
            changeWidgetState(widget, isActive, false);

            let activatedFilterButton = document.querySelector('.filter-buttons__button--active');
            if (activatedFilterButton.dataset.filter === 'comparison') {
                product.classList.add('product--hide');
                product.classList.remove('product--show-hidden');
            }
        }
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

function changeFilterState(product, removeFromFiltered, filteredProducts) {
    if (removeFromFiltered) {
        let productIndex = filteredProducts.indexOf(product);
        filteredProducts.splice(productIndex, 1);
    } else {
        filteredProducts.push(product);
    }
}

function changeShowHiddenCheckBox(event) {
    let checkbox = event.target;
    hiddenProducts.forEach(product => {
        if (checkbox.checked) {
            product.classList.add('product--show-hidden');
        } else {
            product.classList.remove('product--show-hidden');
            product.classList.add('product--hide');
        }
    });
}

function switchFiltration(event) {
    let button = event.target;
    if (button.classList.contains('filter-buttons__button') && !button.classList.contains('filter-buttons__button--active')) {
        document.querySelector('.filter-buttons__button--active').classList.remove('filter-buttons__button--active');
        button.classList.add('filter-buttons__button--active');

        switch (button.dataset.filter) {
            case 'all':
                document.querySelectorAll('.product').forEach(product => {
                    if (!hiddenProducts.includes(product)) {
                        product.classList.remove('product--hide');
                    } else if (document.querySelector('.checkbox-toggler__input').checked) {
                        product.classList.add('product--show-hidden');
                    }
                });
                break;
            case 'favourite':
                favoriteProducts.forEach(product => {
                    if (!hiddenProducts.includes(product)) {
                        product.classList.remove('product--hide');
                    } else if (document.querySelector('.checkbox-toggler__input').checked) {
                        product.classList.add('product--show-hidden');
                    }
                });
                document.querySelectorAll('.product').forEach(product => {
                    if (!favoriteProducts.includes(product)) {
                        product.classList.add('product--hide');
                        product.classList.remove('product--show-hidden');
                    }
                });
                break;
            case 'comparison':
                comparedProducts.forEach(product => {
                    if (!hiddenProducts.includes(product)) {
                        product.classList.remove('product--hide');
                    } else if (document.querySelector('.checkbox-toggler__input').checked) {
                        product.classList.add('product--show-hidden');
                    }
                });
                document.querySelectorAll('.product').forEach(product => {
                    if (!comparedProducts.includes(product)) {
                        product.classList.add('product--hide');
                        product.classList.remove('product--show-hidden');
                    }
                });
                break;
        }
    }
}

function getClosest(element, closestClass) {
    if (element.classList.contains(closestClass)) {
        return element;
    }
    while (element) {
        if (element.classList.contains(closestClass)) {
            return element;
        }
        element = element.parentElement;
    }
}
import {productStateController} from './productStateController.js';
import {filtrationSwitcher} from './filtrationSwitcher.js';

document.addEventListener('DOMContentLoaded', function () {
    productStateController.initWidgets();

    document.querySelector('.products').addEventListener('click', productStateController.toggleWidget.bind(productStateController));
    document.querySelector('.checkbox-toggler__input').addEventListener('change', filtrationSwitcher.changeShowHiddenCheckBox.bind(filtrationSwitcher));
    document.querySelector('.filter-buttons').addEventListener('click', filtrationSwitcher.switchFiltration.bind(filtrationSwitcher));
});

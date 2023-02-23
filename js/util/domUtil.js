export class DomUtil {
    static getClosest(element, closestClass) {
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
}

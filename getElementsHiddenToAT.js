(function () {
    function isElementHidden(element) {
        if (element.hasAttribute('hidden')) {
            return true;
        }

        const computedStyle = getComputedStyle(element);

        if (
            computedStyle.display === "none" ||
            computedStyle.visibility === "hidden"
        ) {
            return true;
        }

        return false;
    }

    function isElementHiddenOnlyToAT(element) {
        if (
            element.hasAttribute('aria-hidden') &&
            element.getAttribute('aria-hidden') === 'true'
        ) {
            return true;
        }

        return false;
    }

    function isExcludedNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE && (
            node.tagName === "STYLE" || node.tagName === "SCRIPT"
        )) {
            return true;
        }

        return false;
    }

    function getElementsHiddenToAT(parentElement) {
        const elements = parentElement.querySelectorAll('*');
        const elementsHiddenOnlyToAT = [];
        const hiddenElements = [];

        elements.forEach(element => {
            if (isExcludedNode(element)) {
                return;
            }

            if (isElementHiddenOnlyToAT(element)) {
                element.style.border = "1px solid yellow";
                element.style.outline = "1px solid blue";
                element.style.outlineOffset = "2px";

                elementsHiddenOnlyToAT.push(element);
            } else if (isElementHidden(element)) {
                hiddenElements.push(element);
            }
        });

        return [
            elementsHiddenOnlyToAT,
            hiddenElements
        ];
    }

    const [elementsHiddenOnlyToAT, hiddenElements] = getElementsHiddenToAT(document.body);
    const numberOfElementsHiddenOnlyToAT = elementsHiddenOnlyToAT.length;
    const numberOfHiddenElements = hiddenElements.length;
    const numberOfElementsHiddenToAT = numberOfElementsHiddenOnlyToAT + numberOfHiddenElements;

    if (numberOfElementsHiddenToAT === 0) {
        alert("Aucun élément caché aux TA.");
        return;
    }

    let messageNumberOfElementsHiddenOnlyToAT = numberOfElementsHiddenOnlyToAT + ' éléments cachés aux TA avec aria-hidden="true"';
    let messageNumberOfHiddenElements = numberOfHiddenElements + ' éléments cachés pour tout le monde';

    if (numberOfElementsHiddenOnlyToAT === 0) {
        messageNumberOfElementsHiddenOnlyToAT = 'Aucun élément caché aux TA avec aria-hidden="true"';
    }

    if (numberOfHiddenElements === 0) {
        messageNumberOfHiddenElements = 'Aucun élément caché pour tout le monde';
    }

    if (numberOfElementsHiddenOnlyToAT === 1) {
        messageNumberOfElementsHiddenOnlyToAT = messageNumberOfElementsHiddenOnlyToAT.replace("éléments", "élément");
    }

    if (numberOfHiddenElements === 1) {
        messageNumberOfHiddenElements = messageNumberOfHiddenElements.replace("éléments", "élément");
    }

    console.log(messageNumberOfElementsHiddenOnlyToAT + " :");
    elementsHiddenOnlyToAT.forEach(element => {
        console.log(element);
    });

    console.log(messageNumberOfHiddenElements + " :");
    hiddenElements.forEach(element => {
        console.log(element);
    });

    alert(
        messageNumberOfElementsHiddenOnlyToAT + "." +
        "\n" + messageNumberOfHiddenElements + "." +
        "\n" +
        "\nLes éléments seulement cachés aux TA sont entourés de jaune et bleu." +
        "\n(Utiliser Stylus pour les afficher en rouge si nécessaire)" +
        "\n" +
        "\nOuvrir la console pour voir la liste de tous les éléments cachés aux TA."
    );

    
})();

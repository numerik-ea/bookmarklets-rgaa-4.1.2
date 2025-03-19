(function findAllChildrenWithDoubleBR() {
    function hasDoubleBR(element) {
        const children = Array.from(element.childNodes);
    
        for (let i = 0; i < children.length - 1; i++) {
            if (children[i].nodeName !== 'BR') {
                continue;
            }

            if (children[i + 1]?.nodeName === 'BR') {
                return true;
            }
    
            let j = i + 1;

            while (
                j < children.length &&
                children[j].nodeType === Node.TEXT_NODE &&
                children[j].textContent.trim() === ''
            ) {
                j++;
            }

            if (
                j < children.length &&
                children[j].nodeName === 'BR'
            ) {
                return true;
            }
        }
    
        return false;
    }
    

    // Recursive function to find all children with double <br> tags
    function recursiveFindAllChildrenWithDoubleBR(element, results) {
        if (hasDoubleBR(element)) {
            results.push(element);
            return;
        }

        const children = Array.from(element.children);

        if (children.length === 0) {
            return;
        }

        for (let child of children) {
            recursiveFindAllChildrenWithDoubleBR(child, results);
        }
    }

    const results = [];
    recursiveFindAllChildrenWithDoubleBR(document.body, results);

    if (results.length > 0) {
        let message = (
            results.length + " éléments avec double <br>.\n" +
            "Plus de détails dans la console."
        );

        if (results.length === 1) {
            message = message.replace("éléments", "élément");
        }

        alert(message);
        results.forEach(element => {
            element.style.border = "1px solid yellow";
            element.style.outline = "1px solid blue";
            element.style.outlineOffset = "2px";
            element.style.background = "red";
            element.style.backgroundColor = "red";

            console.log(element);
        });
    } else {
        alert("Pas d'éléments avec double <br>.");
    }
})();
/**
 * Bookmarklet to check image accessibility on a webpage
 * Found here: https://pauljadam.com/bookmarklets/index.html
 * Source code: https://github.com/pauljadam/bookmarklets/blob/master/images.js
 * 
 * What's new in this version:
 * - no more jQuery dependency
 * - texts translated to French
 * - improved code organization and readability
 */

(function () {
    // Common styles used throughout the code
    const STYLES = {
        base: 'color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;',
        outline: 'outline:orange 2px dashed;margin:0 2px; padding:2px;',
        absolute: 'position:absolute;line-height:100%;z-index:2147483647;',
        relative: 'position:relative;line-height:100%;z-index:2147483647;',
        link: 'border-bottom:2px solid blue;'
    };

    // Helper function to create a styled span element
    function createStyledSpan(className, text, styles = []) {
        const span = document.createElement('span');
        span.className = className;
        span.style.cssText = styles.map(style => STYLES[style]).join('');
        span.textContent = text;
        return span;
    }

    // Helper function to check if an element has any accessibility attributes
    function hasAccessibilityAttributes(element) {
        return element.hasAttribute('aria-label') ||
               element.hasAttribute('aria-labelledby') ||
               element.hasAttribute('aria-describedby') ||
               element.hasAttribute('title');
    }

    // Function to check and mark invalid alt attributes on non-image elements
    function checkInvalidAltAttributes() {
        document.querySelectorAll('a[alt], button[alt], label[alt]').forEach(element => {
            const span = createStyledSpan('altSpan', 
                ` INVALIDE❌alt='${element.getAttribute('alt')}' sur ${element.tagName}`,
                ['base', 'speak:literal-punctuation']);
            element.parentNode.insertBefore(span, element);
        });
    }

    // Function to check and mark role attributes
    function checkRoleAttribute(element) {
        if (element.hasAttribute('role')) {
            const span = createStyledSpan('closeSpan',
                `❓role='${element.getAttribute('role')}'`,
                ['base', 'outline', 'speak:literal-punctuation']);
            element.parentNode.insertBefore(span, element.nextSibling);
        }
    }

    // Function to check and mark ARIA attributes
    function checkAriaAttributes(element) {
        ['aria-label', 'aria-labelledby', 'aria-describedby'].forEach(attr => {
            if (element.hasAttribute(attr)) {
                const span = createStyledSpan('closeSpan',
                    `${attr}='${element.getAttribute(attr)}'`,
                    ['base', 'outline', 'speak:literal-punctuation']);
                element.parentNode.insertBefore(span, element.nextSibling);

                if (attr === 'aria-labelledby' || attr === 'aria-describedby') {
                    const ids = element.getAttribute(attr).split(' ');
                    ids.forEach(id => {
                        const referencedElement = document.getElementById(id);
                        if (referencedElement) {
                            referencedElement.style.outline = 'orange 2px dashed';
                            const inputSpan = createStyledSpan('inputSpan',
                                `id='${id}'`,
                                ['base', 'outline', 'absolute', 'speak:literal-punctuation']);
                            referencedElement.insertBefore(inputSpan, referencedElement.firstChild);
                        }
                    });
                }
            }
        });
    }

    // Function to check and mark alt attributes
    function checkAltAttribute(element) {
        element.style.outline = 'green 2px solid';
        element.style.padding = '2px';

        if (!element.hasAttribute('alt')) {
            if (!hasAccessibilityAttributes(element)) {
                const isLink = element.closest('a');
                element.style.outline = 'red 2px solid';
                element.style.padding = '2px';

                const span = createStyledSpan('altSpan',
                    isLink ? 'IMAGE LIEN❌PAS D\'ALT' : 'IMAGE❌PAS D\'ALT',
                    ['base', 'outline', 'absolute', isLink ? 'link' : '']);
                element.parentNode.insertBefore(span, element);
            }
        } else {
            const isLink = element.closest('a');
            const altValue = element.getAttribute('alt');
            const span = createStyledSpan('altSpan',
                isLink 
                    ? `IMAGE LIEN${altValue === '' ? '❓' : '👍'}alt='${altValue}'${altValue === '' ? '' : '❓'}`
                    : `IMAGE👍alt='${altValue}'❓`,
                ['base', 'outline', 'absolute', 'speak:literal-punctuation', isLink ? 'link' : '']);
            element.parentNode.insertBefore(span, element);
        }
    }

    // Function to check and mark title and longdesc attributes
    function checkAdditionalAttributes(element) {
        ['title', 'longdesc'].forEach(attr => {
            if (element.hasAttribute(attr)) {
                const span = createStyledSpan('axSpan',
                    `❓${attr}='${element.getAttribute(attr)}'`,
                    ['base', 'outline', 'relative']);
                span.setAttribute('role', 'region');
                span.setAttribute('aria-label', attr === 'title' ? 'Titre' : 'Description longue');
                element.parentNode.insertBefore(span, element.nextSibling);
            }
        });
    }

    // Function to show status message
    function showStatusMessage(imagesCount) {
        const message = imagesCount > 0
            ? `Succès ! ${imagesCount} images trouvées sur la page.`
            : 'Aucune image trouvée sur la page.';

        alert(message);
    }

    // Main function to check images
    function checkImages() {
        // Remove existing spans
        document.querySelectorAll('span.altSpan, span.axSpan, span.closeSpan').forEach(span => span.remove());

        // Check invalid alt attributes
        checkInvalidAltAttributes();

        // Check images and elements with role='img'
        const images = document.querySelectorAll('img, [role=img]');
        images.forEach(element => {
            checkRoleAttribute(element);
            checkAriaAttributes(element);
            checkAltAttribute(element);
            checkAdditionalAttributes(element);
        });

        // Show status message
        showStatusMessage(images.length);
    }

    // Execute the main function
    checkImages();
})();

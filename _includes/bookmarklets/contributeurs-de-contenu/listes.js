/**
 * Found here: https://pauljadam.com/bookmarklets/index.html
 * source code: https://github.com/pauljadam/bookmarklets/blob/master/lists.js
 */
(function () {
    // Supprimer les éléments existants
    document.querySelectorAll('strong.openSpan, strong.closeSpan').forEach(el => el.remove());

    // Styliser les listes
    document.querySelectorAll('ul, ol, dl').forEach(list => {
        list.style.outline = 'green 2px solid';
        list.style.padding = '2px';
        list.style.listStylePosition = 'inside';
    });

    // Vérifier les paragraphes dans les listes
    document.querySelectorAll('ul, ol').forEach(list => {
        // Get all <p> elements that are direct children of the list
        const paragraphs = list.querySelectorAll(':scope > p');

        if (paragraphs.length === 0) {
            return;
        }

        // Apply red outline to the list
        list.style.outline = '2px solid red';
        list.style.padding = '';
        list.style.listStylePosition = '';

        // Apply red outline to each paragraph
        paragraphs.forEach(paragraph => {
            paragraph.style.outline = '2px solid red';
        });

        // Only add the warning message if it doesn't already exist
        if (!list.querySelector('.openSpan')) {
            const strongElement = document.createElement('strong');

            strongElement.className = 'openSpan';
            strongElement.style.cssText = 'color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation';
            strongElement.textContent = '❌PARAGRAPHE(S) DANS LA LISTE';

            list.prepend(strongElement);
        }
    });

    // Ajouter des marqueurs pour les listes et les éléments de liste
    const elements = {
        'ul': '📝',
        'ol': '🔢',
        'dl': '📕',
        'li': '',
        'dd': '',
        'dt': ''
    };

    for (const [tag, emoji] of Object.entries(elements)) {
        document.querySelectorAll(tag).forEach(element => {
            // Ajouter la balise ouvrante
            const openSpan = document.createElement('strong');

            openSpan.className = 'openSpan';
            openSpan.style.cssText = 'color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;';
            openSpan.textContent = `<${tag}>${emoji}`;

            element.insertBefore(openSpan, element.firstChild);

            // Ajouter la balise fermante
            const closeSpan = document.createElement('strong');

            closeSpan.className = 'closeSpan';
            closeSpan.style.cssText = 'color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;';
            closeSpan.textContent = `</${tag}>`;

            element.appendChild(closeSpan);
        });
    }

    // Vérifier si des listes existent et afficher le message approprié
    const lists = document.querySelectorAll('ul, ol, li, dd, dt, dl');

    if (!lists.length) {
        const failure = document.createElement('strong');

        failure.style.cssText = 'color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;';
        failure.id = 'failure';
        failure.setAttribute('role', 'status');
        failure.textContent = 'Aucune liste trouvée sur la page : ' + document.title;

        document.body.insertBefore(failure, document.body.firstChild);
        setTimeout(() => failure.remove(), 6000);
    } else {
        const success = document.createElement('div');

        success.id = 'success';
        success.setAttribute('role', 'alert');
        success.style.cssText = 'position:absolute; width:0; height:0; clip: rect(0,0,0,0);';
        success.textContent = 'Succès ! Listes trouvées sur la page : ' + document.title;

        document.body.appendChild(success);
        setTimeout(() => success.remove(), 3000);
    }
})();

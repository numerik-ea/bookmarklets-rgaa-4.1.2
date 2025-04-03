(function checkLandmarks() {
    let message = '';

    document.querySelector('[role=\'banner\']') ? message += '[role=\'banner\'] trouvé\n' : message += '[role=\'banner\'] non trouvé\n';
    document.querySelector('[role=\'search\']') ? message += '[role=\'search\'] trouvé\n' : message += '[role=\'search\'] non trouvé\n';
    document.querySelector('[role=\'navigation\']') ? message += '[role=\'navigation\'] trouvé\n' : message += '[role=\'navigation\'] non trouvé\n';
    document.querySelector('[role=\'main\']') ? message += '[role=\'main\'] trouvé\n' : message += '[role=\'main\'] non trouvé\n';
    document.querySelector('[role=\'contentinfo\']') ? message += '[role=\'contentinfo\'] trouvé\n' : message += '[role=\'contentinfo\'] non trouvé\n';

    alert(message + '\nVoir la console pour plus de détails.');

    document.querySelectorAll([
        '[role=\'banner\']',
        '[role=\'search\']', 
        '[role=\'navigation\']',
        '[role=\'main\']',
        '[role=\'contentinfo\']',
    ].join(',')).forEach(
        element => console.log(element)
    );
})();
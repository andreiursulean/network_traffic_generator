function openTab(evt, tabName) {
    
    // Hide all tabcontent elements
    let tabcontent = document.getElementsByClassName('tabcontent');

    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    // set tablinks not active 
    let tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace('active', '');
    }

    // Show current tab content
    document.getElementById(tabName).style.display = 'block';

    // Set current tab link active
    evt.currentTarget.className += ' active';

}
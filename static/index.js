function postComment(postId) {
    console.log("inside the function");
    // Access the parent window
    var parentWindow = window.parent;

    // Access elements from the parent window
    var contentIframe = parentWindow.document.getElementById("content");
    var optionsContentIframe = parentWindow.document.getElementById("options-content");

    if (contentIframe && optionsContentIframe) {
        contentIframe.src = `/comment/postSection/${postId}`;
        optionsContentIframe.src = `/comment/commentSection/${postId}`;
    } else {
        console.error("One or both iframes not found.");
    }
}

function loadPage(pageName) {   
    document.getElementById("content").src = `/${pageName}`;

    const relatedPageName = `${pageName}_options`;
    document.getElementById("options-content").src = `/${pageName}/${relatedPageName}`;
}
function loadPagein(parentName, pageName) {

    document.getElementById("content").src = `/${parentName}/${pageName}`;

    const relatedPageName = `${pageName}_options`;
    document.getElementById("options-content").src = `/${pageName}/${relatedPageName}`;
}

function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.option button')) {
        var dropdowns = document.getElementsByClassName('dropdown');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function logout() {
    window.top.location.href = '/';
}
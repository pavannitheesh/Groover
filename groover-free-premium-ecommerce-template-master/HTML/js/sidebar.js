
function toggleOptions() {
    var itemOptions = document.getElementById("itemOptions");
    itemOptions.style.display = itemOptions.style.display === "none" ? "block" : "none";
}

function addSelectedItems() {
    var itemOptions = document.querySelectorAll("#itemOptions input[type='checkbox']");
    var userSidebar = document.getElementById("userSidebar");

    itemOptions.forEach(function (checkbox) {
        var itemName = checkbox.value;
        var existingItem = userSidebar.querySelector(`[data-item='${itemName}']`);

        if (checkbox.checked && !existingItem) {
            var newItem = document.createElement("li");
            newItem.className = "sidebar-item";
            newItem.innerHTML = `<a href="#" class="sidebar-link" data-item="${itemName}">${itemName}</a>`;
            userSidebar.insertBefore(newItem, document.getElementById("addItemContainer"));
        } else if (!checkbox.checked && existingItem) {
            existingItem.parentNode.removeChild(existingItem);
        }
    });
}
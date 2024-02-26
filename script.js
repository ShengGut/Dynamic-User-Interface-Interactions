// Reusable function to toggle visibility of dropdown menus
function toggleDropdown() {
  var dropdowns = document.querySelectorAll('.dropdown')

  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('click', function (event) {
      var menu = this.querySelector('.dropdown-menu')
      menu.classList.toggle('visible')
    })
  })
}

// Initialize dropdown toggles
toggleDropdown()

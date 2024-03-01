// hovers over the menu and it will drop down the list of tabs
function toggleDropdown() {
  let dropdowns = document.querySelectorAll('.dropdown')

  dropdowns.forEach(function (dropdown) {
    let menu = dropdown.querySelector('.dropdown-menu')

    dropdown.addEventListener('mouseover', function (event) {
      menu.style.display = 'block'
    })
    dropdown.addEventListener('mouseout', function (event) {
      menu.style.display = 'none'
    })
  })
}

toggleDropdown()

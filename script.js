function toggleDropdown() {
  let dropdowns = document.querySelectorAll('.dropdown')

  dropdowns.forEach(function (dropdown) {
    let menu = dropdown.querySelector('.dropdown-menu')

    // For desktop devices
    dropdown.addEventListener('mouseover', function (event) {
      menu.style.display = 'block'
    })

    dropdown.addEventListener('mouseout', function (event) {
      menu.style.display = 'none'
    })

    // For mobile devices
    dropdown.addEventListener('click', function (event) {
      if (window.innerWidth <= 768) {
        event.preventDefault()
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block'
      }
    })
    // Improves fluidty of tap instead of having to click twice
    dropdown.addEventListener('touchstart', function (event) {
      if (window.innerWidth <= 768) {
        event.preventDefault()
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block'
      }
    })
  })
}

toggleDropdown()

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

// checks if html theme is light or dark and inverts the SVG icons colors
function invertSVGColor() {
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  console.log('Is dark theme?', isDarkTheme)
  if (isDarkTheme) {
    const carouselButtons = document.querySelectorAll('.carousel-button')

    carouselButtons.forEach((button) => {
      const img = button.querySelector('img')
      if (img) {
        img.classList.add('inverted-svg')
      }
    })
  }
}

invertSVGColor()

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

const track = document.querySelector('.carousel-track')
const slides = Array.from(track.children)
const nextButton = document.querySelector('.carousel-button--right')
const prevButton = document.querySelector('.carousel-button--left')
const dotsNav = document.querySelector('.carousel-nav')
const dots = Array.from(dotsNav.children)
console.log(slides)
console.log(dots)

const slideWidth = slides[0].getBoundingClientRect().width

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px'
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide')
  targetDot.classList.add('current-slide')
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden')
    nextButton.classList.remove('is-hidden')
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden')
    nextButton.classList.add('is-hidden')
  } else {
    prevButton.classList.remove('is-hidden')
    nextButton.classList.remove('is-hidden')
  }
}

slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
  currentSlide.classList.remove('current-slide')
  targetSlide.classList.add('current-slide')
}

// When clicking previous button, it moves left
prevButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide')
  const prevSlide = currentSlide.previousElementSibling
  const currentDot = dotsNav.querySelector('.current-slide')
  const prevDot = currentDot.previousElementSibling
  const prevIndex = slides.findIndex((slide) => slide === prevSlide)
  moveToSlide(track, currentSlide, prevSlide)
  updateDots(currentDot, prevDot)
  hideShowArrows(slides, prevButton, nextButton, prevIndex)
})
// When clicking next button, it moves right
nextButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide')
  const nextSlide = currentSlide.nextElementSibling
  const currentDot = dotsNav.querySelector('.current-slide')
  const nextDot = currentDot.nextElementSibling
  const nextIndex = slides.findIndex((slide) => slide === nextSlide)
  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hideShowArrows(slides, prevButton, nextButton, nextIndex)
})
// When clicking on navdot, it moves to that slide
dotsNav.addEventListener('click', (e) => {
  const targetDot = e.target.closest('button')

  if (!targetDot) return

  const currentSlide = track.querySelector('.current-slide')
  const currentDot = dotsNav.querySelector('.current-slide')
  const targetIndex = dots.findIndex((dot) => dot === targetDot)
  const targetSlide = slides[targetIndex]
  moveToSlide(track, currentSlide, targetSlide)
  updateDots(currentDot, targetDot)
  console.log(targetIndex)
  hideShowArrows(slides, prevButton, nextButton, targetIndex)
})

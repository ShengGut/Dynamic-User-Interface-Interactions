function toggleDropdown() {
  document.querySelectorAll('.dropdown').forEach((dropdown) => {
    const menu = dropdown.querySelector('.dropdown-menu')
    const toggleMenu = () =>
      (menu.style.display = menu.style.display === 'block' ? 'none' : 'block')

    // For desktop devices
    dropdown.addEventListener('mouseover', () => (menu.style.display = 'block'))
    dropdown.addEventListener('mouseover', () => (menu.style.display = 'none'))

    // For mobile devices
    dropdown.addEventListener(
      'click',
      (e) => window.innerWidth <= 768 && e.preventDefault() && toggleMenu()
    )
    // Improves fluidty of tap instead of having to click twice
    dropdown.addEventListener(
      'touchstart',
      (e) => window.innerWidth <= 768 && e.preventDefault() && toggleMenu()
    )
  })
}

toggleDropdown()

// checks if html theme is light or dark and inverts the SVG icons colors
function invertSVGColor() {
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  document
    .querySelectorAll('.carousel-button img')
    .forEach((img) => isDarkTheme && img.classList.add('inverted-svg'))
}

invertSVGColor()

const startImageCarousel = () => {
  const track = document.querySelector('.carousel-track')
  const slides = Array.from(track.children)
  const nextButton = document.querySelector('.carousel-button--right')
  const prevButton = document.querySelector('.carousel-button--left')
  const dotsNav = document.querySelector('.carousel-nav')
  const dots = Array.from(dotsNav.children)
  const slideWidth = slides[0].getBoundingClientRect().width

  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px'
  }
  slides.forEach(setSlidePosition)

  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
  }

  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')
  }

  const hideShowArrows = (targetIndex) => {
    prevButton.classList.toggle('is-hidden', targetIndex === 0)
    nextButton.classList.toggle('is-hidden', targetIndex === slides.length - 1)
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
    hideShowArrows(prevIndex)
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
    hideShowArrows(nextIndex)
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
    hideShowArrows(targetIndex)
  })

  // Will advance slide every 5 second and reset once it reaches the end
  function autoAdvanceSlides() {
    let currentIndex = 0
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length // if currentIndex + 1 is equal to or greater, then wrap to the beginning of array
      moveToSlide(track, slides[currentIndex], slides[nextIndex])
      updateDots(dots[currentIndex], dots[nextIndex])
      hideShowArrows(nextIndex)
      currentIndex = nextIndex
    }, 5000)
    // Stop auto advancing when user interacts with slides, or restart auto advancing when user mouses out of it
    track.addEventListener('mouseover', () => clearInterval(interval))
    track.addEventListener('mouseout', () => {
      clearInterval(interval)
      autoAdvanceSlides()
    })
  }

  autoAdvanceSlides()
}

startImageCarousel()

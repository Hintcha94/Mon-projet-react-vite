// Animation automatique du slider mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileSlider = document.querySelector('.mobile-partners .d-flex');
    let scrollAmount = 0;
    const scrollStep = 150;
    let scrollDirection = 1;

    function autoScrollMobile() {
        if (scrollAmount >= mobileSlider.scrollWidth - mobileSlider.parentElement.clientWidth) {
            scrollDirection = -1;
        } else if (scrollAmount <= 0) {
            scrollDirection = 1;
        }

        scrollAmount += scrollStep * scrollDirection;
        mobileSlider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    setInterval(autoScrollMobile, 2000);
});
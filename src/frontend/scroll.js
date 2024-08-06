/** Fix Scroll Behaviour */
const scrollTrigger = () => {
    const scrollToView = () => {
        var targetId = window.location.hash.substring(1);
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    window.addEventListener('load', function () {
        window.scrollTo(0, 0);
        setTimeout(() => {
            scrollToView();
        }, 300);
    });

    window.addEventListener('hashchange', function (event) {
        event.preventDefault();
        scrollToView();
    });
};

export default scrollTrigger();



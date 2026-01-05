const slideshowStyle = (attribute, elementId) => {
    const {
        duration,
        backgroundPosition,
        transition,
        backgroundSize,
        backgroundRepeat,
        kenBurns,
        direction,
        displayDuration = 1
    } = attribute;

    const bgPosition = backgroundPosition && 'default' !== backgroundPosition ? backgroundPosition.replace(/-/g, ' ') : 'center';
    const effectDirection = 'directionOut' === direction ? 'ken-burns-toggle-out' : 'ken-burns-toggle-in';
    const transitions = (duration < 0.1 || undefined === duration) ? 1 : parseFloat(duration);
    const transitionDuration = (parseFloat(transitions) < parseFloat(displayDuration)) ? parseFloat(transitions) : displayDuration - 0.1;
    let styles = '';

    styles += `
        .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow .${elementId}-slideshow-image {
            background-size: ${backgroundSize};
            background-position: ${bgPosition};
            background-repeat: ${backgroundRepeat};
        }
            
        ${kenBurns ? `.bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.hasToggledClass .${elementId}-slideshow-image {
            animation: ${effectDirection} 20s linear forwards;
        }` : ''}
    `;

    switch (transition) {
        case 'slideRight': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                ${`animation: previous-slideRight ${transitionDuration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                ${`animation: current-slideRight ${transitionDuration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideLeft': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                left: unset;
                ${`animation: previous-slideLeft ${transitionDuration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                left: unset;
                ${`animation: current-slideLeft ${transitionDuration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideTop': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                top: unset;
                ${`animation: previous-slideTop ${transitionDuration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                top: unset;
                ${`animation: current-slideTop ${transitionDuration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideDown': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                ${`animation: previous-slideBottom ${transitionDuration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                ${`animation: current-slideBottom ${transitionDuration}s ease-in-out forwards;`}
            }`;
            break;
        }
        default: {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                ${`animation: previous-fade ${transitionDuration}s ease-in-out forwards;`}
            }`;
            break;
        }
    }

    return styles;
};

export const slideshowGenerator = (attribute, style, css) => {
    const { selector } = style;

    const slideshowCss = slideshowStyle(attribute, selector);
    css.Desktop = slideshowCss;
    css.Mobile = slideshowCss;
    css.Tablet = slideshowCss;

    return css;
};
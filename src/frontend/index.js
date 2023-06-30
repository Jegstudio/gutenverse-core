import u from 'umbrellajs';
import GutenverseTabs from './blocks/tab';
import GutenverseVideo from './blocks/video';
import GutenverseAccordion from './blocks/accordion';
import GutenverseTeam from './blocks/team';
import GutenverseProgressBar from './blocks/progress-bar';
import GutenverseFunFact from './blocks/fun-fact';
import GutenverseNavMenu from './blocks/nav-menu';
import GutenverseTestimonials from './blocks/testimonials';
import GutenverseClientLogo from './blocks/client-logo';
import GutenverseGallery from './blocks/gallery';
import GutenverseAnimatedText from './blocks/animated-text';
import GutenversePostblock from './blocks/postblock';
import GutenversePostlist from './blocks/postlist';

const gutenClasses = {
    ['tabs']: GutenverseTabs,
    ['accordions']: GutenverseAccordion,
    ['video-wrapper']: GutenverseVideo,
    ['video-background']: GutenverseVideo,
    ['team']: GutenverseTeam,
    ['progress-bar']: GutenverseProgressBar,
    ['fun-fact']: GutenverseFunFact,
    ['nav-menu']: GutenverseNavMenu,
    ['testimonials']: GutenverseTestimonials,
    ['client-logo']: GutenverseClientLogo,
    ['gallery']: GutenverseGallery,
    ['animated-text']: GutenverseAnimatedText,
    ['post-block']: GutenversePostblock,
    ['post-list']: GutenversePostlist,
};

Object.keys(gutenClasses).map((index) => {
    const selected = u(`.guten-${index}`);
    const ClassItem = gutenClasses[index];

    if (selected) {
        new ClassItem(selected);
    }
});

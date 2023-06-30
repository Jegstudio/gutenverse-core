export class ReplaceCSS {
    init() {
        const mediaRules = Array.from(this.findAllMediaRules());

        // read replacement values
        const style = getComputedStyle(document.documentElement);
        const replacements = {
            ['425px']: style.getPropertyValue('--guten-screen-xs-max'),
            ['426px']: style.getPropertyValue('--guten-screen-sm-min'),
            ['780px']: style.getPropertyValue('--guten-screen-sm-max'),
            ['781px']: style.getPropertyValue('--guten-screen-md-min'),
        };

        // update media rules
        for (let i = 0, mediaRule; mediaRule = mediaRules[i]; i++) { // eslint-disable-line
            if (Object.keys(replacements).find(media => mediaRule.cssText.includes(media))) {
                Object.keys(replacements).map(key => {
                    mediaRule.media.mediaText = mediaRule.media.mediaText.replaceAll(key, replacements[key]);
                });
            }
        }
    }

    *visitCssRule(cssRule) {
        // visit imported stylesheet
        if (cssRule.type == cssRule.IMPORT_RULE) {
            yield* this.visitStyleSheet(cssRule.styleSheet);
        }

        // yield media rule
        if (cssRule.type == cssRule.MEDIA_RULE) {
            yield cssRule;
        }
    }

    *visitStyleSheet(styleSheet) {
        try {
            // visit every rule in the stylesheet
            let cssRules = styleSheet.cssRules;
            for (let i = 0, cssRule; (cssRule = cssRules[i]); i++) {
                yield* this.visitCssRule(cssRule);
            }
        } catch (ignored) {
            // empty
        }
    }

    *findAllMediaRules() {
        // visit all stylesheets
        let styleSheets = document.styleSheets;

        for (let i = 0, styleSheet; (styleSheet = styleSheets[i]); i++) {
            if (styleSheet.href && styleSheet.href.includes('plugins/gutenverse') && styleSheet.href.includes('frontend.css')) {
                yield* this.visitStyleSheet(styleSheet);
            }
        }
    }
}

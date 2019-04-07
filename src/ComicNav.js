// https://github.com/JasonHorsleyTech/ComicNav - MIT
class ComicNav {
    detach() {
        // Maybe?
    }
    attach() {
        this.listener = document.addEventListener("keydown", (event) => {
            if (event.keyCode === 37 &&
                this.requiredKeyPressed &&
                this.prevURL &&
                this.prevURL !== window.location.href) {
                window.location.href = this.prevURL;
            } else if (event.keyCode === 39 &&
                this.requiredKeyPressed &&
                this.nextURL &&
                this.nextURL !== window.location.href) {
                window.location.href = this.nextURL;
            } else if (event.keyCode === this.props.requiredKey) {
                this.requiredKeyPressed = true;
            }
        });
    }
    getSiteSpecifics(site) {
        let defaultBySite = {
            "samandfuzzy": {
                nextQuery: ".next-page a",
                prevQuery: ".prev-page a",
                // Comics usually tall... TODO: Figure out early years??
                // requiredKey: 40
            },
            "xkcd": {
                prevQuery: "a[rel=prev]",
                nextQuery: "a[rel=prev]",
            },
            "penny-arcade": {
                prevQuery: ".btn.btnPrev",
                nextQuery: ".btn.btnNext",
            },
            // Scary-go-round: Already has one
            "qwantz": {
                prevQuery: "a[rel=prev]",
                nextQuery: "a[rel=prev]",
            },
            // questionablecontent: Already
            // amultiverse: already
            "asofterworld": {
                prevQuery: "#previous a",
                nextQuery: "#next a",
            },
            // SMBC: already. jumpbar.js?
            "octopuspie": {
                prevQuery: "a[rel=prev]",
                nextQuery: "a[rel=next]",
            },
            "pbfcomics": {
                prevQuery: "a[rel=prev]",
                nextQuery: "a[rel=next]",
            }
        };
        if (defaultBySite[site]) {
            return defaultBySite[site]
        } else {
            return {
                prevQuery: "a[rel=prev]",
                nextQuery: "a[rel=next]",
            }
        }
    }
    constructor(site, preferences) {
        /**
         * @param {string} site - Webcomic site currently using this script
         * @param {object} preferences - Object of properties to oversite site specific values.
         *          - prevQuery:        arg for document.querySelector to find the previous comic href
         *          - nextQuery:        arg for document.querySelector to find the next comic href
         *          - requiredKey:      keycode for a key that MUST be pressed first before left/right arrow nav enabled
         */
        try {
            if (!site && !preferences) {
                throw 1
            }
            // In case
            this.site = site;
            /*
                I'm keeping a running list of webcomics and which query selectors get the href of next and prev
                I also keep which sites can implement a "must arrow down for left/right to function" catch, and which can't (short comics)
            
                I may also implement a "go to beginning/end of storyline" control click, or something else that makes sense
            
                However, I'm also keeping this relatively open, so that if someone wants to set up their own querys and preferences, they can override
                And I'm using Object.assign instead of a tunary because someone might only supply a preference override, not the entire expected object
                    new ComicNav("muhsite", {requireKey: 40}); <-- No prev/next query strings, use known/default.
            */
            let defaults = this.getSiteSpecifics(site.toLowerCase());
            this.props = Object.assign(defaults, preferences);

            // key down listener for navigation
            this.listener = false; 

            // Almost all sites use queryable a tags with next/prev hrefs.
            let nextAnchor = document.querySelector(this.props.nextQuery);
            let prevAnchor = document.querySelector(this.props.prevQuery);

            if (nextAnchor === null && prevAnchor === null) {
                throw 2
            }

            this.nextURL = (nextAnchor && nextAnchor.href) ? nextAnchor.href : false;
            this.prevURL = (prevAnchor && prevAnchor.href) ? prevAnchor.href : false;

            // If no passed in required key, or a bad pass, assume the requirement has been met.
            this.requiredKeyPressed = (typeof this.props.requiredKey == "number") ? false : true;

            this.attach();
        } catch (errCode) {
            console.error("ComicNav.js Constructor error: ");
            switch (errCode) {
                case 1:
                    console.info("Missing site and preferences arguments. For usage, please checkout");
                    console.info("https://github.com/JasonHorsleyTech/ComicNav");
                    break;
                case 2:
                    console.error("Next/Previous elements not found on site, or both are missing href values. Using");
                    console.error("this.props.nextQuery: " + this.props.nextQuery);
                    console.error("this.props.prevQuery: " + this.props.prevQuery);
                    break;
                default:
                    console.info("Not sure what happened, but one of us did something wrong.");
                    console.info("https://github.com/JasonHorsleyTech/ComicNav");
            }
        }
    }
}
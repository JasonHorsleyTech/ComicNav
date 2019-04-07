# Comic Nav

Simple JS to attach the right/left arrow keys to the Next and Previous comic buttons on your website.

## How to use

### Base

Download src/ComicNav.js or src/ComicNav.js.min to your server, and load in your head.

```html
<head>
    <!-- Link to latest minified version -->
    <script src="path/to/ComicNav.js.min"></script>

    <!-- If you have jQuery -->
    <script>
        $(document).ready(function() {
            new ComicNav("MyNewComic", {
                nextQuery: "a[rel=next]",
                prevQuery: "a[rel=prev]"
            });
        })
    </script>

    <!-- If you DO NOT have jQuery -->
    <script>
        document.addEventListener("DOMContentLoaded", (event) => {
            new ComicNav("MyNewComic", {
                nextQuery: "a[rel=next]",
                prevQuery: "a[rel=prev]"
            });
        });
    </script>
</head>
```

#### Customization

Sites are varied. The first argument is your site's url name, as it appears in the address bar. The second argument is what query selector strings the script should look for to find the "next" and "previous" <a> elements. For example, if your site uses

```html
<div class='previousButton'>
    <a href='comic/1234'>Previous</a>
</div>
<div class='nextButton'>
    <a href='comic/1234'>Previous</a>
</div>
```

You would pass in 

```js
new ComicNav("MyNewComic", {
    nextQuery: ".nextButton a",
    prevQuery: ".previousButton a"
});
```

For help on how to figure out what querySelector works for your site, use [this reference](https://css-tricks.com/how-css-selectors-work/). Or if you're lazy and popular, just ask me to add your site to a list of known comics.

You can also pass an optional "required key", meaning readers have to _first_ press that key before left and right arrows are enabled. If your comic strip is regularly taller than the screen size, an arrow down is a good indication that your reader is using the arrow keys to read each comic, and probably not expecting the right and left arrows to do anything else.

But maybe you're in Australia, and your readers have to arrow "up" to get the comics. I don't know. If you want to require an initial key press for navigation to turn on, pass it like this

```js
new ComicNav("MyNewComic", {
    nextQuery: ".nextButton a",
    prevQuery: ".previousButton a",
    requiredKey: 40 // 40 is the key code for "down arrow"
});
```

To swap out with another key, check key codes on [this site](https://keycode.info/)

#### Known sites

I've gone through a couple of my favorite sites, and figured out what query selectors will work. If your comic is on this list, just use the following shorthand

```html
<head>
    <script>
        // Domain name only, as appears in the address bar
        new ComicNav("samandfuzzy");
    </script>
</head>
```

List of known

* Sam and Fuzzy: samandfuzzy
* XKCD: xkcd
* Penny Arcade: penny-arcade
* Dinosaur Comics: qwantz
* A softer world: asofterworld
* Octopus Pie: octopuspie
* Perry Bible Fellowship: pbfcomics

## Why?

I realized I've been reading Sam and Fuzzy for almost a decade now. I've been "arrowing down" to read the comic itself, then fussing with the stupid track pad on my laptop to hover over the "next comic" button. And that sucks.

So I reached out to the Author, thanked him for 10+ years of high quality free content, and asked if he would be willing to put a Javascript snippet on his domain to save me the extra steps. And he said yes.

Was thinking this might apply to other sites, most have some queryable element for the next/prev actions. Will get Sam using, and then reach out to see if others are interested. Just for fun I guess? Just to get that much closer to the stars? Or more likely because my wife is on a girls trip to Vegas and I woke up Sunday morning realizing I have no hobbies.

## License

MIT, do whatever you want baby

## Author

[Jason Horsley](mailto:Jason@JasonHorsley.tech), send me an email if you want me to include your site, or if you want an improvement of some sort. Or if you want to just chat, the 21st century is a lonely place man.

Country flags in single CSS sprite
==================================

CSS Sprites - a method to optimize page loads by combining a large number of small images into one. 

## Usage

Include CSS file in your HTML code then insert a transparent 1x1 pixel image with classes `flag` and `flag-{country code}`. The country code is in the format ISO 3166-1 alpha-2:

```html
<html>
    <head>
        <link href="flags.css" rel=stylesheet type="text/css">
    </head>
    <body>
        <img src="blank.gif" class="flag flag-cz" alt="Czech Republic" />
    </body>
</html>
```

## Included flags


* France (fr)
* United Kingdom (gb)
* United States (us)

## Links

* [CSS Flag Sprites generator](https://www.flag-sprites.com/ "Country flags in single CSS sprite")
* [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
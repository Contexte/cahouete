# Peanut

<img src="docs/__files__/logo.svg" height="300" />

> Writing email templates is now so much fun.

Based on:

- [mjml](https://mjml.io/)
- [nunjucks](https://mozilla.github.io/nunjucks/)
- [gulp](https://gulpjs.com/)

To correctly understand this framework, you should first know [mjml](https://mjml.io/getting-started/1) and [nunjucks](https://mozilla.github.io/nunjucks/templating.html).

The idea behind this framework is that even if mjml is an amazing one, it doesn't have macro/components feature and doesn't give you a structure for your files.

## Install

Download the [version wanted](https://github.com/kud/peanut/releases) and:

```shell
$ npm install
```

## Usage

### Development

```shell
$ npm run start
```


### Distribution

```shell
$ npm run build
```

## Docs

### Architecture

```
src/
├── components // where your components (or macro) are placed
│   └── Generic
│       ├── index.css
│       └── index.njk
├── fonts
│   └── open-sans.njk
├── layouts
│   ├── default.css
│   └── default.mjml.njk
├── pages // each folder is a page
│   └── Sample
│       ├── index.css
│       └── index.mjml.njk
└── styles // common styles
    └── attributes.njk
```

Results are done in `/dist` and temporary files for debug (nunjucks compiled result in mjml templates) are in `__build__`.

### Components

If you want to make a component:

- create a folder into `/components`
- create two files called `index(.mjml).njk` and `index.css` // `.mjml` here is needed only to explain your component will also have mjml components, not only html
- add default `index.njk` code: two functions (style and render)


```html
{% macro style() %}
{% include "./index.css" %}
{% endmacro %}

{% macro
  render(
    prop=""
  )
%}
{{ prop }}
{% endmacro %}
```

- Be sure to add it into the layout:

at the top of your layout:

```html
{% import rootDir + "/components/:Component:/index.njk" as :Component: %}
```

and in `<mj-head>`:

```html
<mj-head>
  {{ Component.style() }}
</mj-head>
```

### Styles

Styles are in `*.css` and code should be wrapped by:

```html
<mj-style inline="inline">
</mj-style>
```

to be understood by mjml.

Default styles for mjml components are in `styles/attributes.njk`.

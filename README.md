# GS Mailgun Templates

Based on '[grunt email workflow](https://github.com/leemunroe/grunt-email-workflow).' 

## Requirements

You may already have these installed on your system. If not, you'll have to install them.

* Node.js - [Install Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
* Grunt-cli and Grunt (`npm install grunt-cli -g`)
* [Mailgun](http://www.mailgun.com) - Sends emails and stores templates

## Getting started

If you haven't used [Grunt](http://gruntjs.com/) before check out Chris Coyier's post on [getting started with Grunt](http://24ways.org/2013/grunt-is-not-weird-and-hard/).

#### 1. Build

run `npm install` to install the necessary packages.

#### 2. Create secrets.json

Create a `secrets.json` file in your project root with mailgun keys.

#### 3. Run Grunt

Run `grunt` in command line and check out your `/dist` folder to see your compiled and inlined email templates.

### CSS

This project uses [SCSS](http://sass-lang.com/). You don't need to touch the .css files, these are compiled automatically.

For changes to CSS, modify the `.scss` files.

Media queries and responsive styles are in a separate style sheet so that they don't get inlined. Note that only a few clients support media queries e.g. iOS Mail app.

### Email templates and content

Handlebars and Assemble are used for templating.

`/layouts` contains the standard header/footer HTML wrapper markup. You most likely will only need one layout template, but you can have as many as you like.

`/emails` is where your email content will go.

`/data` contains _optional_ .yml or .json data files that can be used in your templates. It's a good way to store commonly used strings and variables. See `/data/default.yml` for an example.

`/partials` contains _optional_ .hbs files that can be thought of like includes.

`/partials/components` contains _optional_ .hbs files that can help generate your markup. Each component will typically have a corresponding Sass file in `src/css/sass/<component_name>.scss`. To use a component, for example `/partials/components/button.hbs` you would use the following code in your emails template. _(note: You can use single -or- double quotes for attributes)_

```hbs
{{> button type="primary" align="center" url="LINK GOES HERE" title="ANCHOR TEXT GOES HERE" }}
```

### Generate your email templates

In Terminal/command-line, run `grunt`. This will:

* Compile your SCSS to CSS
* Generate your email layout and content
* Inline your CSS
* Compress your images

See the output HTML in the `dist` folder. Open them and preview it the browser.

<img src="http://i.imgur.com/EnTCqUE.gif" width="500">

Alternatively run `grunt serve`. This will check for any changes you make to your .scss and .hbs templates, automatically run the tasks, and serve you a preview in the browser on http://localhost:4000. Saves you having to run grunt every time you make a change.

### Browser-based previews

In terminal, run `grunt serve`. 

* This will run the default tasks `grunt` + the `watch` task will be initiated
* A preview UI will automagically open on [http://localhost:4000](http://localhost:4000) and you can review your templates
* Go about your business editing templates and see your template changes live-reload
* __NOTE:__ The express server stops working when the `watch` task is not running

<img src="http://i.imgur.com/AGZqbIn.png" width="500">

### Send a test email to yourself

Run `grunt send --template=TEMPLATE_NAME.html`. This will email out the template you specify.

<img src="http://i.imgur.com/6N8VRen.gif" width="500">

Change 'transaction.html' to the name of the email template you want to send.

### Store the template for use in Mailgun

#### Create a template
```$xslt
node pushTemplateToMailgun.js -template template-name -description 'GoldSilver Template'
```

#### Update a template
```$xslt
node pushTemplateToMailgun.js -template template-name -description 'GoldSilver Template' -version 'v0.1'
```

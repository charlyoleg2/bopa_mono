Bopa\_mono
==========


Presentation
------------

*Bopa\_mono* is the top-monorepo of the CLI *bopac* and its web-UI *bopa-ui*.

This monorepo contains the following *javascript* packages:

1. bopa-recipe: a list of recipes of boilerplates
2. bopa-ui: the web-UI of BoPa
3. bopac: the CLI, that spins *bopa-ui* and write the boilerplate

*bopac* is published on *npm*.
The web-UI is also available on the github-page.


Motivations
-----------

For boilerplate maintainers, the traditional approach with `npm init` requires template files like *handlebars*, that are not easy to maintain because commands like `npm update --save` doesn't work on those template files. Keeping the boilerplate update to date with the newest dependency versions requires cumbersome manual editing.
At the opposite, the *BoPa* approach is based on a reference repository easy to maintain and a recipe that lists the files of the boilerplate and enables renaming of file-names and file-contents.

For boilerplate users, the web-UI provides more comfort for the understanding and selection of the configuration of the boilerplate. Usually `npm init` asks some questions one after the other to configure the boilerplate, without overview and without simple way to change previous settings.


Links
-----

- [bopa-ui](https://charlyoleg2.github.io/bopa_mono/) : public instance of the UI
- [sources](https://github.com/charlyoleg2/bopa_mono) : git-repository
- [pkg](https://www.npmjs.com/package/bopac) : cli as npm-package


Usage
-----

The CLI *bopac* is not intended to be installed. Just use the latest version directly with *npx*.

```bash
npx bopac@latest
```

Or preselect the boilerplate recipe

```bash
npx bopac@latest --help
npx bopac@latest --url=https://github.com/charlyoleg2/bopa_mono/pkg/bopa-recipe/recipe/parame99_mono.json
npx bopac@latest --file=path/to/parame99_mono.json
npx bopac@latest --select=parame99_mono.json
```

Getting started for Dev
-----------------------

```bash
git clone https://github.com/charlyoleg2/bopa_mono
cd bopa_mono
npm i
npm run ci
npm run run
```

Other useful commands:
```bash
npm run clean
npm run ls-workspaces
npm -w bopac run check
npm -w bopac run build
npm -w bopa-ui run dev
```

Prerequisite
------------

- [node](https://nodejs.org) version 24.0.0 or higher
- [npm](https://docs.npmjs.com/cli/v11/commands/npm) version 12.0.0 or higher


Publish a new release
---------------------

```bash
npm run versions
git commit -am 'increment sub versions'
npm version patch
git push
git push origin v1.2.3
```


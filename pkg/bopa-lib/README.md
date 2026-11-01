bopa-lib
========


Presentation
------------

The package *bopa-lib* contains some recipes of boilerplate and the code to use them.


Recipe
------

A recipe is a file that describes how to create a boilerplate. There are two kinds of recipes:

- json recipes
- javascript recipes


Json recipes
............

It contains:
- a list of parameters with name, default value and description
- a list of URL-sources, from where the files must be dowloaded
- for each URL-sources, the list of files to be downloaded
- a list of additional directory to be created
- a list of last messsages to be displayed

Json recipes supports:
- string-replacement in file-path
- string-replacement in file-content

Json recipes doesn't support:
- file permission modification
- complex or selective file-path modification
- complex or selective file-content modification


Javascript recipes
..................

It contains:
- a list of parameters with name, default value and description
- a function with this list of parameters as argument that generate the boilerplate

Because this javascript is dynamically imported, there is some security concerns.


Getting started
---------------

```bash
git clone https://github.com/charlyoleg2/bopa_mono
cd bopa_mono
npm -w bopa-lib install
npm -w bopa-lib run ci
```

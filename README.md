#baltimore-unrest

Baltimore unrest video

##Development

The requirements for this project are Node.js, Bower and Grunt. 

To install node with Hombrew:
`brew install node`

Or head over to the [Node website](http://nodejs.org/) and install from there.
Once Node is installed, install Grunt with
`npm install -g grunt-cli`

and install Bower with 
`npm install -g bower`

Once those dependencies are set up, from this repository run `npm install`, then run `grunt`

##Data tools

To use the data tools, set up your Python environment (virtualenv reccomended).

To update this projects content automatically, make sure you have USA TODAY's google credentials stored as environment variables. 

Install python dependencies with 
```
pip install -r requirements.txt
```

Then run

```
fab updater
```

This will download a new copy of the project spreadsheet.





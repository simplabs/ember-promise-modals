'use strict';

const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const broccoliPostCSS = require('broccoli-postcss');
const PresetEnv = require('postcss-preset-env');

const pkg = require('./package.json');

module.exports = {
  name: require('./package').name,

  treeForAddon() {
    let tree = this._super(...arguments);
    let app = this._findHost();
    let options = typeof app.options === 'object' ? app.options : {};

    let addonConfig = options[pkg.name] || {};

    const addonWithoutStyles = funnel(tree, {
      exclude: ['**/*.css'],
    });

    if (addonConfig.excludeCSS === true) {
      return addonWithoutStyles;
    }

    const addonStyles = funnel(tree, {
      include: ['**/*.css'],
    });

    const processedStyles = broccoliPostCSS(addonStyles, {
      plugins: [
        PresetEnv({
          stage: 3,
          overrideBrowserslist: this.app.project._targets.browsers,
        }),
      ],
    });

    return mergeTrees([addonWithoutStyles, processedStyles]);
  },
};

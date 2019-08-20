import _ from 'lodash';

export * from './converter';
export * from './reduceState';
export * from './stockChart';

export const exchangesExtractor = (EXCHANGES, { onlyTradable = false, onlyImportable = false }) => {
  let exchanges = Object.assign({}, EXCHANGES);

  if (_.isEmpty(exchanges)) return false;

  if (onlyTradable) {
    _.each(exchanges, (e, name) => {
      if (!e.tradable) delete exchanges[name];
    });
  }

  if (onlyImportable) {
    _.each(exchanges, (e, name) => {
      if (!e.importable) delete exchanges[name];
    });
  }

  return exchanges;
}

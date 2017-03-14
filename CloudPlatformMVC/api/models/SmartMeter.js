
/**
 * SmartMeter
 *
 * @module      :: SmartMeter
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 
 */module.exports = {
  attributes: {
    // e.g. 1
    id:{
      type: 'integer'
    },
    // e.g., "Polly"
    name: {
      type: 'string'
    },

    // e.g., 3.26
    power: {
      type: 'float',
      required: true
    },
     // e.g., 3.26
    voltage: {
      type: 'float',
      required: true
    },
     // e.g., 3.26
    current: {
      type: 'float',
      required: true
    },

    // e.g., "cm"
    wingspanUnits: {
      type: 'string',
      enum: ['cm', 'in', 'm', 'mm'],
      defaultsTo: 'cm'
    },

    // e.g., [{...}, {...}, ...]
    knownDialects: {
      collection: 'Dialect'
    }
  }
}
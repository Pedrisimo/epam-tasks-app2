"use strict";
module.exports = [
    {
        pattern: '/form',
        methods: ['GET'],
        action: 'form::getAction'
    },
    {
        pattern: '/items',
        methods: ['POST'],
        action: 'items::postAction'
    },
    {
        pattern: '/items',
        methods: ['DELETE'],
        action: 'items::deleteAllAction'
    },
    {
        pattern: '/items',
        methods: ['GET'],
        action: 'items::getAction'
    },
    {
      pattern: '/templates/script/.*',
      methods: ['GET'],
      action: 'script::getScript'
    },
    {
      pattern: '/templates/css/.*',
      methods: ['GET'],
      action: 'styles::getStyles'
    }
];

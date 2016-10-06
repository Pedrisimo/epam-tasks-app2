"use strict";
module.exports = [
    {
        pattern: '/',
        methods: ['GET'],
        action: 'onform::getForm'
    },
        {
        pattern: '/form',
        methods: ['GET'],
        action: 'onform::getForm'
    },
    {
        pattern: '/items',
        methods: ['POST'],
        action: 'actions::postData'
    },
    {
        pattern: '/items',
        methods: ['DELETE'],
        action: 'actions::rmData'
    },
    {
        pattern: '/items',
        methods: ['GET'],
        action: 'actions::getData'
    },
    {
      pattern: '/app/.*',
      methods: ['GET'],
      action: 'public::getPublic'
    }
];

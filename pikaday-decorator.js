(function() {
    'use strict';

    var
        /**
         * Load script
         *
         * @param {String} url
         * @param {Function} [successCallback=undefined] successCallback
         * @param {Function} [errorCallback=undefined] errorCallback
         */
        load = function (url, successCallback, errorCallback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    eval(xhr.responseText);
                    if (successCallback) successCallback(xhr.responseText);
                } else {
                    if (errorCallback) errorCallback(xhr.responseText);
                }
            };

            xhr.open('GET', url, true);
            xhr.send();
        },

        /**
         * Load localisation file
         * @param {pikadayDecorator} pikadayInput
         * @param {Function} [callback=undefined] callback
         */
        loadI18n = function(pikadayInput, callback) {
            var dirname = document.location.pathname.replace(/\/[^\/]*$/,'');
            var filename = dirname + '/pikaday.'+pikadayInput.locale+'.js';

            load(filename, callback, function() {
                //load i18n file if not working try to load with the language (en) instead of locale (en_US)
                if ((new RegExp('_')).test(pikadayInput.locale)) {
                    load(dirname + '/pikaday.'+pikadayInput.locale.split('_')[0]+'.js', callback);
                }
            });
        },

        /**
         * Default locale for pikaday
         * @type {{previousMonth: string, nextMonth: string, months: string[], weekdays: string[], weekdaysShort: string[]}}
         */
        i18n = null
    ;

    window.pikadayDecorator = {
        /**
         * Default locale
         */
        locale: 'en',

        /**
         * Date format
         */
        format: 'YYYY-MM-DD',

        /**
         * For options
         * @see https://github.com/dbushell/Pikaday#user-content-configuration
         */
        position: 'bottom left',
        reposition: true,
        container: undefined,
        'default-date': undefined,
        'set-default-date': false,
        'first-day': 0,
        'min-date': false,
        'max-date': false,
        'year-range': false,
        'show-week-number': false,
        rtl: false,
        'year-suffix': '',
        'show-month-after-year': false,
        'number-of-months': 1,
        'main-calendar': 'left',
        'on-select': null,
        'on-open': null,
        'on-close': null,
        'on-draw': null,

        /**
         * input in the Light DOM (distributed node)
         */
        instance: null,

        /**
         * Constructor
         *
         * Not implementing isRTL (use <html dir="rtl"> instead)
         */
        ready: function() {
            var that = this,
                input = this.querySelector('input'),
                trigger = this.querySelector('[pikaday-decorator-trigger]'),
                opts = {
                    field: input,
                    position: this.position,
                    repository: this.reposition,
                    container: document.querySelector(this.container),
                    format: this.format,
                    defaultDate: this['default-date'],
                    setDefaultDate: this['set-default-date'] !== false,
                    firstDay: this['first-day'],
                    minDate: this['min-date'],
                    maxDate: this['max-date'],
                    yearRange: this['year-range'],
                    showWeekNumber: this['show-week-number'],
                    rtl: this.rtl !== false,
                    yearSuffix: this['year-suffix'],
                    showMonthAfterYear: this['show-month-after-year'],
                    numberOfMonths: this['number-of-months'],
                    mainCalendar: this['main-calendar'],
                    onSelect: this['on-select'],
                    onOpen: this['on-open'],
                    onClose: this['on-close'],
                    onDraw: this['on-draw']
                }
            ;

            if (trigger) {
                opts.trigger = trigger;
            }

            this.instance = new Pikaday(opts);

            //dirty load i18n because, i can't achieve to tests when i instanciate asynchronously
            loadI18n(this, function() {
                that.instance._o.i18n = i18n;
            });
        }
    }
}());
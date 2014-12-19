(function() {
    'use strict';

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
            var input = this.querySelector('input'),
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

            if (this.locale !== 'en') {
                opts.i18n = PikadayDecorator.i18n[this.locale];
            }

            if (trigger) {
                opts.trigger = trigger;
            }

            this.instance = new Pikaday(opts);
        }
    }
}());
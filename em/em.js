const
    _ = require('underscore'),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    twig = require('twig').twig,
    fs = require('fs'),
    path = require('path');

module.exports = function(app, em) {
    return (em = {
        sendPassword: function(user, password) {
            em.send({
                to: user.email,
                subject: 'Password retoration',
                template: path.join(__dirname, '../app/views/mail-user-password.twig')
            });
        },
        send: function(opts, data) {
            if (!(opts && opts.to && opts.template))
                return console.error('Email error no destination or template');

            fs.readFile(opts.template, function(err, template) {
                if (err)
                    return console.error('Email error template doesn\'t exists');

                var cfg = em.config(),
                    mopts = _.extend({
                        from: '<mail.notifier@noreply.com>',
                        to: '',
                        subject: 'Empty Subject',
                        text: '',
                        html: twig({
                            data: template
                        }).render(data || {})
                    }, opts);

                nodemailer.createTransport(smtpTransport(cfg)).sendMail(mopts, function(err, info) {
                    if (err)
                        return console.error(err);
                    console.info('Message sent: ' + info.response);
                });
            });
        },
        config: function() {
            return app.cfg.get('$.em')[0];
        }
    });
}

define([], function() {
    return function($translateProvider) {

        $translateProvider.translations('en', {
            WELCOME_TO_PIO: 'Welcome to PIO',
            SIGN_IN: 'Sign in',
            SIGN_UP: 'Sign up',
            FORGOT_PASSWORD: 'Forgot password?',
            DO_NOT_HAVE_AN_ACCOUNT: 'Do not have an account?',
            CREATE_AN_ACCOUNT: 'Create an account'
        });

        $translateProvider.translations('de', {
            WELCOME_TO_PIO: 'Bienvenido a PIO',
            SIGN_IN: 'Acceder',
            SIGN_UP: 'Registro',
            FORGOT_PASSWORD: '¿Olvidó la contraseña?',
            DO_NOT_HAVE_AN_ACCOUNT: '¿No tiene una cuenta?',
            CREATE_AN_ACCOUNT: 'Crear un acuenta'
        });

        $translateProvider.useSanitizeValueStrategy('sanitize');

        $translateProvider.preferredLanguage('es');
    };
});

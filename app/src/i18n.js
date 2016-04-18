define([], function() {
    return function($translateProvider) {

        $translateProvider.translations('en', {
            WELCOME_TO_PIO: 'Welcome to PIO',
            SIGN_IN: 'Sign in',
            SIGN_UP: 'Sign up',
            SIGN_OUT: 'Sign out',
            FORGOT_PASSWORD: 'Forgot password?',
            DO_NOT_HAVE_AN_ACCOUNT: 'Do not have an account?',
            CREATE_AN_ACCOUNT: 'Create an account',
            POLLS: 'Polls',
            ADMINISTRATION: 'Administration',
            TITLE: 'Title',
            USERS: 'Users',
            CREATE: 'Create',
            DASHBOARD: 'Dashboard',
            DETAILS: 'Details',
            DETAIL: 'Detail',
            CREATE_POLL: 'Create poll',
            CREATE_USER: 'Create user',
            POLL_DETAILS: 'Poll details',
            USER_DETAILS: 'User details',
            TAGS: 'Tags',
            SUMMARY: 'Summary',
            STATUS: 'Status',
            NAME: 'Name',
            AVATAR: 'Avatar'
        });

        $translateProvider.translations('es', {
            WELCOME_TO_PIO: 'Bienvenido a PIO',
            SIGN_IN: 'Acceder',
            SIGN_UP: 'Registro',
            SIGN_OUT: 'Salir',
            FORGOT_PASSWORD: '¿Olvidó la contraseña?',
            DO_NOT_HAVE_AN_ACCOUNT: '¿No tiene una cuenta?',
            CREATE_AN_ACCOUNT: 'Crear un acuenta',
            POLLS: 'Encuestas',
            ADMINISTRATION: 'Administración',
            TITLE: 'Título',
            USERS: 'Usuarios',
            CREATE: 'Crear',
            DASHBOARD: 'Panel',
            DETAILS: 'Detalles',
            DETAIL: 'Detalle',
            CREATE_POLL: 'Crear encuesta',
            CREATE_USER: 'Crear usuario',
            POLL_DETAILS: 'Detalles de encuesta',
            USER_DETAILS: 'Detalles de usuario',
            TAGS: 'Etiquetas',
            SUMMARY: 'Resumen',
            STATUS: 'Estado',
            NAME: 'Nombre',
            AVATAR: 'Avatar'
        });

        $translateProvider.useSanitizeValueStrategy('escapeParameters');

        $translateProvider.preferredLanguage('es');
    };
});

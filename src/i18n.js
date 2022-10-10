import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en : {
            translations : {
                'Sign Up' : 'Sign Up',
                'Password mismatch' : 'Password mismatch',
                Username: 'Username',
                'Display Name' : 'Display Name',
                Password: 'Password',
                'Password Repeat' : 'Password Repeat',
                Login: 'Login '
               
            }
        },
        tr: {
            translations : {
                'Sign Up' : 'Kayit Ol',
                'Password mismatch' : 'Ayni Şifreyi Giriniz',
                Username: 'Kullanici Adi',
                'Display Name' : 'Tercih Edilen İsim',
                Password: 'Sifre',
                'Password Repeat' : 'Sifre Tekrarı',
                Login: 'Sisteme Gir '
                
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolations: {
        escapeValue: false,
        formatSeperator: ','    
    },
    react: {
        wait: true
    }
});
export default i18n; 

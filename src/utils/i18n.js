import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            "info_header": "Hi, it's start page of Quiz App",
            "info_subheader": "Let's start our quiz.",

            "about_header": "About QUIZZI",
            "about_text": "Welcome to Quizzi App! This is a fun and interactive platform where you can challenge your knowledge\n" +
                "                    on various topics through quizzes. Whether you want to test yourself or compete with friends, Quizzi\n" +
                "                    is the perfect place to learn and enjoy!",
            "about_features_header": "Key features:",
            "about_features": ["Variety of quizzes across different categories",
                "Customizable tests for companies, tailored to specific needs",
                "Detailed analytics and statistics for monitoring progress and improving performance",
                "Personalized quizzes based on user interests and organizational goals"],

            "info_cards_button": "More info"
        }
    },
    ua: {
        translation: {
            "info_header": "Привіт, це початкова сторінка програми Quiz",
            "info_subheader": "Давайте почнемо нашу вікторину.",

            "about_header": "Про QUIZZI",
            "about_text": "Ласкаво просимо в додаток Quizzi! Це весела та інтерактивна платформа, де ви можете перевірити свої знання\n" +
                "                    на різні теми через вікторини. Якщо ви хочете перевірити себе чи позмагатися з друзями, Quizzi\n" +
                "                    це ідеальне місце для навчання та насолоди!",
            "about_features_header": "Основні переваги",
            "about_features": ["Різномаїття вікторин у різних категоріях",
                "Кастомізовані тести для компаній, адаптовані до конкретних потреб",
                "Детальна аналітика та статистика для моніторингу прогресу та покращення продуктивності",
                "Персоналізовані тести на основі інтересів користувачів і цілей організації"],

            "info_cards_button": "Детальніше"
        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false
    },
    returnObjects: true,
});

export default i18n;
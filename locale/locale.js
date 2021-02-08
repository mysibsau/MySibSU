
export const translations = {
  en: { timetable: 'Timetable', 
        menu: 'Menu',
        events: 'Events',
        services: 'Services',
        profile: 'Profile',
        week: 'week',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
        today: 'today',
        personal_account: 'Personal account',
        buildings: 'Buildings',
        student_life: 'Student life',
        institutes: 'Institutes',
        online_catalog: 'Online catalog',
        feedback: 'Feedback',
        educational_facilities_r: 'Educational facilities (right coast)',
        educational_facilities_l: 'Educational facilities (left coast)',
        input_group_name: 'Enter the group/teacher/place..',
        no_menu: 'There is no menu for today',
        settings: 'Settings',
        choose_lang: 'Select a language',
        choose_theme: 'Select a theme',
        dark_theme: 'Dark',
        light_theme: 'Light',
        default: 'Default',
        dish: 'Dish',
        weight: 'Weight',
        price: 'Price',
        call: "Call",
        group_vk: 'VK group',
        join: 'Join',
        description: 'Description',
        director: 'Director',
        write_email: 'Write an email',
        departments: 'DEPARTMENTS',
        chairperson: 'Chairperson',
        address: 'Address',
        head: 'Head',
        phone: 'Phone',
        email: 'Email',
        read_more: '[Read more]',
        hide: '[Hide]',
        last_groups: 'Last',
        no_classes: 'There are no classes',
        lecture: 'Lecture',
        laboratory_work: 'Laboratory work',
        practice: 'Practice',
        first_subgroup: '[1st subgroup]',
        second_subgroup: '[2nd subgroup]',
        news: 'News',
        feed: 'Feed',
        groups: 'Groups',
        professors: 'Professors',
        places: 'Places',
        ask: 'Ask another question',
        send: 'Send',
        input_question: 'Enter your question...',
        unions: 'Unions',
        sport: 'Sport',
        sdo: 'SDO',
        active_head: 'Head',
        training_days: 'Training days',
        vacancies: 'Vacancies',
        },
  ru: { timetable: 'Расписание', 
        menu: 'Меню',
        events: 'События',
        services: 'Сервисы',
        profile: 'Профиль',
        week: 'неделя',
        monday: 'Понедельник',
        tuesday: 'Вторник',
        wednesday: 'Среда',
        thursday: 'Четверг',
        friday: 'Пятница',
        saturday: 'Суббота',
        sunday: 'Воскресенье',
        today: 'сегодня',
        personal_account: 'Личный кабинет',
        buildings: 'Корпуса',
        student_life: 'Студенческая жизнь',
        institutes: 'Институты',
        online_catalog: 'Интернет-\nкаталог',
        feedback: 'Обратная связь',
        educational_facilities_r: 'Учебные объекты (правый берег)',
        educational_facilities_l: 'Учебные объекты (левый берег)',
        input_group_name: 'Введите группу/преподавателя/кабинет..',
        no_menu: 'Меню на сегодня нет',
        settings: 'Настройки',
        choose_lang: 'Выбрать язык',
        choose_theme: 'Выбрать тему',
        dark_theme: 'Тёмная',
        light_theme: 'Светлая',
        default: 'По умолчанию',
        dish: 'Блюдо',
        weight: 'Вес',
        price: 'Цена',
        call: "Позвонить",
        group_vk: 'Группа ВК',
        join: 'Присоединиться',
        description: 'Описание',
        director: 'Директор',
        write_email: 'Написать письмо',
        departments: 'Кафедры',
        chairperson: 'Председатель',
        address: 'Адрес',
        head: 'Зав. кафедрой',
        phone: 'Телефон',
        email: 'Email',
        read_more: '[Читать далее]',
        hide: '[Свернуть]',
        last_groups: 'Последние',
        no_classes: 'Занятий нет',
        lecture: 'Лекция',
        laboratory_work: 'Лабораторная работа',
        practice: 'Практика',
        first_subgroup: '[1 подгруппа]',
        second_subgroup: '[2 подгруппа]',
        news: 'Новости',
        feed: 'Лента',
        groups: 'Группы',
        professors: 'Преподаватели',
        places: 'Кабинеты',
        ask: 'Задать другой вопрос',
        send: 'Отправить',
        input_question: 'Введите свой вопрос...',
        unions: 'Объединения',
        sport: 'Спорт',
        sdo: 'СКБ',
        active_head: 'Руководитель',
        training_days: 'Дни тренировок',
        vacancies: 'Вакансии'},
};
// Set the locale once at the beginning of your app.

export const getLocale = (mode) => {
    let Locale = {}
    for (let key in translations[mode]){
        Locale[key] = translations[mode][key]
    }
    
    return Locale
}

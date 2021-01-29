
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
        today: 'today',
        personal_account: 'Personal account',
        buildings: 'Buildings',
        student_life: 'Student life',
        institutes: 'Institutes',
        online_catalog: 'Online catalog',
        feedback: 'Feedback',
        educational_facilities_r: 'Educational facilities (right coast)',
        educational_facilities_l: 'Educational facilities (left coast)',
        input_group_name: 'Enter the group name..',
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
        today: 'сегодня',
        personal_account: 'Личный кабинет',
        buildings: 'Корпуса',
        student_life: 'Студенческая жизнь',
        institutes: 'Институты',
        online_catalog: 'Интернет-каталог',
        feedback: 'Обратная связь',
        educational_facilities_r: 'Учебные объекты (правый берег)',
        educational_facilities_l: 'Учебные объекты (левый берег)',
        input_group_name: 'Введите название группы..',
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
        email: 'Email',},
};
// Set the locale once at the beginning of your app.

export const getLocale = (mode) => {
    let Locale = {}
    for (let key in translations[mode]){
        Locale[key] = translations[mode][key]
    }
    
    return Locale
}
// "База данных"
const ponies = [
    {
        id: 1,
        name: "Пинки пай",
        type: "Пони",
        description: "Она крутая",
        price: "невозможно оценить"
    },
    {
        id: 2,
        name: "Рэйнбоу Деш",
        type: "Пони",
        description: "Быстрая как молния",
        price: "невозможно оценить"
    },
    {
        id: 3,
        name: "Флаттершай",
        type: "Пони",
        description: "Добрая и ласковая",
        price: "невозможно оценить"
    },
    {
        id: 4,
        name: "Эпплджек",
        type: "Пони",
        description: "Трудолюбивая лошадка",
        price: "невозможно оценить"
    }
];

// имитация задержки сервера
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPoniesApi = async () => {
    await delay(500);
    return ponies;
};

export const fetchPonyByIdApi = async (id) => {
    await delay(300);
    return ponies.find(pony => pony.id === Number(id));
};

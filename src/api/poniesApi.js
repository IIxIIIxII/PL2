// "База данных" - сделаем изменяемой
let ponies = [
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

// 📃 Получить всех пони
export const fetchPoniesApi = async () => {
    await delay(500);
    return [...ponies]; // Возвращаем копию массива
};

// 🔍 Получить одного пони по id
export const fetchPonyByIdApi = async (id) => {
    await delay(300);
    const pony = ponies.find(p => p.id === Number(id));
    return pony ? { ...pony } : null; // Возвращаем копию или null
};

// ➕ Создать пони
export const createPonyApi = async (pony) => {
    await delay(500);
    const newPony = { ...pony, id: Number(pony.id) };
    ponies.push(newPony);
    return { ...newPony };
};

// ✏️ Обновить пони
export const updatePonyApi = async (pony) => {
    await delay(500);
    const index = ponies.findIndex(p => p.id === Number(pony.id));
    if (index !== -1) {
        ponies[index] = { ...pony };
        return { ...ponies[index] };
    }
    return null;
};

// ❌ Удалить пони
export const deletePonyApi = async (id) => {
    await delay(500);
    ponies = ponies.filter(p => p.id !== Number(id));
    return id;
};
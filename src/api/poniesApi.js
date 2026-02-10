// API: load JSON from public/data/contents.json and simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const loadContents = async () => {
    const res = await fetch('/data/contents.json');
    if (!res.ok) throw new Error('Не удалось загрузить данные');
    return await res.json();
};

export const fetchContents = async () => {
    await delay(300);
    return await loadContents();
};

export const fetchPoniesApi = async () => {
    await delay(500);
    const data = await loadContents();
    return data.ponies || [];
};

export const fetchPonyByIdApi = async (id) => {
    await delay(300);
    const data = await loadContents();
    return (data.ponies || []).find((pony) => pony.id === Number(id));
};

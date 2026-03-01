// API: load JSON from public/data/contents.json, simulate network delay,
// and provide simple in-browser CRUD using localStorage as backing store.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_KEY = 'poniesData';

const loadContents = async () => {
    const res = await fetch('/data/contents.json');
    if (!res.ok) throw new Error('Не удалось загрузить данные');
    return await res.json();
};

const getStoredPonies = async () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    const data = await loadContents();
    const initial = data.ponies || [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
};

const savePonies = (ponies) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ponies));
};

export const fetchContents = async () => {
    await delay(300);
    return await loadContents();
};

export const fetchPoniesApi = async () => {
    await delay(500);
    return await getStoredPonies();
};

export const fetchPonyByIdApi = async (id) => {
    await delay(300);
    const ponies = await getStoredPonies();
    return ponies.find((pony) => pony.id === Number(id));
};

export const createPonyApi = async (pony) => {
    await delay(300);
    const ponies = await getStoredPonies();
    const maxId = ponies.reduce((acc, p) => Math.max(acc, Number(p.id || 0)), 0);
    const newPony = { ...pony, id: maxId + 1 };
    const next = [...ponies, newPony];
    savePonies(next);
    return newPony;
};

export const updatePonyApi = async (id, updates) => {
    await delay(300);
    const ponies = await getStoredPonies();
    const next = ponies.map((p) => (Number(p.id) === Number(id) ? { ...p, ...updates, id: Number(id) } : p));
    savePonies(next);
    return next.find((p) => Number(p.id) === Number(id));
};

export const deletePonyApi = async (id) => {
    await delay(200);
    const ponies = await getStoredPonies();
    const next = ponies.filter((p) => Number(p.id) !== Number(id));
    savePonies(next);
    return Number(id);
};

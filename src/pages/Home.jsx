import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { fetchContents } from "../api/poniesApi";

const Home = () => {
    const theme = useSelector((state) => state.ui.theme);
    const [contents, setContents] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchContents()
            .then((data) => {
                if (mounted) setContents(data);
            })
            .catch((err) => {
                if (mounted) setError(err.message || "Ошибка загрузки");
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) return <main className="home container"><p>Загрузка данных...</p></main>;
    if (error) return <main className="home container"><p>Ошибка: {error}</p></main>;

    const { ponies = [], articles = [], products = [] } = contents || {};

    return (
        <main className="home container">
            <h2>Главная страница</h2>

            <section>
                <h3>Пони (список)</h3>
                <ul>
                    {ponies.map((pony) => (
                        <li key={pony.id}>
                            <button onClick={() => navigate(`/ponies/${pony.id}`)}>{pony.name}</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Статьи</h3>
                <ul>
                    {articles.map((a) => (
                        <li key={a.id}>
                            <strong>{a.title}</strong> — {a.summary}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Товары</h3>
                <ul>
                    {products.map((p) => (
                        <li key={p.id}>{p.name} — {p.price}</li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Home;
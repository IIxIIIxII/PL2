import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPonies, createPony, deletePony } 
from "../features/ponies/poniesSlice";
import { useNavigate } from "react-router-dom";

const PonyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status, error } = useSelector(state => state.ponies);

  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    price: ""
  });

  useEffect(() => {
    dispatch(fetchPonies());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPony({
      id: Date.now(),
      name: form.name,
      type: form.type,
      description: form.description,
      price: form.price
    }));

    setForm({
      name: "",
      type: "",
      description: "",
      price: ""
    });
  };

  if (status === "loading") return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container">
      <h2>Пони</h2>

      <h3>Добавить пони</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Название"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="type"
          placeholder="Тип"
          value={form.type}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Описание"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Цена"
          value={form.price}
          onChange={handleChange}
        />

        <button type="submit">Добавить</button>
      </form>

      <ul>
        {items.map(inst => (
          <li key={inst.id}>
            <button onClick={() => navigate(`/ponies/${inst.id}`)}>
              {inst.name}
            </button>

            <button onClick={() => dispatch(deletePony(inst.id))}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PonyList;
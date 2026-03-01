import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPonies, createPony, deletePony } from "../features/ponies/poniesSlice";
import { useNavigate } from "react-router-dom";

const PonyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector(state => state.ponies);

  const [form, setForm] = useState({ name: '', type: '', description: '', price: '' });

  useEffect(() => {
    dispatch(fetchPonies());
  }, [dispatch]);

  if (status === "loading") return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container">
      <h2>Пони</h2>
      <div style={{marginBottom:20}}>
        <h3>Добавить пони</h3>
        <input placeholder="Имя" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input placeholder="Тип" value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} />
        <input placeholder="Описание" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
        <input placeholder="Цена" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} />
        <button onClick={async ()=>{
          if(!form.name) return;
          await dispatch(createPony({...form, price: form.price}));
          setForm({ name: '', type: '', description: '', price: '' });
        }}>Добавить</button>
      </div>
      <ul>
        {items.map(pony => (
          <li key={pony.id}>
            <button onClick={() => navigate(`/ponies/${pony.id}`)}>
              {pony.name}
            </button>
            <button style={{marginLeft:8}} onClick={async ()=>{ await dispatch(deletePony(pony.id)); }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PonyList;

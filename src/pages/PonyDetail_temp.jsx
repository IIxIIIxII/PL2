import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPonyById, clearSelectedPony, updatePony, deletePony } from "../features/ponies/poniesSlice";

const PonyDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedPony, status } = useSelector(state => state.ponies);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', type: '', description: '', price: '' });

  useEffect(() => {
    dispatch(fetchPonyById(id));
  }, [dispatch, id]);

  useEffect(()=>{
    if(selectedPony){
      setForm({ name: selectedPony.name||'', type: selectedPony.type||'', description: selectedPony.description||'', price: selectedPony.price||'' });
    }
  },[selectedPony]);

  if (status === "loading") return <p>Загрузка пони...</p>;
  if (!selectedPony) return null;

  return (
    <div className="container">
      <button
        onClick={() => {
          dispatch(clearSelectedPony());
          navigate("/ponies");
        }}
      >
        ← Назад
      </button>

      <h2>{selectedPony.name}</h2>
      {!editing ? (
        <>
          <p><b>Тип:</b> {selectedPony.type}</p>
          <p><b>Описание:</b> {selectedPony.description}</p>
          <p><b>Цена:</b> {selectedPony.price}</p>
        </>
      ) : (
        <div>
          <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
          <input value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} />
          <input value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
          <input value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} />
        </div>
      )}

      <div style={{marginTop:12}}>
        <button onClick={async ()=>{
          if(editing){
            await dispatch(updatePony({ id, updates: form }));
            setEditing(false);
          } else {
            setEditing(true);
          }
        }}>{editing ? 'Сохранить' : 'Редактировать'}</button>

        <button style={{marginLeft:8}} onClick={async ()=>{
          await dispatch(deletePony(id));
          dispatch(clearSelectedPony());
          navigate('/ponies');
        }}>Удалить</button>
      </div>
    </div>
  );
};

export default PonyDetail;

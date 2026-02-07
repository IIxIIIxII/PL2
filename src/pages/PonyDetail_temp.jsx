import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPonyById, clearSelectedPony } from "../features/ponies/poniesSlice";

const PonyDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedPony, status } = useSelector(state => state.ponies);

  useEffect(() => {
    dispatch(fetchPonyById(id));
  }, [dispatch, id]);

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
      <p><b>Тип:</b> {selectedPony.type}</p>
      <p><b>Описание:</b> {selectedPony.description}</p>
      <p><b>Цена:</b> {selectedPony.price}</p>
    </div>
  );
};

export default PonyDetail;

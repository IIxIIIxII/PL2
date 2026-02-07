import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPonies } from "../features/ponies/poniesSlice";
import { useNavigate } from "react-router-dom";

const PonyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector(state => state.ponies);

  useEffect(() => {
    dispatch(fetchPonies());
  }, [dispatch]);

  if (status === "loading") return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container">
      <h2>Пони</h2>
      <ul>
        {items.map(pony => (
          <li key={pony.id}>
            <button onClick={() => navigate(`/ponies/${pony.id}`)}>
              {pony.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PonyList;

import React, { useState, useEffect } from "react";
import { axios } from "../../axiosConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/profile");
        console.log(data)
        setUser(data.user);
        setName(data.user.name);
        setEmail(data.user.email);
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar el perfil.", "error");
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if(name === '' || email === '' || password === '' || confirmPassword === ''){
      Swal.fire("Falta completar campos", "Debes completar todos los campos para continuar.", "error");
    } else{
      try {
        Swal.fire({
          title: "Cargando...",
          text: "Por favor espera",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });
  
        const response = await axios.post("/api/profile-update", {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        });
        console.log(response)
        setUser(response.data.user);
        Swal.fire("Éxito", "Perfil actualizado correctamente.", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar el perfil.", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="ml-4 mt-4 w-full flex justify-start mb-6">
          <button
              className="bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400"
              onClick={() => navigate('/products')}
          >
              Atrás
          </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      <div className="mb-4">
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Correo electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Nueva contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Confirmar nueva contraseña:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border px-4 py-2 w-full"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
      >
        Actualizar perfil
      </button>
    </div>
  );
};

export default Profile;
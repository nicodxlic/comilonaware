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

  const fetchProfile = async () => {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })
    try {
      const { data } = await axios.get("/api/profile");
      setUser(data.user);
      setName(data.user.name);
      setEmail(data.user.email);
    } catch (error) {
      Swal.fire("Error", "No se pudo cargar el perfil.", "error");
    }
    Swal.close()
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if(name === '' || email === '' || password === '' || confirmPassword === ''){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes completar todos los campos para continuar.'
      })
      return
    } else if (password != confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.'
      })
      return
    }
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
        setUser(response.data.user);
        Swal.fire("Éxito", "Perfil actualizado correctamente.", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar el perfil.", "error");
      }
  };

  return (
    <div className="p-4">
      <div className="ml-4 mt-4 w-full flex justify-start mb-6">
          <button
              className="bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400"
              onClick={() => navigate('/')}>
              Atrás
          </button>
      </div>
      <div className="relative max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl border-4 border-double shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Perfil de Usuario</h1>
      
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-xl font-bold mb-2">
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 text-xl font-bold mb-2">
            Correo electrónico:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 text-xl font-bold mb-2">
            Nueva contraseña:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 text-xl font-bold mb-2">
            Confirmar nueva contraseña:
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Actualizar perfil
        </button>
      </form>
    </div>
    </div>
  );
};

export default Profile;
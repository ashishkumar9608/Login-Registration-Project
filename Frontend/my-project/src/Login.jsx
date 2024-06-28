import { useState } from 'react';
import App from './App';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://localhost:8080/api/v1/login";

    const formData = {
      email,
      password
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        window.location.href = 'https://www.google.com';
      } else {
        console.error('Registration failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-3xl font-bold mb-6 text-center">
          Login
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Enter your Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

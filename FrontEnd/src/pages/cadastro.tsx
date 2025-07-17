import { useState } from 'react';

export default function Cadastro() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        endereco: '',
        email: '',
        senha: '',
        tipo: 'ADOTANTE',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try
        {
            const response = await fetch('http://localhost:3000/usuarios/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            
            if(response.ok)
            {
                alert('Cadastro realizado com sucesso.');
                window.location.href = '/'; //voltando para tela de login
            }
            else
                alert(data.message || 'Erro ao cadastrar usuário.');
        }
        catch(error)
        {
            console.error('Erro ao cadastrar: ',error);
            alert('Erro ao conectar com seridor.');
        }
    };
    return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
        <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" onChange={handleChange} required />
        <input type="text" name="endereco" placeholder="Endereço" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="senha" placeholder="Senha" onChange={handleChange} required />

        <select name="tipo" onChange={handleChange} value={formData.tipo}>
          <option value="ADOTANTE">Adotante</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
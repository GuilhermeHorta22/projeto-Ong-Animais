import '../style/adminPage.css';

export default function AdminLayout() {
  const animals = [
    {
      id: 1,
      nome: 'Bob',
      idade: '2 anos',
      imagem: 'https://placekitten.com/200/200',
      status: 'Disponível',
    },
    {
      id: 2,
      nome: 'Luna',
      idade: '1 ano',
      imagem: 'https://place-puppy.com/200x200',
      status: 'Disponível',
    },
  ];

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Administração</h2>
        <ul>
          <li>Gerenciar animais</li>
          <li>Gerenciar adotantes</li>
          <li>Registrar adoções</li>
          <li>Relatórios</li>
        </ul>
      </aside>

      <main className="main-content">
        <h1>Animais Cadastrados</h1>
        <div className="animal-grid">
          {animals.map((animal) => (
            <div className="animal-card" key={animal.id}>
              <img src={animal.imagem} alt={animal.nome} />
              <h3>{animal.nome}</h3>
              <p>Idade: {animal.idade}</p>
              <p>Status: {animal.status}</p>
              <div className="button-group">
                <button className="edit-button">Editar</button>
                <button className="adopt-button">Registrar Adoção</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

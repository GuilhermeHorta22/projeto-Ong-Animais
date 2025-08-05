import '../style/adminPage.css';

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Administração</h2>
        <ul>
          <li>Gerencia animais e adotantes</li>
          <li>Registra adoções</li>
          <li>Visualiza relatórios e histórico</li>
        </ul>
      </aside>

      <main className="main-content">
        <h1>Animais Cadastrados</h1>
        {/* Aqui você pode renderizar os animais */}
        <div className="animal-box">
          <p>🐶 Nome: Bob</p>
          <p>Idade: 2 anos</p>
        </div>
        <div className="animal-box">
          <p>🐱 Nome: Luna</p>
          <p>Idade: 1 ano</p>
        </div>
      </main>
    </div>
  );
}

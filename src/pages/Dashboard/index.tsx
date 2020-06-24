import React, { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";

import { FiChevronRight } from "react-icons/fi";
import { Title, Form, Repositories, Error } from "./styles";
import logoImg from "../../assets/logo.svg";

import api from "../../services/api";

interface Repository {
  // só precisa criar tipagem do que for usar
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const [repositories, setRepositores] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem("@GitHub: repositories");

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  /** armazenar os dados no navegador */
  useEffect(() => {
    localStorage.setItem("@GitHub: repositories", JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError("Digite o autor/nome do repositório");
      return;
    }
    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`);

      const repository = response.data;

      setRepositores([...repositories, repository]);
      setNewRepo("");
      setInputError("");
    } catch (err) {
      setInputError("Erro na busca por esse repositório");
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {/* esse trecho quer dizer que se a variável inputError estiver
      preenchida ele irá executar o que vier depois do &&  */}
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;

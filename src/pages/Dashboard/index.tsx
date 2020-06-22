import React from "react";

import { Title, Form } from "./styles";
import logoImg from "../../assets/logo.svg";

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub</Title>
      <Form action="">
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>
    </>
  );
};

export default Dashboard;

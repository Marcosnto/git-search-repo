import React from "react";

import { Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Repository from "../pages/Repository";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      {/* quando a gente poe o + no final indicia que a rota vai
      ser tudo que vier depois do nome */}
      <Route path="/repositories/:repository+" component={Repository} />
    </Switch>
  );
};

export default Router;

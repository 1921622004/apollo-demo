import { HashRouter, Switch, Route } from "dva/router";
import App from "../components/App";

export default () => (
    <HashRouter>
        <Switch>
            <Route path="/" exact componet={App}/>
        </Switch>
    </HashRouter>
)
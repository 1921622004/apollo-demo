import dva from "dva";
import route from "./route";

const app = dva();

app.router(route);

app.start('#stage')
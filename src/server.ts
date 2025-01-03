import express from "express";
import 'dotenv/config'
import "./bot";
import "./app"

const app = express();
const port = process.env.PORT || 3001;
app.use(express.static('static'));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Money tracker bor server")
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

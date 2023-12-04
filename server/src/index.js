const http = require("http");
const PORT = 3001;
const characters = require("./utils/data");
const { stringify } = require("querystring");

http
.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    //* /rickandmorty/character/2
    //* ["rick...", "char..." "2"]
    //* "2"
    if(req.url.includes("/rickandmorty/character")) {
        const id = req.url.split("/").pop();
        const character = characters.find(
            char => char.id === Number(id)
        );
        //console.log(character);
        if(character) {
            return res
            .writeHead(200, { "Content-Type": "application/json" })
            .end(JSON.stringify(character));
        } else {
            return res
            .writeHead(404, { "Content-Type": "application/json" })
            .end(JSON.stringify({message: "Character Not Found"}));
        }
    }
    return res
        .writeHead(404, { "Content-Type": "application/json" })
        .end(JSON.stringify({message: "URL Not Found"}));        
})

.listen(PORT, "127.0.0.1",
    () => (console.log(`Server listening on port ${PORT}`))
);
const express = require('express')
const app = express() 



app.get('/Clientes', (req, res) => {
res.send("Oiii kauy, esta funcionando om sucesso 😁")
})

app.listen(3000, () => {
    console.log("deu bom demais kauy !!!🙌🙌🙌")
})
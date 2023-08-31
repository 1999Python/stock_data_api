const express = require("express")
const cherrio = require('cheerio')
const app = express()
const port = 5353

//variables
const baseUrl = (stock) => `https://finance.yahoo.com/quote/${stock}/history${stock}`

//middleware
app.use(express.json())
app.use(require('cors')())

//routes

app.get('/', (req, res) =>{
res.status(200).send({ message : 'Thank you for trying our API'})
})

app.get('/api/stock', async (req, res) =>{
    const { stock } = req.query

    if (!stock){
        return res.sendStatus(403)
    }

    try{
        const stockDataURL = baseUrl(stock)
        const res = await fetch (stockDataURL)
        const $ = cheerio.load(res)
        console.log($.html())
        res.sendStatus(200)
    }
    catch(err) {
        console.log('THERE WAS AN ERROR', err)
        res.sendStatus(500)
    }

   
})

app.post('/test', (req, res) =>{
    const body = req.body
    const { message } = body
    console.log('This is the message' + message)
    res.sendStatus(200)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))
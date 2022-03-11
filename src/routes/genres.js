const express = require('express')
const router = express.Router()

//Database
const genres = [
    {id: 1, name: "Horror"},
    {id: 2, name: "Comedy"},
    {id: 3, name: "Fantasy"},
    {id: 4, name: "Crime"},
    {id: 5, name: "Drama"},
    {id: 6, name: "Music"},
    {id: 7, name: "Adventure"},
    {id: 8, name: "History"},
    {id: 9, name: "Thriller"},
    {id: 10, name: "Animation"},
    {id: 11, name: "Family"},
    {id: 12, name: "Mystery"},
    {id: 13, name: "Biography"},
    {id: 14, name: "Action"},
    {id: 15, name: "Sci-Fi"},
    {id: 16, name: "War"},
    {id: 17, name: "Western"},
    {id: 18, name: "Sport"},
    {id: 19, name: "Experimental"},
    {id: 20, name: "African"}
]


// Get All genres
router.get('/',(req, res) => {
    res.send(genres)
})

// Get a specific genre
router.get('/:id',(req, res) => {
    const genre = findgenre(parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre not found")
    res.send(genre)
})

// Post a genre
router.post('/', (req,res) => {
    const error = validateInput(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length+1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genre)
})

// Update a genre
router.put('/:id',(req, res) =>{
    const genre = findgenre(parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre not found")

    const error = validateInput(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.send(genre)
})


// Delete a genre
router.delete('/:id',(req, res) =>{
    const genre = findgenre(parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre not found")

    const index = genres.indexOf(genre)
    res.send(genres.splice(index,1))
})

const findgenre = (id) => genres.find(m => m.id === id)
const validateInput = (input) => {
    const schema = { name: Joi.string().min(3).required()}
    const {error} = Joi.validate(input, schema)
    return error
}



module.exports = router
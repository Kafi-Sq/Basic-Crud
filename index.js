const express = require('express')
const app = express()
const path = require('path')
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))

let info = [
    {
        id: uuid(),
        user: 'Hassen Hassen',
        bio: 'Comp Sci Student at St. Cloud State University'
    },
    {
        id: uuid(),
        user: 'Hassen Hassen',
        bio: 'Comp Sci Student at St. Cloud State University'
    },
    {
        id: uuid(),
        user: 'Hassen Hassen',
        bio: 'Comp Sci Student at St. Cloud State University'
    }
]

app.get('/posts', (req, res) => {
    res.render('posts/index', { info })
})

app.get('/posts/new', (req, res) => {
    res.render('posts/new')
})

app.post('/posts', (req, res) => {
    const { user, bio } = req.body
    info.push({ user, bio, id: uuid() })
    res.redirect('/posts')
})


app.get('/posts/:id/edit', (req, res) => {
    const { id } = req.params
    const post = info.find(i => i.id === id)
    res.render('posts/edit', { post })
})

app.patch('/posts/:id', (req, res) => {
    const { id } = req.params
    const newBioText = req.body.bio
    const foundPost = info.find(i => i.id === id)
    foundPost.bio = newBioText
    res.redirect('/posts')
})

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params
    info = info.filter(i => i.id !== id)
    res.redirect('/posts')
})

app.listen(8080, () => {
    console.log('Listening on port: *8080')
})
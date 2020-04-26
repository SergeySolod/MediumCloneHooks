const {Router} = require('express')
const Post = require('../models/Post')
const router = Router()
const config = require('config')
const auth = require('../middleware/auth.middleware')

// router.post('/generate', async (req, res) => {
//     try {
//         const baseUrl = config.get('baseUrl')
//         //from - путь, откуда мы делаем запрос, получаем с frontend
//         const {from} = req.body
//
//
//
//     } catch (e) {
//         res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
//     }
// })

// router.get('/my', async (req, res) => {
//     try {
//         //ждём пока модель Question найдёт все вопросы которые относятся к текущему пользователю
//         const questions = await Question.find({owner: req.user.userId}) // ???
//         res.json(questions)
//     } catch (e) {
//         res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
//     }
// })
//
// router.get('/my/:id', async (req, res) => {
//     try {
//         const question = await Question.findById(req.params.id) // ???
//         res.json(question)
//     } catch (e) {
//         res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
//     }
// })

router.get('/', async (req, res) => {
    try {
        Post.find().then((err, posts) => {
            if (err) {
                res.send(err);
            }
            res.json(posts);
        })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        Post.findById(req.params.id).then((err, post) => {
            if (err) {
                res.send(err);
            }
            res.json(post);
        })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post('/generate', async (req, res) => {
    try {
        const data = req.body;
        const post = new Post({
            title: data.title,
            text: data.text,
        });
        post.save().then(() => {
            res.send({ status: 'The post was saved' })
        })

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.put('/change/:id', async (req, res) => {
    try {
        Post.findByIdAndUpdate(req.params.id, {$set: req.body}, (err) => {
    if (err) {
      res.send(err)
    }
    res.json({ status: 'The post has been changed' })
  })

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router
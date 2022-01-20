const router = require('koa-router')()
const json = require('koa-json')
const {getMovie} = require('../lib/neo4j-driver')
const {getPerson} = require('../lib/neo4j-driver')
const {insertRelation} = require('../lib/neo4j-driver')


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


router.get('/person', async (ctx, next) => {
  const params = ctx.request.query
  console.log(params,"----")
  await getPerson(params.name).then((res) => {
    ctx.body = res;
  }).catch(next);
})

router.get('/movie', async (ctx, next) => {
  const params = ctx.request.query
  console.log(params,"----")
  await getMovie(params.name).then((res) => {
    ctx.body = res;
  }).catch(next);
})

router.post('/insert', async (ctx, next) => {
  const params = ctx.request.body
  const e1 = params.data.split("&")[0].split("=")[1]
  const r = params.data.split("&")[1].split("=")[1]
  const e2 = params.data.split("&")[2].split("=")[1]
  console.log(params,"----")
  console.log(e1,r,e2,"----")
  await insertRelation(e1,r,e2).then((res) => {
    ctx.body = res;
  }).catch(next);
})

module.exports = router

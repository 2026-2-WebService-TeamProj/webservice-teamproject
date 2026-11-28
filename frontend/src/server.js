// @ts-nocheck
import { belongsTo, createServer, Factory, hasMany, Model, RestSerializer } from 'miragejs'
import faker from 'faker'
import { orderBy, isNull, sample, sampleSize } from 'lodash-es'

// 여행 후기 mock 데이터 (13주차: 백엔드 연결 전 화면 확인용)
const travelArticles = [
  {
    region: '제주',
    title: '제주 3박 4일 동쪽 여행 후기',
    description: '성산일출봉 일출부터 우도 자전거까지',
    body:
      '첫날은 성산일출봉에서 일출을 보는 것으로 시작했어요. 새벽 5시에 일어나야 해서 힘들었지만, 정상에서 해가 떠오르는 순간은 정말 잊을 수 없었어요.\n\n' +
      '둘째 날에는 우도에 들어가 전기자전거를 빌려 섬을 한 바퀴 돌았어요. 서빈백사 해변의 물 색이 사진보다 훨씬 예뻤어요.\n\n' +
      '마지막 날은 비자림 숲길을 천천히 걸으며 여행을 마무리했어요.',
  },
  {
    region: '경주',
    title: '경주 당일치기 코스 추천',
    description: '불국사, 황리단길, 동궁과 월지 야경',
    body:
      '아침에 KTX로 신경주역에 도착해서 버스로 불국사부터 들렀어요.\n\n' +
      '점심은 황리단길에서 먹고, 오후에는 대릉원과 첨성대를 걸어서 둘러봤어요. 해 질 무렵 동궁과 월지 야경까지 보면 하루 코스로 딱 좋아요.',
  },
  {
    region: '부산',
    title: '부산 해운대·광안리 1박 2일',
    description: '바다 보면서 걷기 좋은 코스',
    body:
      '해운대 블루라인파크 해변열차를 타고 청사포까지 갔어요. 창밖으로 바다가 계속 보여서 이동 자체가 여행이었어요.\n\n' +
      '저녁에는 광안리로 넘어가 광안대교 야경을 보며 하루를 마무리했어요.',
  },
  {
    region: '강릉',
    title: '강릉 카페거리와 경포호 산책',
    description: '바다 앞 카페에서 보낸 여유로운 하루',
    body:
      '안목해변 카페거리에서 바다를 보며 커피를 마셨어요.\n\n' +
      '오후에는 경포호를 따라 자전거를 탔는데, 호수 둘레가 평평해서 처음 타는 사람도 어렵지 않아요.',
  },
  {
    region: '전주',
    title: '전주 한옥마을 먹방 여행',
    description: '한옥마을 골목과 남부시장 야시장',
    body:
      '한옥마을 골목을 천천히 걸으며 경기전과 전동성당을 둘러봤어요.\n\n' +
      '밤에는 남부시장 야시장에서 이것저것 맛보는 재미가 있었어요.',
  },
]

const authUser = {
  email: 'test@test.com',
  username: 'test-user-1',
}

function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    serializers: {
      application: RestSerializer,
      article: RestSerializer.extend({
        include: ['author', 'favorite'],
        embed: true,
        serialize(_, request) {
          const { limit, offset } = request.queryParams
          const start = Number(offset) * Number(limit)
          const end = start + Number(limit)

          // eslint-disable-next-line prefer-rest-params
          const json = RestSerializer.prototype.serialize.apply(this, arguments)

          const computedArticle = (article) => {
            const favorites = this.schema.favorites.where({ articleId: article.id })
            const favorited = this.schema.favorites.findBy({ articleId: article.id, userId: '11' })
            return { ...article, favoritesCount: favorites.length, favorited: !isNull(favorited) }
          }

          if ('articles' in json) {
            const { articles } = json
            json.articles = orderBy(
              articles.map(computedArticle).slice(start, end),
              (article) => new Date(article.createdAt).getTime(),
              'desc'
            )
            json.articlesCount = articles.length
          } else {
            const { article } = json
            json.article = computedArticle(article)
          }

          return json
        },
      }),
      comment: RestSerializer.extend({
        include: ['author'],
        embed: true,
      }),
    },

    models: {
      user: Model.extend({
        articles: hasMany(),
        favorites: hasMany(),
        comments: hasMany(),
      }),
      article: Model.extend({
        author: belongsTo('user'),
        favorite: belongsTo(),
        comments: hasMany(),
      }),
      tag: Model,
      favorite: Model.extend({
        user: belongsTo(),
        article: belongsTo(),
      }),
      comment: Model.extend({
        article: belongsTo(),
        author: belongsTo('user'),
      }),
    },

    factories: {
      article: Factory.extend({
        slug: () => faker.datatype.uuid(),
        // 여행 후기 데이터: 제목·소개·본문·지역을 travelArticles에서 돌아가며 사용
        title(i) {
          return travelArticles[i % travelArticles.length].title
        },
        description(i) {
          return travelArticles[i % travelArticles.length].description
        },
        body(i) {
          return travelArticles[i % travelArticles.length].body
        },
        region(i) {
          return travelArticles[i % travelArticles.length].region
        },
        createdAt: () => faker.date.past(),
        updatedAt: () => faker.date.past(),
        favorited: false,
        favoritesCount: 0,
        afterCreate(article, server) {
          const tags = server.db.tags.map(({ text }) => text)

          article.update({
            tagList: tags.sort(() => Math.random() - Math.random()).slice(0, faker.datatype.number(tags.length / 2)),
          })
        },
      }),
      comment: Factory.extend({
        createdAt: () => faker.date.past(),
        updatedAt: () => faker.date.past(),
        body: () => faker.lorem.paragraph(),
      }),
      user: Factory.extend({
        email: () => faker.internet.email(),
        token: () => faker.datatype.uuid(),
        username: () => faker.internet.userName(),
        bio: () => faker.lorem.sentence(),
        image: () => faker.image.avatar(),
        following: false,
        afterCreate(user, server) {
          server.createList('article', 5, { author: user })
        },
      }),
      tag: Factory.extend({
        text: (i) => ['바다', '맛집', '자연', '야경', '카페', '역사', '산책', '드라이브', '당일치기', '가족여행'][i % 10],
      }),
    },

    seeds(server) {
      const db = window.localStorage.getItem('travelog-mirage-v1')

      if (db) {
        server.db.loadData(JSON.parse(db))
      } else {
        server.createList('tag', 10)
        const users = server.createList('user', 10)
        const user = server.create('user', authUser)
        sampleSize(users, 3).forEach((user) => {
          user.update({ following: true })
        })
        const allUsers = [...users, user]

        const articles = server.schema.articles.all()

        allUsers.forEach((user) => {
          server.createList('favorite', 3, { user }).forEach((favorite) => {
            const article = sample(articles.filter(({ authorId }) => authorId !== user.id).models)
            favorite.update({ article })
          })
        })

        window.localStorage.setItem('travelog-mirage-v1', JSON.stringify(server.db.dump()))
      }
    },

    routes() {
      this.get('/articles/feed', (schema) => schema.articles.all().filter((article) => article.author.following))

      this.get('/articles', (schema, request) => {
        const { tag, author, favorited } = request.queryParams

        const articles = schema.articles.all()

        if (tag) {
          return articles.filter(({ tagList }) => tagList.includes(tag))
        }

        if (author) {
          return articles.filter((article) => article.author?.username === author)
        }

        if (favorited) {
          const user = this.schema.users.findBy({ username: favorited })

          return schema.articles.all().filter((article) => user.favoriteIds.includes(article.favoriteId))
        }

        return articles
      })

      this.post('/articles', (schema, request) => {
        const { article } = JSON.parse(request.requestBody)

        const author = schema.users.findBy({ email: authUser.email })

        return schema.articles.create({ ...article, author })
      })

      this.get('/articles/:slug', (schema, request) => {
        const { slug } = request.params

        return schema.articles.findBy({ slug })
      })

      this.get('/articles/:slug/comments', (schema, request) => {
        const { slug } = request.params

        const article = schema.articles.findBy({ slug })

        return article.comments
      })

      this.post('/articles/:slug/comments', (schema, request) => {
        const { slug } = request.params

        const body = JSON.parse(request.requestBody)

        const author = schema.users.findBy({ email: authUser.email })

        const now = new Date().getTime()

        const article = schema.articles.findBy({ slug })

        return schema.comments.create({ ...body.comment, createdAt: now, updatedAt: now, author, article })
      })

      this.get('/tags', (schema) => ({
        tags: schema.db.tags.map(({ text }) => text),
      }))

      this.post('/users/login', (schema, request) => {
        const { user } = JSON.parse(request.requestBody)

        return schema.users.findBy({ email: user.email })
      })

      this.post('/users', (schema, request) => {
        const { user } = JSON.parse(request.requestBody)

        return schema.users.create(user)
      })

      this.put('/user', (schema, request) => {
        const { user } = JSON.parse(request.requestBody)

        return schema.users.findBy({ email: authUser.email }).update(user)
      })

      this.get('/user', (schema) => schema.users.findBy({ email: authUser.email }))

      this.get('/profiles/:username', (schema, request) => {
        const { username } = request.params

        return {
          profile: schema.users.findBy({ username }),
        }
      })

      this.post('/profiles/:username/follow', (schema, request) => {
        const { username } = request.params

        const user = schema.users.findBy({ username }).update({
          following: true,
        })

        return {
          profile: user,
        }
      })

      this.delete('/profiles/:username/follow', (schema, request) => {
        const { username } = request.params

        const user = schema.users.findBy({ username }).update({
          following: false,
        })

        return {
          profile: user,
        }
      })

      this.post('/articles/:slug/favorite', (schema, request) => {
        const { slug } = request.params
        const article = schema.articles.findBy({ slug })
        const user = schema.users.findBy({ email: authUser.email })
        schema.favorites.create({ article, user })

        return article
      })

      this.delete('/articles/:slug/favorite', (schema, request) => {
        const { slug } = request.params
        const article = schema.articles.findBy({ slug })
        const user = schema.users.findBy({ email: authUser.email })
        const favorite = schema.favorites.findBy({ articleId: article.id, userId: user.id })

        favorite.destroy()

        return article
      })
    },
  })
}

export default makeServer

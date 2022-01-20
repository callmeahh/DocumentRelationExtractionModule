// neo4j-driver.js
const neo4j = require('neo4j-driver')
const db = 'bolt://localhost:7687' // http://localhost:7474 bolt://localhost:7687
const dbuser = 'admin'
const dbpassword = 'ahh'
// 连接数据库
// const driver = neo4j.driver(db, neo4j.auth.basic(dbuser, dbpassword), {
//   maxTransactionRetryTime: 30000
// })

// 具体示例，这里的例子是查询某个node的关系网络
const getPerson = async (name) => {

  return new Promise((resolve, reject) => {
    // 连接数据库
    const driver = neo4j.driver(db, neo4j.auth.basic(dbuser, dbpassword), {
      maxTransactionRetryTime: 30000
    })
    // 启动根查询
    console.log(name, "---------------------------")
    const cql_root = `MATCH (n:Person) where n.name=~'.*${name}.*'RETURN n LIMIT 1`
    let cql_name = ''
    let json = {} // 最终结果集
    const session1 = driver.session()
    // const root = await session.run(statement, params)
    session1.run(cql_root).subscribe({
      onKeys: keys => {
        console.log(keys)
      },
      onNext: record => {
        console.log(record.get('n').properties.name)
        cql_name = record.get('n').properties.name // 拿到查询结果
      },
      onCompleted: () => {
        session1.close() // returns a Promise
        // 下一个查询语句
        const statement = `MATCH p=(n:Person{name: '${cql_name}'})-[]->() RETURN p`

        const session2 = driver.session()
        // const result = await session.run(statement, params)
        // const result = await session2.run(statement)
        session2.run(statement).then(result => { // 异步处理
          console.log(result)
          // 此处可自行拓展
          // 可以把结果加到最终结果集中，也可以通过forEach遍历处理后再加进去
          json.data = result.records
        }).catch(error => {
          console.log(error)
        })
          .then(() => {
            session2.close()
            driver.close()
            resolve(json) // 在这里返回json数据集
          })
      },
      onError: error => {
        console.log(error)
      }
    })
  })
}
const getMovie = async (name) => {
  return new Promise((resolve, reject) => {
    // 连接数据库
    console.log( "---------------------------")

    const driver = neo4j.driver(db, neo4j.auth.basic(dbuser, dbpassword), {
      maxTransactionRetryTime: 30000
    })
    // 启动根查询
    console.log( "---------------------------")
    const cql_root = `MATCH (n:Movie) where n.title=~'.*${name}.*'RETURN n LIMIT 1`
    let cql_name = ''
    let json = {} // 最终结果集
    const session1 = driver.session()
    // const root = await session.run(statement, params)
    session1.run(cql_root).subscribe({
      onKeys: keys => {
        console.log(keys)
      },
      onNext: record => {
        console.log(record.get('n').properties.title)
        cql_name = record.get('n').properties.title // 拿到查询结果
      },
      onCompleted: () => {
        session1.close() // returns a Promise
        // 下一个查询语句
        const statement = `MATCH p=()-[]-(n:Movie{title:'${cql_name}'}) RETURN p`

        const session2 = driver.session()
        // const result = await session.run(statement, params)
        // const result = await session2.run(statement)
        session2.run(statement).then(result => { // 异步处理
          console.log(result)
          // 此处可自行拓展
          // 可以把结果加到最终结果集中，也可以通过forEach遍历处理后再加进去
          json.data = result.records
        }).catch(error => {
          console.log(error)
        })
          .then(() => {
            session2.close()
            driver.close()
            resolve(json) // 在这里返回json数据集
          })
      },
      onError: error => {
        console.log(error)
      }
    })
  })
}

const insertRelation = async (e1, r, e2) => {
  return new Promise((resolve, reject) => {
    // 连接数据库
    const driver = neo4j.driver(db, neo4j.auth.basic(dbuser, dbpassword), {
      maxTransactionRetryTime: 30000
    })
    // var str = data.split('_');
    // 启动根查询
    // const statement = `MATCH p=(n:Person{name:'undefined'})-[]->() RETURN p`
    const statement = `CREATE (database:Person {name:"${e1}"})-[r:${r}]->(message:Movie {title:"${e2}"}) RETURN database, message, r`

    let json = {} // 最终结果集
    const session2 = driver.session()
    // const result = await session.run(statement, params)
    // const result = await session2.run(statement)
    session2.run(statement).then(result => { // 异步处理
      console.log(result)
      // 此处可自行拓展
      // 可以把结果加到最终结果集中，也可以通过forEach遍历处理后再加进去
      json.data = result.records
    }).catch(error => {
      console.log(error)
    })
      .then(() => {
        session2.close()
        driver.close()
        resolve(json) // 在这里返回json数据集
      })
  })
}

module.exports = {
  getPerson,
  getMovie,
  insertRelation
}


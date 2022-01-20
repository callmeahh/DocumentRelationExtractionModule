var neo4j = require('node-neo4j');
db = new neo4j('http://neo4j:bolt@localhost:7687');

const getJson =  async () => {
  return new Promise((resolve, reject) => {
    //查询语句
    var sql_root = "MATCH (n1)-[r]->(n2) RETURN r, n1, n2 LIMIT 25";
    var sql_child = "MATCH (n1)-[r]->(n2) RETURN r, n1, n2 LIMIT 5";
    var json = {}
    //根节点
    db.cypherQuery(sql_root, function (err, result) {
      if (err){
        throw err;
      }
      json.name = result.data[0].name;
    });

    //子节点
   // db.cypherQuery(sql_child, function (err, result) {
   //   if (err){
   //     throw err;
    //  }
   //   var children = [];
   //   for (var i = 0; i < result.data.length; i++) {
  //      children[i] = {name: result.data[i].name}
  //    }
  //    json.children = children;
  //    resolve(json);
   // });
  }) 
}

module.exports = {
  getJson: getJson
}

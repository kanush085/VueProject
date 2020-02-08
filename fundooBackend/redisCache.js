const redis = require('redis');
const client = redis.createClient();
client.on('error', (err) => {
    console.log("Error " + err);
});
const query = 'gettingNotes'
module.exports = {

    redisgetNotes(userid, callback) {
        return client.get(`notesRedis:${query + userid}`, (err, result) => {
            if (err) {
                callback(err)
            }
            else {                
                callback(null, result)
            }
        })
    },

    setredisNotes(userid, resultJSON) {
        client.set(`notesRedis:${query + userid}`, JSON.stringify({
            source: 'Redis cache',
            resultJSON
        }))
    },

    deleteRedisNotes(userid) {
        console.log(userid,"sdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
        
        client.del(`notesRedis:${query + userid}`, JSON.stringify({
            source: 'Redis cache',
        }), (err, data) => {
            if (err) {
                console.log(err,"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

            } else {
                console.log(data, "deleted");

            }
        })

    }


}

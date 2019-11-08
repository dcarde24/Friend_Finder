var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends)
    });

    app.post("/api/friends", function(req, res) {

        var user = req.body;

        var bestFriend = {
            name: "",
            photo: "",
            total: 1000
        };

        friends.forEach(friend => {
            var userScores = user.scores;
            var friendScores = friend.scores;
            var total = 0;

            for (var i = 0; i < friendScores.length; i++) {
                var scoreDif = Math.abs(parseInt(friendScores[i]) - parseInt(userScores[i]))
                total += scoreDif
            }

            if (total < bestFriend.total) {
                bestFriend.name = friend.name;
                bestFriend.photo = friend.photo;
                bestFriend.total = total;
            }
            
        });

        friends.push(user) 
        res.json(bestFriend)

    });
}
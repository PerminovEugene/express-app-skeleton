const Twitter = require('node-twitter')
    , config = require('./../configs/twitter.json');

module.exports = {
    get: () => {
        return new Promise((resolve, reject) => {
            var twitterSearchClient = new Twitter.SearchClient(
                'eyckNie8WK0PXoUbt7OBOFXDq',
                'QxZb1ykqSsBgjj1JhVRbsCFoxjVA4WhxTGRQn9jmfBNaFdaJUn',
                '4003588955-FjBeKSPvXJjSAoVGUYZ4VwKOqtpqj8UlvBdDOUJ',
                'fzXuFM5UEeub6pxCYM5bSMTTcshfre4Wf2cpq4UaFmx3K'
            );
    
    
            twitterSearchClient.search({'q': 'node.js'}, function(error, result) {
                if (error)
                {
                    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
                }
        
                if (result)
                {
                    console.log(result);
                }
                return resolve({
                    errors: error,
                    response: result,
                });
            });
        })
    }
};
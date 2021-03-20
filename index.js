const axios = require('axios');
const fs = require('fs');
require('dotenv').config()
const API_TOKEN = process.env.SERVICES_TOKEN;

const API = `http://api.semstorm.com/api-v3/explorer/explorer-competitors/get-data.json?services_token=${API_TOKEN}`;
let content = "";

const getCount = async () => {
    await axios.post(API, {
        "domains": ["helion.pl"],
    })
        .then(function (response) {
            count = response.data.results_count;
            return count;
        })
        .catch(function (error) {
            console.log(error);
        });
}
let count = getCount();
const getDomains = async (pager) => {
    for (pager; pager < 20; pager++) {
        await axios.post(API,
            {
            "domains": ['najlepszeodkurzacze.com'],
            "pager": {
                "items_per_page": 50,
                "page": pager,
            }
        })
            .then(function (response) {
                console.log(response.data.results);
                console.log(response.status);
                content = response.data.results;
                count = response.data.results_count;
                console.log(pager)

                if (content.length === 0) {
                    console.log(`Było ${count} wyników.`)
                    console.log(content.length);
                    pager = 20;
                    return;
                }
                content.map(item => {
                    fs.appendFileSync('./test.txt', `${item.competitor}\n`, err => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        pager++
                        getDomains(pager);

                        //file written successfully
                    })
                });
            })
            .catch(function (error) {
                console.log(error)
                console.log("Sprawdzono 1000. Semstorm się wypiął, bo osiągnięto limit.");
                console.log(`Skończono na stronie ${pager} z ${count/50}.`)
            });
    }
}

getDomains(0);
// getCount();

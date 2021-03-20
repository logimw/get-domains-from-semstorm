class Semstorm {
    constructor() {
        this.SERVICE_TOKEN = 'NPziX3drIMsvNjnt4M3MuswJNXOchcHutxeW7ZZlBo4';
    }

    async getCopetitorsDomains() {
        await fetch(`http://api.semstorm.com/api-v3/explorer/explorer-competitors/get-data.json?services_token=${this.SERVICE_TOKEN}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:63342/'
            },
            body: JSON.stringify({ "domains": ["topdigital.pl"] })
        }).then(res => console.log(res)).catch(err=>console.log(err))
    }


}

const ss = new Semstorm;

ss.getCopetitorsDomains();

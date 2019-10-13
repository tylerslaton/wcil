const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'hopeful-depot-255718';
const COLLECTION_NAME = 'posts';
const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true,
    //keyFilename: "/Users/slaton/.cred/wcil-fae725f5f997.json"
});

exports.post = (req,res) => {
    // store/insert a new document
    const data = (req.body) || {};

    // Only allow valid input values
    const lat = data.latitude;
    const lng = data.longitude;
    const city = data.city;
    const salary = data.salary;
    const happiness = data.happiness;
    const comfort = data.comfort;

    const today = new Date();
    const created = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // If no data is submitted, don't bother accessing DB
    if (!data) {
        return res.status(200)
    }

    // Create a new firestore collection
    return firestore.collection(COLLECTION_NAME)
        .add({ created, lat, lng, city, salary, happiness, comfort })
        .then(doc => {
            return res.status(200).send(doc);
        }).catch(err => {
            console.error(err);
            return res.status(404).send({ error: 'unable to store', err });
    });
}

exports.get = (req,res) => {

    const data = (req.query) || {};

    // Only allow valid input values
    const city = data.city;
    const salary = data.salary;
    const happiness = data.happiness;
    const comfort = data.comfort;

    //return res.status(200).send(data);
    // If no data is submitted, don't bother accessing DB
    if (!Object.keys(data).length) {
        return res.status(200).send(JSON.stringify({results: "nothing sent" }));
    }

    let n = firestore.collection(COLLECTION_NAME)

    if(city != undefined){
        n = n.where('city', '==', city);
    }
    if(salary != undefined){
        n = n.where('salary', '==', salary);
    }
    if(happiness != undefined){
        n = n.where('happiness', '==', happiness);
    }
    if(comfort != undefined){
        n = n.where('comfort', '==', comfort);
    }

    n.get()
    .then(snapshot => {
        if(snapshot.empty) {
        console.log("No matching documents.");
        return res.status(200).send(JSON.stringify({results: null}));
    }

    let list = {results: []};
    snapshot.forEach(doc => {
        list.results.push(doc.data());
    });

    return res.status(200).send(JSON.stringify(list));
    })
    .catch(err => {
    return res.status(500).send({error: "error getting documents", err});
    });


    }

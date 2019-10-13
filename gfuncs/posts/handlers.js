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
    const lat = data.lattitude;
    const long = data.longitude;
    const city = data.city;
    const salary = data.salary;
    const happiness = data.happiness;
    const comfort = data.comfort;
    const created = new Date().getTime();

    // If no data is submitted, don't bother accessing DB
    if (!data) {
        return res.status(200)
    }

    // Create a new firestore collection
    return firestore.collection(COLLECTION_NAME)
        .add({ created, lat, long, city, salary, happiness, comfort })
        .then(doc => {
            return res.status(200).send(doc);
        }).catch(err => {
            console.error(err);
            return res.status(404).send({ error: 'unable to store', err });
    });
}

exports.get = (req,res) => {

  const data = (req.body) || {};

  // Only allow valid input values
  const city = data.city;
  const salary = data.salary;
  const happiness = data.happiness;
  const comfort = data.comfort;

  // If no data is submitted, don't bother accessing DB
  if (!data) {
      return res.status(200).send();
  }

  let n = firestore.collection(COLLECTION_NAME)

  if(city !== null){
    n = n.where('city', '==', city);
  }
  if(salary !== null){
    n = n.where('salary', '==', salary);
  }
  if(happiness !== null){
    n = n.where('', '==', city);
  }
  if(comfort !== null){
    n = n.where('city', '==', city);
  }
  n.get()
    .then(snapshot => {
      if(snapshot.empty) {
      console.log("No matching documents.");
      return res.status(200).send(null);
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      return res.status(200).send(doc);
    });
  })
  .catch(err => {
    console.log("Error getting documents", err);
    return res.status(404).send({error: "unable to match", err});
  });


}

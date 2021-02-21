const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');


const [, ...data] = fs.readFileSync('conditions.csv')
  .toString()
  .split('\n');
data.pop();

const conditions = data.map(elem => {
  const split = elem.split('\t');
  return {
    code: split[0],
    name: split[1]
  }
});

// Connection URL
const url = 'mongodb://root:gyantadmin@localhost:27017/gyant_test?authSource=admin';

const case1Description = `Patient presents with Flank Pain. The patient is a 51-year-old female, no significant past medical history, presents to the emergency department with left-sided flank pain ongoing ×1 month now with abdominal pain. The pain is intermittent, but has been worsening. She reports new onset nausea, vomiting, diarrhea for the last 2 days. She reports multiple episodes of nonbloody emesis starting yesterday. She has also had multiple episodes of nonbloody diarrhea. She has gone to see her primary care doctor twice since symptoms began. She was found to have mildly elevated creatinine and was referred to a nephrologist. However, the nephrologist is not willing to see her until . The patient feels she cannot wait that long especially in light of these new symptoms. She then followed up with her primary care doctor again and he prescribed Zofran and loperamide but offered her no other solutions. The pain has since increased as well. She denies any fevers, chills. She denies urinary symptoms including burning with urination, frequency, hematuria.`;
const case2Description = `Patient  is an 42 year old  male.    Chief Complaint: Establish Care and Physical    HPI      Hemorrhoids  Bothersome  Comes and goes  Especially with sedentary life style  Recently worse  Couple nights where almost wakes patient up  Gets intermittently constipated  High fiber diet    Patient Active Problem    Diagnoses Code
-  Hemorrhoids 455.6E       No outpatient prescriptions have been marked as taking for the  encounter (Office Visit) with ,  C.     Allergies   Allergen Reactions
-  Pcn (Penicillins)
-  Morphine        No past medical history on file.  Past Surgical History   Procedure Date
-  Hx knee surgery      Arthroscopy age 15 for torn meniscus       Family History   Problem Relation  of Onset
-  Cancer Mother      Breast
-  Hypertension Mother
-  Hypertension Father      History   Substance Use Topics
-  Smoking status: Never Smoker
-  Smokeless tobacco: Not on file`;
const case3Description = `Patient  is an 45 year old  female.    Chief Complaint:  Problem    HPI  states that about one month ago she woke up with redness and swelling to her left eye.  She went to see an ophthalmologist who prescribed her naphazoline.  She states that this relieves the redness only temporarily.  She also states that this morning she awoke with more crusting to the left eye.  The eye is not particularly itchy, but seems more irritated today.  She has not had any sick contacts.          Review of Systems   Constitutional: Negative for fever.   Eyes: Positive for discharge and redness. Negative for blurred vision, double vision and photophobia.   Skin: Negative for itching.   Neurological: Positive for headaches.         Objective:     BP 100/69  -Strict ER precautions reviewed with patient should symptoms persist or worsen (specific signs reviewed verbally).  Good communication established and plan agreed upon by patient.`;

MongoClient.connect(url, async function (err, client) {
  await client.db().createCollection('users');
  await client.db().createCollection('cases');
  await client.db().createCollection('conditions');

  await client.db().collection('users').insertOne({
    "email": "andre@gyant.com",
    "password": "$2b$10$hCeobmrb71jmeNVPV8aSsOn3ylpfgKyThJNAGac79ylYHVklGmwM6",
    "name": "André Coelho",
  });

  await client.db().collection('cases').insertMany([{
    "description": case1Description,
    evaluated: false,
    "created": new Date(),
    "updatedAt": new Date()
  }, {
    "description": case2Description,
    evaluated: false,
    "created": new Date(),
    "updatedAt": new Date()
  }, {
    "description": case3Description,
    evaluated: false,
    "created": new Date(),
    "updatedAt": new Date()
  }]);

  await client.db().collection('conditions').insertMany(conditions);

  client.close();
});
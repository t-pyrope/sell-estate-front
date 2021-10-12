import axios from 'axios';

// when server is in MongoDB
// export default axios.create({
//   baseURL: 'https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sell-estate-ezpbb/service/lead/incoming_webhook/',
//   headers: {
//     'Content-type': 'application/json',
//   },
// });

// when server is local
export default axios.create({
  baseURL: 'http://localhost:5000/lead',
  headers: {
    'Content-type': 'application/json',
  },
});

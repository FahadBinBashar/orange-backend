const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');

const userData = require('../models/user-data.model');

router.post('/getmati', async (req, res) => {
  try {
    console.log(req.body);
    const eventName = req.body.eventName;
    res.end();

    if (eventName === 'verification_completed') {
      const url = req.body.resource;

      let authToken =
        process.env.GET_MATI_MERCHANT_TOKEN +
        ':' +
        process.env.GET_MATI_CLIENT_SECRET;
      authToken = Buffer.from(authToken);
      authToken = authToken.toString('base64');

      const response = await fetch('https://api.getmati.com/oauth', {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authToken}`,
        },
      });

      const data = await response.json();
      const { access_token } = data;

      const stepRes = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });

      const stepData = await stepRes.json();

      const requiredData = {
        age: stepData.computed ? stepData.computed.age.data : null,
        isDocExpired: stepData.computed
          ? stepData.computed.isDocumentExpired.data
          : null,
        flowId: stepData.flow.id,
        flowName: stepData.flow.name,
        expired: stepData.expired,
        status: stepData.identity.status,
        metadata: stepData.metadata,
        deviceFingerprint: stepData.deviceFingerprint,
        documents: stepData.documents,
        steps: stepData.steps,
        hasProblem: stepData.hasProblem,
      };

      const verifyData = await userData.create({
        flowId: requiredData.flowId,
        flowName: requiredData.flowName,
        docsExpiryStatus: JSON.stringify(requiredData.isDocExpired),
        age: requiredData.age,
        expired: requiredData.expired,
        metadata: JSON.stringify(requiredData.metadata),
        deviceFingerprint: JSON.stringify(requiredData.deviceFingerprint),
        documents: JSON.stringify(requiredData.documents),
        steps: JSON.stringify(requiredData.steps),
        hasProblem: requiredData.hasProblem,
        status: requiredData.status,
      });

      console.log(verifyData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message)
  }
});

router.get('/getMati', async (req, res, next) => {
  try {
    const data = await userData.findAll();
    res.send({ data });
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
});

module.exports = router;

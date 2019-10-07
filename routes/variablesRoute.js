const express = require('express');
const jwt = require('jsonwebtoken');

const VariableMeta = require('../models/variablesMetaModel.js');
const config = require('../config.js');

let router = express.Router();

const checkForErrors = (variableMeta) => {
    let errors = {};
    let isValid = false;
    if (variableMeta.name === '') {
        errors = { ...errors, name: 'This field is required' }
    }
    if (variableMeta.category === '') {
        errors = { ...errors, category: 'This field is required' }
    }
    if (variableMeta.crfDataType === '') {
        errors = { ...errors, crfDataType: 'This field is required' }
    }

    if (Object.keys(errors).length > 0) {
        return { isValid, errors };
    }
    isValid = true;
    return { isValid, errors };
}


// checking for contributor rights (read,update)
const isAuthenticated = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const authorizationToken = authorizationHeader.split(' ')[1];
    if (authorizationToken) {
        jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
            if (err || (decoded.role !== "admin" && decoded.role !== "contributor")) {
                res.status(401).json({ error: 'Failed to authenticate' });
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({ error: 'No token provided' })
    }
}


// checking for admin rights (create,read,update,delete)
const hasFullAuthentication = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const authorizationToken = authorizationHeader.split(' ')[1];
    if (authorizationToken) {
        jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
            if (err || decoded.role !== "admin") {
                res.status(401).json({ error: 'Failed to authenticate' });
            }
            else {
                next();
            }
        });
    } else {
        res.status(403).json({ error: 'No token provided' })
    }
}

router.get('/', (req, res) => {
    let searchStr = req.query.searchText || "";
    if (searchStr.trim() !== "") {
        VariableMeta.find({ 'variableName': { $regex: '.*' + searchStr + '.*', $options: 'i' } }, (err, allVariablesMeta) => {
            res.json({ success: "success", allVariablesMeta });
        })
    } else {
        VariableMeta.find({}, (err, allVariablesMeta) => {
            res.json({ success: "success", allVariablesMeta });
        });
    }
});


router.get('/:id', (req, res) => {
    VariableMeta.findById(req.params.id, (err, singleVariableMeta) => {
        if (err) throw err;
        res.json({ success: "success", singleVariableMeta });
    })
});

router.post('/add', hasFullAuthentication, (req, res) => {
    const variableMeta = {
        variableName: req.body.variableName || '',
        category: req.body.category || '',
        crfDataType: req.body.crfDataType || '',
        description: req.body.description || '',
        valueLowerLimit: req.body.valueLowerLimit || 0,
        valueUpperLimit: req.body.valueUpperLimit || 0,
        isRequired: req.body.isRequired == 0 ? false : true,
        units: req.body.units || "",
        formName: req.body.formName || "",
    }

    const { isValid, errors } = checkForErrors(variableMeta);

    if (isValid) {
        const newVariableMeta = new VariableMeta({ ...variableMeta });

        newVariableMeta.save((err) => {
            if (err) {
                console.log("Error thrown");
                throw err
            }
            else {
                console.log("response thrown");
                res.json({ success: 'success' });
            }
        });
    } else {
        console.log("Error thrown");
        res.json({ errors });
    }
});

router.post('/edit/:id', isAuthenticated, (req, res) => {
    const updatedVariableMeta = {
        variableName: req.body.variableName || '',
        category: req.body.category || '',
        crfDataType: req.body.crfDataType || '',
        description: req.body.description || '',
        valueLowerLimit: req.body.valueLowerLimit || 0,
        valueUpperLimit: req.body.valueUpperLimit || 0,
        isRequired: req.body.isRequired == 0 ? false : true,
        units: req.body.units || "",
        formName: req.body.formName || "",
    }


    const { isValid, errors } = checkForErrors(updatedVariableMeta);

    if (isValid) {
        VariableMeta.findById(req.params.id, (err, singleVariableMeta) => {
            // if contributor changed variable name then return error
            const authorizationHeader = req.headers['authorization'];
            const authorizationToken = authorizationHeader.split(' ')[1];
            if (authorizationToken) {
                jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
                    if (err || (decoded.role !== "admin" && singleVariableMeta.variableName !== updatedVariableMeta.variableName)) {
                        res.status(401).json({ error: 'Failed to authenticate' });
                    } else {
                        VariableMeta.findByIdAndUpdate(req.params.id, updatedVariableMeta, { useFindAndModify: false }, (err, currentMeta) => {
                            if (err) throw err;
                            else res.json({ success: 'success' });
                        });
                    }
                });
            }
        });
    }
    else {
        res.json({ errors });
    }
});

router.delete('/delete/:id', hasFullAuthentication, (req, res) => {
    VariableMeta.remove({ _id: req.params.id }, err => {
        res.json({ success: 'success' });
    });
});

module.exports = router;

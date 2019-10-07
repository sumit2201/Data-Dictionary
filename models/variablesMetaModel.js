const mongoose = require('mongoose');

const VariableMetaSchema = mongoose.Schema({
    variableName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    crfDataType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    valueLowerLimit: {
        type: Number,
    },
    valueUpperLimit: {
        type: Number,
    },
    isRequired: {
        type: Boolean,
    },
    units: {
        type: String,
    },
    formName:[
        {
            type: String
        }
    ],
    addedOn: {
        type: Date,
        default: Date.now,
        required: true
    }
});

VariableMetaSchema.statics.addInitialData = (variableMeta) => {
    let _varaibleMeta = [
        {
            variableName: "subject.age",
            category: "Calculated",
            crfDataType: "Number",
            description: "Age in years",
            valueLowerLimit: 0,
            isRequired: true,
            units: "years",
            valueLowerLimit: 120,
            formName:["DemographicsandSocioeconomicStatus"]
        },
        {
            variableName: "subject.name",
            category: "Original",
            crfDataType: "Text",
            description: "Name of subject",
            valueLowerLimit: 0,
            isRequired: true,
            units: "string",
            valueLowerLimit: 120,
            formName:["DemographicsandSocioeconomicStatus","BillingAddress"]
        },
        {
            variableName: "subject.fee",
            category: "Derived",
            crfDataType: "Number",
            description: "fee in currency",
            valueLowerLimit: 100,
            isRequired: true,
            units: "currency",
            valueLowerLimit: 1000,
            formName:["DemographicsandSocioeconomicStatus","BillingAddress","HealthInsurance"]
        },
    ]
    // uncomment below to empty database on each connection establishment
    // variableMeta.deleteMany({}, (err) => {
        _varaibleMeta.forEach((newVaraibleMeta) => {
            variableMeta.create(newVaraibleMeta);
        });
   // });

}

const VariableMeta = mongoose.model('VariableMeta', VariableMetaSchema);

module.exports = VariableMeta;

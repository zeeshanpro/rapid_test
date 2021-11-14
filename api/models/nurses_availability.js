const mongoose = require("mongoose")

const nurseAvailabilitiesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nurseId: {type: String},
    date: {type: Date},
    startTime: {type: String},
    endTime: {type: String}
});

module.exports = mongoose.model("Nurse_Avail", nurseAvailabilitiesSchema);
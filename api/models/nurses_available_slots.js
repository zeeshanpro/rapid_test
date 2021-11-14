const mongoose = require("mongoose")

const nurseAvailableSlotsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nurse_availability_id: {type: String},
    nurseId: {type: String},
    startTime: {type: String},
    endTime: {type: String}
});

module.exports = mongoose.model("Nurse_Avail_Slots", nurseAvailableSlotsSchema);
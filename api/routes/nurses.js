const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");
const NurseAvailability = require('../models/nurses_availability');
const NurseAvailabilitySlots = require('../models/nurses_available_slots');

router.get("/", async (req, res, next) => {
    const nurse = await NurseAvailability.find({}).exec();

    return res.status(200).send({
        success: true,
        message: 'sucess',
        data: nurse,
      });
  });


router.post("/set-availability", async (req, res, next) => {
    
    const {nurseId, date, startTime, endTime} = req.body;
    const startDateTime = moment.unix(startTime);
    const endDateTime = moment.unix(endTime);

    const NurseAvailabilityObject = NurseAvailability({
        _id: mongoose.Types.ObjectId(),
        nurseId: nurseId,
        date: date,
        startTime: startDateTime.format('h:mm:ss a'),
        endTime: endDateTime.format('h:mm:ss a'),
    })
    const result = await NurseAvailabilityObject.save();
    const nurse_availability_id = result.toObject()._id;
    
    
    console.log(startDateTime);
    console.log(endDateTime);
    var timeslot = startDateTime;
    var timeSlotsArray = [];
    const i = 0;    
    while(timeslot.isBefore(endDateTime)){
        const start_time =  timeslot.format('h:mm:ss a');
        timeslot = timeslot.add(15,'minutes');
        const end_time = timeslot.format('h:mm:ss a');
        const model = {
            start_time: start_time,
            end_time: end_time,
          };
        timeSlotsArray.push(model); 
        const NurseAvailabilitySlotsObject = NurseAvailabilitySlots({
            _id: mongoose.Types.ObjectId(),
            nurse_availability_id: nurse_availability_id,
            nurseId: nurseId,
            startTime: start_time,
            endTime: end_time
        })
        await NurseAvailabilitySlotsObject.save();
    }
    console.log(timeSlotsArray);
    const data = {
        nurse : result,
        timeSlotsArray
    }
    return res.status(200).send({
        success: true,
        message: 'sucess',
        data,
      });
  });

module.exports = router;
const AttendanceSheet = require("../model/attendaceSheet.model");
const { isValidId } = require("../utils/validation");


function createAttendaceService(timeLimit){

    const attendace = new AttendanceSheet({timeLimit})

    return attendace.save()
}

// find attendance
function findAttendanceService(key='status',value='running'){

    if(key === 'id'){
        if (!isValidId(value)) return;
        return AttendanceSheet.findById(_id)
    }

   return AttendanceSheet.findOne({[key]:value})

}


module.exports ={createAttendaceService,findAttendanceService}
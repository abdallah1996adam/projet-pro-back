const Booking = require('../models/bookingModel')

exports.addBooking = async(request, response)=>{


    try {
        
        
    } catch (error) {
        console.log(error);
        return response.status(400).json({
            Error:error.message
        })
        
    }
}
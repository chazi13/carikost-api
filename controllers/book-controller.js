const bcrypt = require('bcrypt');

const errorHandler = require('../middleware/error_handler');
const { booking, user, dorm} = require('../models/');

exports.store = async (req, res) => {

    // tangkap request
    const { dorm_id, price, date_entries, duration } = req.body;

    data = {
        dorm_id,
        price,
        date_entries,
        duration,
        status: 1
    }

    // Object.assign(data, { user_id: req.user.userId })
    booking.create({...data, user_id: req.user.userId})
    .then(booking => {
        if (booking) {
            return res.status(201).json(booking);
        }
    })
    .catch(err => {
        return errorHandler(res, 500, 'Failed to booking kost', '');
    })
}


exports.show = async (req, res) => {
    booking.findAll({
        include: [{
            model: user,
            as: 'bookingCustomer',
            attributes: ['fullname', 'email', 'phone']
        }, {
            model: dorm,
            as: 'bookingDorm',
        }],
        attributes: {
            exclude: ['createdAt'],
            
        }
    })
    .then(booking => {
        if (booking) {
            return res.status(200).json(booking);
        }
    })
    .catch(err => {
        return errorHandler(res, 422, 'Kost not found', '');
    });
}


exports.showdetaillist = async (req, res) => {
    const iduser = req.user.userId
    booking.findOne({
        where: {id: iduser}
    }) 
    .then(booking => {
        if (booking) {
            return res.status(200).json(booking)
        } else {
            res.status(400).json({
                message: "data kost per user tidak ditemukan"
            })
        }
    })
    .catch(err => {
        return errorHandler(res, 422, 'Kost not found', '');
    })
}

exports.showdetail = async (req, res) => {
    booking.findOne({
        where: { id: req.params.id },
        include: [{
            model: user,
            as: 'bookingCustomer',
            attributes: ['fullname', 'email', 'phone']
        }, {
            model: dorm,
            as: 'bookingDorm',
        }],
        attributes: {
            exclude: ['createdAt'],
          
        }
    })
    .then(booking => {
        if (booking) {
            return res.status(200).json(booking);
        }
    })
    .catch(err => {
        return errorHandler(res, 422, 'Kost not found', '');
    });
}



exports.edit = async (req, res) => {
    booking.findOne({
        where: { id: req.params.id },
        include: [{
            model: user,
            as: 'bookingCustomer',
            attributes: ['fullname', 'email', 'phone']
        }, {
            model: dorm,
            as: 'bookingDorm',
        }],
        attributes: {
            exclude: ['createdAt'],
        }
    })
    .then(booking => {
        if (booking) {
            booking.update({
                status: 2
            }).then(booking => {
                if (booking) {
                    return res.status(200).json(booking);
                } else {
                    return errorHandler(res, 422, 'Unable to update booking data');
                    // res.status(400).json({
                    //     message: "Data bookinging gagal di update",
                    //     data: booking
                    // });
                }
            })
        }
    })
    .catch(err => {
        return errorHandler(res, 422, 'Kost not found', '');
    });

}
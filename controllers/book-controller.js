const bcrypt = require('bcrypt');

const { booking, user, dorm} = require('../models/');

exports.store = async (req, res) => {

    // tangkap request
    const { dorm_id, price, date_entries, duration } = req.body;

    data = {
        dorm_id: dorm_id,
        price: price,
        date_entries: date_entries,
        duration: duration,
        status: 1
    }

    Object.assign(data, { user_id: req.user.userId })
    console.log(req.body)
    console.log(req.user.userId)
    console.log(data)
    booking.create(data)
    .then(booking => {
        if (booking) {
            return res.status(201).json({
                message: "bookinging Berhasil Ditambahkan",
                data: booking
            });
        } else {
            return res.status(500).json({
                message: "Gagal Membuat bookinging"
            });
        }
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
                res.status(200).json({
                    message: "daftar kost berhasil diambil",
                    data: booking,
                });
            } else {
                res.status(400).json({
                    message: "Data kost tidak ditemukan",

                });
            }
        });
}


exports.showdetaillist = async (req, res) => {
    const iduser = req.user.userId
    booking.findOne({
        where: {id: iduser}
    }) .then(booking => {
        if (booking) {
            res.status(200).json({
                message: "daftar kost per user berhasil diambil",
                data: booking,
            })
        } else {
            res.status(400).json({
                message: "data kost per user tidak ditemukan"
            })
        }
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
                res.status(200).json({
                    message: "daftar kost berhasil diambil",
                    data: booking,
                });
            } else {
                res.status(400).json({
                    message: "Data kost tidak ditemukan",

                });
            }
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
                        res.status(200).json({
                            message: "Data bookinging berhasil di update",
                            data: booking
                        });
                    } else {
                        res.status(400).json({
                            message: "Data bookinging gagal di update",
                            data: booking
                        });
                    }
                })
            } else {
                res.status(400).json({
                    message: "Data kost tidak ditemukan",

                });
            }
        });

}
const errorHandler = require('../middleware/error_handler');
const {dorm, user} = require('../models');


exports.index = (req, res) => {
    dorm.findAll({
            attributes: [
                'id', 'name', 'type', 'rooms_avaible', 'address', 'price', 'city', 'images', 'updatedAt'
            ]
        })
        .then(dorms => {
            if (dorms) {
                return res.status(200).json(dorms);
            } else {
                return errorHandler(res, 422, 'Kost not found', '');
            }
        })
        .catch(err => {
            return errorHandler(res, 500, 'Internal server error', err);
        });
}

exports.show = (req, res) => {
    dorm.findOne({
            where: {id: req.params.id},
            include: [{
                model: user,
                as: 'dormOwner',
                attributes: ['fullname', 'email', 'phone']
            }],
            attributes: {
                exclude: ['createdAt']
            }
        })
        .then(dorm => {
            if (dorm) {
                return res.status(200).json(dorm);
            } else {
                return errorHandler(res, 422, 'Kost not found', '');
            }
        })
        .catch(err => {
            return errorHandler(res, 500, 'Internal server error', err);
        });
}

exports.store = (req, res) => {
    const filesUploaded = req.files;
    if (!filesUploaded) {
        return res.status(400).json({
            message: "anda belum memilih file gambar"
        });
    }

    let images = [];
    filesUploaded.map(item => {
        images.push(`uploads/${item.filename}`)
    });

    dorm.create({...req.body, images: images.toString(), owner: req.user.userId})
        .then(dorm => {
            if (dorm) {
                return res.status(201).json(dorm);
            }
        })
        .catch(err => {
            return errorHandler(res, 500, 'Internal server error', err);
        });
}

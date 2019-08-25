const {dorm, user} = require('../models');

exports.index = (req, res) => {
    dorm.findAll({
            attributes: [
                'id', 'name', 'type', 'rooms_avaible', 'address', 'price', 'city', 'images', 'updatedAt'
            ]
        })
        .then(dorms => {
            if (dorms) {
                return res.status(200).json({
                    message: "Semua data kost",
                    data: dorms,
                    action: '/detail'
                });
            } else {
                return res.status(500).json({
                    message: "Gagal menampilkan list kost",
                    action: '/'
                });
            }
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
                res.status(200).json({
                    message: "Detail kost",
                    data: dorm,
                    action: '/detail'
                });
            } else {
                res.status(400).json({
                    message: "Data kost tidak ditemukan",
                    action: '/'
                });
            }
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

    Object.assign(req.body, {images: images.toString(), owner: req.user.userId});
    console.log(req.body);
    dorm.create(req.body)
        .then(dorm => {
            if (dorm) {
                return res.status(201).json({
                    message: "Kost berhasil ditambahkan",
                    data: dorm,
                    action: '/'
                });
            } else {
                return res.status(500).json({
                    message: "Gagal menambahkan data kost",
                    action: '/create'
                });
            }
        });
}

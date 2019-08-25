const fetchData = (allError) => {
    return {
        field: allError[0].param,
        msg: allError[0].msg
    }
}

const errrHandler = (res, errStatus, message, data) => {
    return res.status(errStatus).send({
        status: errStatus,
        message,
        data: fetchData(data)
    });
}

module.exports = errrHandler;

exports.handleError = (error, req, res,) => {

    if (error.details) {
        const data = {};
        error?.details.forEach(v => {
            data[v.context?.key] = [v.message.replace(/"/g, '')];
        })

        return res.status(400).send({ error: data })
    }

    const obj = {
        error: {
            message: [error],
        }
    }

    if (error.errors) {
        let data
        error.errors?.forEach(e => {
            const obj = {
                error: { message: [e.message], },
            }
            return data = obj
        })
        return res.status(400).send(data)
    }
    res.status(400).send(error.error ? error.error.message : error?.original?.sqlMessage ? error?.original?.sqlMessage : error.message ? error : { ...obj },
    )
    return
}

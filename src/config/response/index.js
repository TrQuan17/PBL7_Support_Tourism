module.exports = {
    responseJson : (status, data) => {
        return {
            status: status? 'SUCCESS' : 'FAILED',
            data: data
        }
    }
}
class ApiResponse {
    constructor(statusCode = 200,data = {},message="success",success){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.sccess = true

    }
}

export {ApiResponse}
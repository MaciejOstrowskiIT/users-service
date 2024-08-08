

export class ResponseHandler {
    private microserviceName = 'users-microservice'
    constructor() {}


    handleError(message: string, status: number, methodName: string) { // zmienic status na Enum, tj stworzyc enuma HttpStatus
        return {
            microserviceName: this.microserviceName,
            methodName,
            status,
            message,
            timestamp: new Date()
        }
    }

    handleSuccess(status: number, message: string | Record<string, any>) {
       return {
        microserviceName: this.microserviceName,
        status,
        message,
        timestamp: new Date()
       }
    }
}
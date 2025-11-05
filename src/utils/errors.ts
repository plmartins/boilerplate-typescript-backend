export class AppError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number = 400,
        public readonly details?: any
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorUtils = {
    handle: (error: Error) => {
        if (error instanceof AppError) {
            return {
                statusCode: error.statusCode,
                error: error.name,
                message: error.message,
                details: error.details
            };
        }

        return {
            statusCode: 500,
            error: 'InternalServerError',
            message: 'Internal Server Error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        };
    }
};

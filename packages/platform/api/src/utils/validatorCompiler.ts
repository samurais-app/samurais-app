import { FastifyRouteSchemaDef, FastifyValidationResult } from 'fastify/types/schema';

export function validatorCompiler(options: FastifyRouteSchemaDef<any>): FastifyValidationResult {
    return (data): { error?: Error, value?: any } => {
        try {
            const result = options.schema.validateSync(data, {
                strict: false,
                abortEarly: true,
                stripUnknown: true,
                recursive: true
            });
            return { value: result };
        } catch (e: any) {
            return { error: e };
        }
    };
}
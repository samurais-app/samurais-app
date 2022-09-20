import { FastifyRouteSchemaDef, FastifySchema, FastifyValidationResult } from 'fastify/types/schema';
import { OptionalObjectSchema, ObjectShape } from 'yup/lib/object';

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
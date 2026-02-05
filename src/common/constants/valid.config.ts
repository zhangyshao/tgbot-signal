import { ValidationError } from "class-validator";
import { ValidationPipe } from "@nestjs/common";

export const validationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {

    const messages = errors.map(error => {

      const constraints = error.constraints ? Object.values(error.constraints) : []

      return {
        field: error.property,
        errors: constraints
      }
    })

    return messages
  }
})

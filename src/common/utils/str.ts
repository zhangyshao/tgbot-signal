export const FormatErrorDetails = (error: unknown, msg?: string) => {

  let errorDetail = {
    message: "Unknown error",
  } as any

  if (typeof error === "object" && error !== null) {

    const e = error as {
      message?: string
      name?: string
      code?: string
      errno?: string
      cause?: any
    }

    errorDetail = {
      message: msg || e.message || "Unknown error",
      name: e.name || "Error",
      code: e.code || "No error code",
      errno: e.errno || "No error number",
      cause: e.cause ? e.cause.message : "No cause",
    }
  }

  return JSON.stringify(errorDetail, null, 2)
}
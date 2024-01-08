
export type JwtPayload = {
    username,
    role,
}

export type JwtPayloadWithRT = {
    username,
    role,
    refresh_token
}
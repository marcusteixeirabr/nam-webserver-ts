process.loadEnvFile(".env");

type Config = {
    db: {
        host: string;
        port: number;
        name: string;
        user: string;
        password: string;
    },
    server: number;
}

export const config: Config = {
    db: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT ?? "3306"),
        name: process.env.DB_NAME || "nan_db",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || ""
    },
    server: parseInt(process.env.SERVER_PORT ?? "8080")
}
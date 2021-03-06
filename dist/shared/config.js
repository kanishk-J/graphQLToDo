"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file stores info for api, db, keys, logs
 * @constant Config
 */
exports.Config = {
    apiSettings: {
        host: process.env.API_HOST || "localhost",
    },
    dbSettings: {
        authEnabled: process.env.MONGO_AUTH || false,
        localDatabase: true,
        dockerconnectionString: process.env.MONGO_DB_HOST_DOCKER || "mongodb:27017",
        connectionString: process.env.MONGO_DB_HOST || "localhost:27017",
        database: process.env.DATABASE || "todoapp",
        password: process.env.MONGO_AUTH_PASSWORD,
        username: process.env.MONGO_AUTH_USERNAME,
    },
    serviceSettings: {
        logsDir: "logs/",
        env: process.env.environment || "local",
    },
    secretKeys: {
        jwtSecret: process.env.SECRET || "yes1234$ASDASD/SA",
        cryptoSecret: process.env.CRYPTO || "DASD2233312S;!`W21",
    },
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zaGFyZWQvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztHQUdHO0FBQ1UsUUFBQSxNQUFNLEdBQUc7SUFDcEIsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLFdBQVc7S0FDMUM7SUFDRCxVQUFVLEVBQUU7UUFDVixXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksS0FBSztRQUM1QyxhQUFhLEVBQUUsSUFBSTtRQUNuQixzQkFBc0IsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixJQUFJLGVBQWU7UUFDM0UsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksaUJBQWlCO1FBQ2hFLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxTQUFTO1FBQzNDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQjtRQUN6QyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7S0FDMUM7SUFDRCxlQUFlLEVBQUU7UUFDZixPQUFPLEVBQUUsT0FBTztRQUNoQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksT0FBTztLQUN4QztJQUNELFVBQVUsRUFBRTtRQUNWLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxtQkFBbUI7UUFDcEQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLG9CQUFvQjtLQUN6RDtDQUNGLENBQUMiLCJmaWxlIjoic2hhcmVkL2NvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaGlzIGZpbGUgc3RvcmVzIGluZm8gZm9yIGFwaSwgZGIsIGtleXMsIGxvZ3NcclxuICogQGNvbnN0YW50IENvbmZpZ1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IENvbmZpZyA9IHtcclxuICBhcGlTZXR0aW5nczoge1xyXG4gICAgaG9zdDogcHJvY2Vzcy5lbnYuQVBJX0hPU1QgfHwgXCJsb2NhbGhvc3RcIixcclxuICB9LFxyXG4gIGRiU2V0dGluZ3M6IHtcclxuICAgIGF1dGhFbmFibGVkOiBwcm9jZXNzLmVudi5NT05HT19BVVRIIHx8IGZhbHNlLFxyXG4gICAgbG9jYWxEYXRhYmFzZTogdHJ1ZSxcclxuICAgIGRvY2tlcmNvbm5lY3Rpb25TdHJpbmc6IHByb2Nlc3MuZW52Lk1PTkdPX0RCX0hPU1RfRE9DS0VSIHx8IFwibW9uZ29kYjoyNzAxN1wiLFxyXG4gICAgY29ubmVjdGlvblN0cmluZzogcHJvY2Vzcy5lbnYuTU9OR09fREJfSE9TVCB8fCBcImxvY2FsaG9zdDoyNzAxN1wiLFxyXG4gICAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRBVEFCQVNFIHx8IFwidG9kb2FwcFwiLFxyXG4gICAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52Lk1PTkdPX0FVVEhfUEFTU1dPUkQsXHJcbiAgICB1c2VybmFtZTogcHJvY2Vzcy5lbnYuTU9OR09fQVVUSF9VU0VSTkFNRSxcclxuICB9LFxyXG4gIHNlcnZpY2VTZXR0aW5nczoge1xyXG4gICAgbG9nc0RpcjogXCJsb2dzL1wiLFxyXG4gICAgZW52OiBwcm9jZXNzLmVudi5lbnZpcm9ubWVudCB8fCBcImxvY2FsXCIsXHJcbiAgfSxcclxuICBzZWNyZXRLZXlzOiB7XHJcbiAgICBqd3RTZWNyZXQ6IHByb2Nlc3MuZW52LlNFQ1JFVCB8fCBcInllczEyMzQkQVNEQVNEL1NBXCIsXHJcbiAgICBjcnlwdG9TZWNyZXQ6IHByb2Nlc3MuZW52LkNSWVBUTyB8fCBcIkRBU0QyMjMzMzEyUzshYFcyMVwiLFxyXG4gIH0sXHJcbn07Il19

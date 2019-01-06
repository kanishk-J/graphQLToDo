"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Import modules
*/
const bluebird = require("bluebird");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const shared_1 = require("./shared");
global.Promise = bluebird;
/**
 * @exports TodoApp
 * @class
 * @method startServer
 * @method initEnv
 * @method initWinston
 * @method initExpress
 * @method initCORS
 * @method initAppRoutes
 * @method initServices
 */
class TodoApp {
    constructor(portGiven) {
        this.portGiven = portGiven;
        this.pkg = require("../package.json"); // information about package version
        this.winston = require("winston"); // for logging
        if (shared_1.Config.dbSettings.authEnabled) {
            this.infoString = "mongodb://" + shared_1.Config.dbSettings.username + ":" + shared_1.Config.dbSettings.password + "@"
                + shared_1.Config.dbSettings.connectionString + "/" + shared_1.Config.dbSettings.database;
        }
        else if (shared_1.Config.dbSettings.localDatabase) {
            this.infoString = "mongodb://" + shared_1.Config.dbSettings.connectionString + "/" + shared_1.Config.dbSettings.database;
        }
        else {
            this.infoString = "mongodb://" + shared_1.Config.dbSettings.dockerconnectionString + "/" + shared_1.Config.dbSettings.database;
        }
        this.port = portGiven;
    }
    /**
     * This starts express server
     * @method startServer @public
     */
    startServer() {
        this.initEnv().then(() => {
            // logs/ Folder already
            // Initilatizing the winston as per documentation
            this.initWinston();
            this.initServices().then(() => {
                // start the express server(s)
                this.initExpress();
                // all done
                this.winston.info(this.pkg.name + " startup sequence completed", {
                    version: this.pkg.version,
                });
            });
        });
    }
    /**
     * This setups the log folder and any other environment needs
     * @method initEnv @private
     * @returns {Promise<void>}
     */
    initEnv() {
        return new Promise((resolve) => {
            const logPath = shared_1.Config.serviceSettings.logsDir;
            fs.stat(logPath, (err) => {
                resolve();
            });
        });
    }
    /**
     * This Initilatizes the winston
     * @method initWinston @private
     */
    initWinston() {
        // winston is configured as a private variable to the main app.ts
        // it can then be spread to child modules or routeModules. This way only one winston object needs to be setup
        this.winston.remove(this.winston.transports.Console);
        this.winston.add(this.winston.transports.Console, {
            colorize: true,
            prettyPrint: true,
            timestamp: true,
        });
        this.winston.add(this.winston.transports.File, {
            name: "error",
            level: "error",
            filename: "logs/error.log",
            maxsize: 10485760,
            maxFiles: "10",
            timestamp: true,
        });
        this.winston.add(this.winston.transports.File, {
            name: "warn",
            level: "warn",
            filename: "logs/warn.log",
            maxsize: 10485760,
            maxFiles: "10",
            timestamp: true,
        });
        this.winston.add(this.winston.transports.File, {
            name: "info",
            level: "info",
            filename: "logs/info.log",
            maxsize: 10485760,
            maxFiles: "10",
            timestamp: true,
        });
        this.winston.add(this.winston.transports.File, {
            name: "verbose",
            level: "verbose",
            filename: "logs/verbose.log",
            maxsize: 10485760,
            maxFiles: "10",
            timestamp: true,
        });
        this.winston.info("Winston has been init");
    }
    /**
     * This Initilatizes express server
     * @method initExpress @private
     */
    initExpress() {
        // create express
        this.app = express();
        this.initCORS();
        // add in any routes you might want
        this.initAppRoutes();
        // and start!
        this.app.listen(this.port);
        this.winston.info("Express started on (http://localhost:" + this.port + "/)");
    }
    /**
     * This Initilatizes cors package
     * @method initCORS @private
     */
    initCORS() {
        this.app.use(cors());
    }
    /**
     * This Initilatizes routes for server
     * @method initAppRoutes @private
     */
    initAppRoutes() {
        // We will setup our graphql route here
    }
    /**
     * This Initilatizes services we want if expanding the application
     * @method initServices @private
     * @returns {Promise<boolean>}
     */
    initServices() {
        return new Promise((resolve, reject) => {
            // connect to mongodb
            mongoose.connect(this.infoString, { useNewUrlParser: true }).then(() => {
                this.winston.info("Mongo Connected!");
                resolve(true);
            });
        });
    }
}
exports.TodoApp = TodoApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQztDQUNGO0FBeEpELDBCQXdKQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLypcclxuICBJbXBvcnQgbW9kdWxlc1xyXG4qL1xyXG5pbXBvcnQgYmx1ZWJpcmQgPSByZXF1aXJlKFwiYmx1ZWJpcmRcIik7XHJcbmltcG9ydCBjb3JzID0gcmVxdWlyZShcImNvcnNcIik7XHJcbmltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcclxuaW1wb3J0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9zaGFyZWRcIjtcclxuZ2xvYmFsLlByb21pc2UgPSBibHVlYmlyZDtcclxuXHJcbi8qKlxyXG4gKiBAZXhwb3J0cyBUb2RvQXBwXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWV0aG9kIHN0YXJ0U2VydmVyXHJcbiAqIEBtZXRob2QgaW5pdEVudlxyXG4gKiBAbWV0aG9kIGluaXRXaW5zdG9uXHJcbiAqIEBtZXRob2QgaW5pdEV4cHJlc3NcclxuICogQG1ldGhvZCBpbml0Q09SU1xyXG4gKiBAbWV0aG9kIGluaXRBcHBSb3V0ZXNcclxuICogQG1ldGhvZCBpbml0U2VydmljZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUb2RvQXBwIHtcclxuICBwdWJsaWMgaW5mb1N0cmluZzogc3RyaW5nO1xyXG4gIHB1YmxpYyBwb3J0OiBhbnk7XHJcbiAgcHJpdmF0ZSBwa2cgPSByZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpOyAvLyBpbmZvcm1hdGlvbiBhYm91dCBwYWNrYWdlIHZlcnNpb25cclxuICBwcml2YXRlIHdpbnN0b246IGFueSA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpOyAvLyBmb3IgbG9nZ2luZ1xyXG4gIHByaXZhdGUgYXBwOiBhbnk7IC8vIGV4cHJlc3Mgc2VydmVyXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwb3J0R2l2ZW4pIHtcclxuICAgIGlmIChDb25maWcuZGJTZXR0aW5ncy5hdXRoRW5hYmxlZCkge1xyXG4gICAgICB0aGlzLmluZm9TdHJpbmcgPSBcIm1vbmdvZGI6Ly9cIiArIENvbmZpZy5kYlNldHRpbmdzLnVzZXJuYW1lICsgXCI6XCIgKyBDb25maWcuZGJTZXR0aW5ncy5wYXNzd29yZCArIFwiQFwiXHJcbiAgICAgICAgKyBDb25maWcuZGJTZXR0aW5ncy5jb25uZWN0aW9uU3RyaW5nICsgXCIvXCIgKyBDb25maWcuZGJTZXR0aW5ncy5kYXRhYmFzZTtcclxuICAgIH0gZWxzZSBpZiAoQ29uZmlnLmRiU2V0dGluZ3MubG9jYWxEYXRhYmFzZSkge1xyXG4gICAgICB0aGlzLmluZm9TdHJpbmcgPSBcIm1vbmdvZGI6Ly9cIiArIENvbmZpZy5kYlNldHRpbmdzLmNvbm5lY3Rpb25TdHJpbmcgKyBcIi9cIiArIENvbmZpZy5kYlNldHRpbmdzLmRhdGFiYXNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbmZvU3RyaW5nID0gXCJtb25nb2RiOi8vXCIgKyBDb25maWcuZGJTZXR0aW5ncy5kb2NrZXJjb25uZWN0aW9uU3RyaW5nICsgXCIvXCIgKyBDb25maWcuZGJTZXR0aW5ncy5kYXRhYmFzZTtcclxuICAgIH1cclxuICAgIHRoaXMucG9ydCA9IHBvcnRHaXZlbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgc3RhcnRzIGV4cHJlc3Mgc2VydmVyXHJcbiAgICogQG1ldGhvZCBzdGFydFNlcnZlciBAcHVibGljXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXJ0U2VydmVyKCkge1xyXG4gICAgdGhpcy5pbml0RW52KCkudGhlbigoKSA9PiB7XHJcbiAgICAgIC8vIGxvZ3MvIEZvbGRlciBhbHJlYWR5XHJcbiAgICAgIC8vIEluaXRpbGF0aXppbmcgdGhlIHdpbnN0b24gYXMgcGVyIGRvY3VtZW50YXRpb25cclxuICAgICAgdGhpcy5pbml0V2luc3RvbigpO1xyXG5cclxuICAgICAgdGhpcy5pbml0U2VydmljZXMoKS50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgICAgLy8gc3RhcnQgdGhlIGV4cHJlc3Mgc2VydmVyKHMpXHJcbiAgICAgICAgdGhpcy5pbml0RXhwcmVzcygpO1xyXG5cclxuICAgICAgICAvLyBhbGwgZG9uZVxyXG4gICAgICAgIHRoaXMud2luc3Rvbi5pbmZvKHRoaXMucGtnLm5hbWUgKyBcIiBzdGFydHVwIHNlcXVlbmNlIGNvbXBsZXRlZFwiLCB7XHJcbiAgICAgICAgICB2ZXJzaW9uOiB0aGlzLnBrZy52ZXJzaW9uLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBzZXR1cHMgdGhlIGxvZyBmb2xkZXIgYW5kIGFueSBvdGhlciBlbnZpcm9ubWVudCBuZWVkc1xyXG4gICAqIEBtZXRob2QgaW5pdEVudiBAcHJpdmF0ZVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdEVudigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBjb25zdCBsb2dQYXRoOiBzdHJpbmcgPSBDb25maWcuc2VydmljZVNldHRpbmdzLmxvZ3NEaXI7XHJcbiAgICAgIGZzLnN0YXQobG9nUGF0aCwgKGVycikgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgSW5pdGlsYXRpemVzIHRoZSB3aW5zdG9uXHJcbiAgICogQG1ldGhvZCBpbml0V2luc3RvbiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdFdpbnN0b24oKSB7XHJcbiAgICAvLyB3aW5zdG9uIGlzIGNvbmZpZ3VyZWQgYXMgYSBwcml2YXRlIHZhcmlhYmxlIHRvIHRoZSBtYWluIGFwcC50c1xyXG4gICAgLy8gaXQgY2FuIHRoZW4gYmUgc3ByZWFkIHRvIGNoaWxkIG1vZHVsZXMgb3Igcm91dGVNb2R1bGVzLiBUaGlzIHdheSBvbmx5IG9uZSB3aW5zdG9uIG9iamVjdCBuZWVkcyB0byBiZSBzZXR1cFxyXG4gICAgdGhpcy53aW5zdG9uLnJlbW92ZSh0aGlzLndpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKTtcclxuICAgIHRoaXMud2luc3Rvbi5hZGQodGhpcy53aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSwge1xyXG4gICAgICBjb2xvcml6ZTogdHJ1ZSxcclxuICAgICAgcHJldHR5UHJpbnQ6IHRydWUsXHJcbiAgICAgIHRpbWVzdGFtcDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMud2luc3Rvbi5hZGQodGhpcy53aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSwge1xyXG4gICAgICBuYW1lOiBcImVycm9yXCIsXHJcbiAgICAgIGxldmVsOiBcImVycm9yXCIsXHJcbiAgICAgIGZpbGVuYW1lOiBcImxvZ3MvZXJyb3IubG9nXCIsXHJcbiAgICAgIG1heHNpemU6IDEwNDg1NzYwLFxyXG4gICAgICBtYXhGaWxlczogXCIxMFwiLFxyXG4gICAgICB0aW1lc3RhbXA6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMud2luc3Rvbi5hZGQodGhpcy53aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSwge1xyXG4gICAgICBuYW1lOiBcIndhcm5cIixcclxuICAgICAgbGV2ZWw6IFwid2FyblwiLFxyXG4gICAgICBmaWxlbmFtZTogXCJsb2dzL3dhcm4ubG9nXCIsXHJcbiAgICAgIG1heHNpemU6IDEwNDg1NzYwLFxyXG4gICAgICBtYXhGaWxlczogXCIxMFwiLFxyXG4gICAgICB0aW1lc3RhbXA6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMud2luc3Rvbi5hZGQodGhpcy53aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSwge1xyXG4gICAgICBuYW1lOiBcImluZm9cIixcclxuICAgICAgbGV2ZWw6IFwiaW5mb1wiLFxyXG4gICAgICBmaWxlbmFtZTogXCJsb2dzL2luZm8ubG9nXCIsXHJcbiAgICAgIG1heHNpemU6IDEwNDg1NzYwLFxyXG4gICAgICBtYXhGaWxlczogXCIxMFwiLFxyXG4gICAgICB0aW1lc3RhbXA6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMud2luc3Rvbi5hZGQodGhpcy53aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSwge1xyXG4gICAgICBuYW1lOiBcInZlcmJvc2VcIixcclxuICAgICAgbGV2ZWw6IFwidmVyYm9zZVwiLFxyXG4gICAgICBmaWxlbmFtZTogXCJsb2dzL3ZlcmJvc2UubG9nXCIsXHJcbiAgICAgIG1heHNpemU6IDEwNDg1NzYwLFxyXG4gICAgICBtYXhGaWxlczogXCIxMFwiLFxyXG4gICAgICB0aW1lc3RhbXA6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLndpbnN0b24uaW5mbyhcIldpbnN0b24gaGFzIGJlZW4gaW5pdFwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgSW5pdGlsYXRpemVzIGV4cHJlc3Mgc2VydmVyXHJcbiAgICogQG1ldGhvZCBpbml0RXhwcmVzcyBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdEV4cHJlc3MoKSB7XHJcbiAgICAvLyBjcmVhdGUgZXhwcmVzc1xyXG4gICAgdGhpcy5hcHAgPSBleHByZXNzKCk7XHJcbiAgICB0aGlzLmluaXRDT1JTKCk7XHJcblxyXG4gICAgLy8gYWRkIGluIGFueSByb3V0ZXMgeW91IG1pZ2h0IHdhbnRcclxuICAgIHRoaXMuaW5pdEFwcFJvdXRlcygpO1xyXG5cclxuICAgIC8vIGFuZCBzdGFydCFcclxuICAgIHRoaXMuYXBwLmxpc3Rlbih0aGlzLnBvcnQpO1xyXG4gICAgdGhpcy53aW5zdG9uLmluZm8oXCJFeHByZXNzIHN0YXJ0ZWQgb24gKGh0dHA6Ly9sb2NhbGhvc3Q6XCIgKyB0aGlzLnBvcnQgKyBcIi8pXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBJbml0aWxhdGl6ZXMgY29ycyBwYWNrYWdlXHJcbiAgICogQG1ldGhvZCBpbml0Q09SUyBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdENPUlMoKSB7XHJcbiAgICB0aGlzLmFwcC51c2UoY29ycygpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgSW5pdGlsYXRpemVzIHJvdXRlcyBmb3Igc2VydmVyXHJcbiAgICogQG1ldGhvZCBpbml0QXBwUm91dGVzIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbml0QXBwUm91dGVzKCkge1xyXG4gICAgLy8gV2Ugd2lsbCBzZXR1cCBvdXIgZ3JhcGhxbCByb3V0ZSBoZXJlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIEluaXRpbGF0aXplcyBzZXJ2aWNlcyB3ZSB3YW50IGlmIGV4cGFuZGluZyB0aGUgYXBwbGljYXRpb25cclxuICAgKiBAbWV0aG9kIGluaXRTZXJ2aWNlcyBAcHJpdmF0ZVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdFNlcnZpY2VzKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gY29ubmVjdCB0byBtb25nb2RiXHJcbiAgICAgIG1vbmdvb3NlLmNvbm5lY3QodGhpcy5pbmZvU3RyaW5nLCB7IHVzZU5ld1VybFBhcnNlcjogdHJ1ZSB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLndpbnN0b24uaW5mbyhcIk1vbmdvIENvbm5lY3RlZCFcIik7XHJcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0iXX0=

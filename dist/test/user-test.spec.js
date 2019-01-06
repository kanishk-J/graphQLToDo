"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const mocha_typescript_1 = require("mocha-typescript");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const server_1 = require("../server");
const shared_1 = require("../shared");
chai.use(chaiAsPromised);
// starting the server
const server = new server_1.TodoApp(process.env.API_PORT || 3001);
server.startServer();
chai.use(chaiAsPromised);
chai.use(chaiHttp);
let UserTests = class UserTests {
    static after() {
        process.exit(0);
    }
    localDb(done) {
        setTimeout(() => {
            shared_1.Config.dbSettings.localDatabase = true;
            const mock = sinon.mock(new server_1.TodoApp(process.env.API_PORT || 3001), "constructor");
            chai.expect(mock.object.infoString).to.deep.equal("mongodb://" + shared_1.Config.dbSettings.connectionString + "/" + shared_1.Config.dbSettings.database);
            done();
        }, 100);
    }
    dockerDb(done) {
        shared_1.Config.dbSettings.localDatabase = false;
        const mock = sinon.mock(new server_1.TodoApp(process.env.API_PORT || 3001), "constructor");
        chai.expect(mock.object.infoString).to.deep.equal("mongodb://" + shared_1.Config.dbSettings.dockerconnectionString + "/" + shared_1.Config.dbSettings.database);
        done();
    }
    OnlineDb(done) {
        shared_1.Config.dbSettings.authEnabled = true;
        const mock = sinon.mock(new server_1.TodoApp(process.env.API_PORT || 3001), "constructor");
        chai.expect(mock.object.infoString).to.deep.equal("mongodb://" + shared_1.Config.dbSettings.username + ":" + shared_1.Config.dbSettings.password + "@"
            + shared_1.Config.dbSettings.connectionString + "/" + shared_1.Config.dbSettings.database);
        done();
    }
};
__decorate([
    mocha_typescript_1.test("Testing Local Connection - try connection for Local mongodb"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserTests.prototype, "localDb", null);
__decorate([
    mocha_typescript_1.test("Testing Docker Connection - try connection for docker mongodb"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserTests.prototype, "dockerDb", null);
__decorate([
    mocha_typescript_1.test("Testing Online Connection - try connection for online mongodb"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserTests.prototype, "OnlineDb", null);
UserTests = __decorate([
    mocha_typescript_1.suite("User Test class")
], UserTests);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0L3VzZXItdGVzdC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkJBQThCO0FBQzlCLG1EQUFvRDtBQUNwRCx1REFBK0M7QUFDL0Msc0NBQXVDO0FBQ3ZDLCtCQUFnQztBQUNoQyxzQ0FBb0M7QUFDcEMsc0NBQW1DO0FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFekIsc0JBQXNCO0FBQ3RCLE1BQU0sTUFBTSxHQUFZLElBQUksZ0JBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQztBQUNsRSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7QUFFckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBR25CLElBQU0sU0FBUyxHQUFmLE1BQU0sU0FBUztJQUViLE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBR00sT0FBTyxDQUFDLElBQUk7UUFDakIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLGVBQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUN2QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLGVBQU0sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLGVBQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEksSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBR00sUUFBUSxDQUFDLElBQUk7UUFDbEIsZUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsZUFBTSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsR0FBRyxHQUFHLEdBQUcsZUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5SSxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUM7SUFHTSxRQUFRLENBQUMsSUFBSTtRQUNsQixlQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxlQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsZUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRztjQUM5SCxlQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxlQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdFLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztDQUNGLENBQUE7QUF6QkM7SUFEQyx1QkFBSSxDQUFDLDZEQUE2RCxDQUFDOzs7O3dDQVFuRTtBQUdEO0lBREMsdUJBQUksQ0FBQywrREFBK0QsQ0FBQzs7Ozt5Q0FNckU7QUFHRDtJQURDLHVCQUFJLENBQUMsK0RBQStELENBQUM7Ozs7eUNBT3JFO0FBL0JHLFNBQVM7SUFEZCx3QkFBSyxDQUFDLGlCQUFpQixDQUFDO0dBQ25CLFNBQVMsQ0FnQ2QiLCJmaWxlIjoidGVzdC91c2VyLXRlc3Quc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpID0gcmVxdWlyZShcImNoYWlcIik7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCA9IHJlcXVpcmUoXCJjaGFpLWFzLXByb21pc2VkXCIpO1xyXG5pbXBvcnQgeyBzdWl0ZSwgdGVzdCB9IGZyb20gXCJtb2NoYS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCBjaGFpSHR0cCA9IHJlcXVpcmUoXCJjaGFpLWh0dHBcIik7XHJcbmltcG9ydCBzaW5vbiA9IHJlcXVpcmUoXCJzaW5vblwiKTtcclxuaW1wb3J0IHsgVG9kb0FwcCB9IGZyb20gXCIuLi9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG4vLyBzdGFydGluZyB0aGUgc2VydmVyXHJcbmNvbnN0IHNlcnZlcjogVG9kb0FwcCA9IG5ldyBUb2RvQXBwKHByb2Nlc3MuZW52LkFQSV9QT1JUIHx8IDMwMDEpO1xyXG5zZXJ2ZXIuc3RhcnRTZXJ2ZXIoKTtcclxuXHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuY2hhaS51c2UoY2hhaUh0dHApO1xyXG5cclxuQHN1aXRlKFwiVXNlciBUZXN0IGNsYXNzXCIpXHJcbmNsYXNzIFVzZXJUZXN0cyB7XHJcblxyXG4gIHN0YXRpYyBhZnRlcigpIHtcclxuICAgIHByb2Nlc3MuZXhpdCgwKTtcclxuICB9XHJcblxyXG4gIEB0ZXN0KFwiVGVzdGluZyBMb2NhbCBDb25uZWN0aW9uIC0gdHJ5IGNvbm5lY3Rpb24gZm9yIExvY2FsIG1vbmdvZGJcIilcclxuICBwdWJsaWMgbG9jYWxEYihkb25lKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgQ29uZmlnLmRiU2V0dGluZ3MubG9jYWxEYXRhYmFzZSA9IHRydWU7XHJcbiAgICAgIGNvbnN0IG1vY2sgPSBzaW5vbi5tb2NrKG5ldyBUb2RvQXBwKHByb2Nlc3MuZW52LkFQSV9QT1JUIHx8IDMwMDEpLCBcImNvbnN0cnVjdG9yXCIpO1xyXG4gICAgICBjaGFpLmV4cGVjdChtb2NrLm9iamVjdC5pbmZvU3RyaW5nKS50by5kZWVwLmVxdWFsKFwibW9uZ29kYjovL1wiICsgQ29uZmlnLmRiU2V0dGluZ3MuY29ubmVjdGlvblN0cmluZyArIFwiL1wiICsgQ29uZmlnLmRiU2V0dGluZ3MuZGF0YWJhc2UpO1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9LCAxMDApO1xyXG4gIH1cclxuXHJcbiAgQHRlc3QoXCJUZXN0aW5nIERvY2tlciBDb25uZWN0aW9uIC0gdHJ5IGNvbm5lY3Rpb24gZm9yIGRvY2tlciBtb25nb2RiXCIpXHJcbiAgcHVibGljIGRvY2tlckRiKGRvbmUpIHtcclxuICAgIENvbmZpZy5kYlNldHRpbmdzLmxvY2FsRGF0YWJhc2UgPSBmYWxzZTtcclxuICAgIGNvbnN0IG1vY2sgPSBzaW5vbi5tb2NrKG5ldyBUb2RvQXBwKHByb2Nlc3MuZW52LkFQSV9QT1JUIHx8IDMwMDEpLCBcImNvbnN0cnVjdG9yXCIpO1xyXG4gICAgY2hhaS5leHBlY3QobW9jay5vYmplY3QuaW5mb1N0cmluZykudG8uZGVlcC5lcXVhbChcIm1vbmdvZGI6Ly9cIiArIENvbmZpZy5kYlNldHRpbmdzLmRvY2tlcmNvbm5lY3Rpb25TdHJpbmcgKyBcIi9cIiArIENvbmZpZy5kYlNldHRpbmdzLmRhdGFiYXNlKTtcclxuICAgIGRvbmUoKTtcclxuICB9XHJcblxyXG4gIEB0ZXN0KFwiVGVzdGluZyBPbmxpbmUgQ29ubmVjdGlvbiAtIHRyeSBjb25uZWN0aW9uIGZvciBvbmxpbmUgbW9uZ29kYlwiKVxyXG4gIHB1YmxpYyBPbmxpbmVEYihkb25lKSB7XHJcbiAgICBDb25maWcuZGJTZXR0aW5ncy5hdXRoRW5hYmxlZCA9IHRydWU7XHJcbiAgICBjb25zdCBtb2NrID0gc2lub24ubW9jayhuZXcgVG9kb0FwcChwcm9jZXNzLmVudi5BUElfUE9SVCB8fCAzMDAxKSwgXCJjb25zdHJ1Y3RvclwiKTtcclxuICAgIGNoYWkuZXhwZWN0KG1vY2sub2JqZWN0LmluZm9TdHJpbmcpLnRvLmRlZXAuZXF1YWwoXCJtb25nb2RiOi8vXCIgKyBDb25maWcuZGJTZXR0aW5ncy51c2VybmFtZSArIFwiOlwiICsgQ29uZmlnLmRiU2V0dGluZ3MucGFzc3dvcmQgKyBcIkBcIlxyXG4gICAgICAgICsgQ29uZmlnLmRiU2V0dGluZ3MuY29ubmVjdGlvblN0cmluZyArIFwiL1wiICsgQ29uZmlnLmRiU2V0dGluZ3MuZGF0YWJhc2UpO1xyXG4gICAgZG9uZSgpO1xyXG4gIH1cclxufSJdfQ==
